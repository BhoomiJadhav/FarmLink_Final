// server/Controllers/updatesController.js
// Merged "live-only" updates controller with robust fetch helpers.

const cheerio = require("cheerio");
const NodeCache = require("node-cache");
let axios;
try {
  axios = require("axios");
} catch (e) {
  axios = null;
}
const { getDataGovResource } = require("../utils/dataGovApi");

const cache = new NodeCache({ stdTTL: 60 * 5 });

const OWM_KEY = process.env.OPENWEATHER_API_KEY || "";
const GEOCODING_USER_AGENT = process.env.GEOCODING_USER_AGENT || "farmlink-app";
const DATA_GOV_RESOURCE_IDS = (process.env.DATA_GOV_RESOURCE_IDS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const GOV_API_KEY =
  process.env.DATA_GOV_API_KEY || process.env.GOV_API_KEY || "";
const DATA_GOV_LIMIT = parseInt(process.env.DATA_GOV_LIMIT || "10", 10);
const GLOBAL_LIMIT = parseInt(process.env.UPDATES_GLOBAL_LIMIT || "40", 10);

// small sleep helper
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// robust safeGet with retries and timeout
async function safeGet(url, opts = {}) {
  if (!axios) {
    try {
      axios = require("axios");
    } catch (e) {
      console.error(
        "safeGet error: axios is not installed/available",
        e && e.message
      );
      return null;
    }
  }

  const maxAttempts = 3;
  let attempt = 0;

  while (attempt < maxAttempts) {
    attempt += 1;
    const timeoutMs = opts.timeout || 12000 + attempt * 4000; // 12s, 16s, 20s
    try {
      const res = await axios.get(url, {
        timeout: timeoutMs,
        headers: opts.headers || {},
      });
      return res.data;
    } catch (e) {
      const msg = e && (e.message || String(e));
      const status = e && e.response && e.response.status;
      console.warn(
        `safeGet attempt ${attempt} failed for ${url}: ${msg} (status: ${
          status || "n/a"
        })`
      );
      // If 4xx, don't retry
      if (status && status >= 400 && status < 500) break;
      if (attempt < maxAttempts) {
        const backoff =
          Math.min(30000, 500 * 2 ** attempt) + Math.floor(Math.random() * 200);
        await sleep(backoff);
        continue;
      }
      console.error(`safeGet failed for ${url}: ${msg}`);
      return null;
    }
  }
  return null;
}

/* ---------- PIB ---------- */
async function fetchPIB() {
  const key = "pib_updates";
  const cached = cache.get(key);
  if (cached) return cached;
  const url = "https://pib.gov.in/allRel.aspx";
  const html = await safeGet(url);
  if (!html) return [];
  const $ = cheerio.load(html);
  const results = [];
  $(".listWrap li").each((i, el) => {
    const title = $(el).find("a").text().trim();
    const href = $(el).find("a").attr("href");
    const link = href ? `https://pib.gov.in${href}` : url;
    const date = $(el).find(".date").text().trim() || null;
    if (title) results.push({ source: "PIB", title, link, date });
  });
  cache.set(key, results.slice(0, DATA_GOV_LIMIT));
  return results.slice(0, DATA_GOV_LIMIT);
}

/* ---------- PM-KISAN ---------- */
async function fetchPMKisan() {
  const key = "pmkisan_updates";
  const cached = cache.get(key);
  if (cached) return cached;
  const url = "https://pmkisan.gov.in/";
  const html = await safeGet(url);
  if (!html) return [];
  const $ = cheerio.load(html);
  const results = [];
  $(".marquee li, .newsList li, .news-block li").each((i, el) => {
    const title = $(el).text().trim();
    let href = $(el).find("a").attr("href") || null;
    if (href && !/^http/i.test(href)) {
      href = href.startsWith("/")
        ? `https://pmkisan.gov.in${href}`
        : `https://pmkisan.gov.in/${href}`;
    }
    if (title) results.push({ source: "PM-KISAN", title, link: href || url });
  });
  if (!results.length) {
    $("h1,h2,h3").each((i, el) => {
      const t = $(el).text().trim();
      if (t && t.length > 12)
        results.push({ source: "PM-KISAN", title: t, link: url });
    });
  }
  cache.set(key, results.slice(0, DATA_GOV_LIMIT));
  return results.slice(0, DATA_GOV_LIMIT);
}

/* ---------- AGRICOOP ---------- */
async function fetchAgricoop() {
  const key = "agricoop_updates";
  const cached = cache.get(key);
  if (cached) return cached;
  const url = "https://agricoop.gov.in/en/whatsnew";
  const html = await safeGet(url);
  if (!html) return [];
  const $ = cheerio.load(html);
  const results = [];
  $("table tbody tr").each((i, row) => {
    const title = $(row).find("td").eq(1).text().trim();
    const date = $(row).find("td").eq(2).text().trim();
    if (title) results.push({ source: "Agricoop", title, date });
  });
  cache.set(key, results.slice(0, DATA_GOV_LIMIT));
  return results.slice(0, DATA_GOV_LIMIT);
}

/* ---------- Disaster alerts ---------- */
async function fetchDisasterAlerts() {
  const key = "disaster_alerts";
  const cached = cache.get(key);
  if (cached) return cached;
  const candidates = [
    { name: "NDMA", url: "https://ndma.gov.in/" },
    { name: "MHA", url: "https://www.mha.gov.in/" },
  ];
  const results = [];
  for (const c of candidates) {
    const html = await safeGet(c.url);
    if (!html) continue;
    const $ = cheerio.load(html);
    $("h1,h2,h3,a").each((i, el) => {
      const t = $(el).text().trim();
      if (
        t &&
        /flood|drought|warning|alert|cyclone|heavy rain|heat wave|landslide|earthquake/i.test(
          t
        )
      ) {
        results.push({ source: c.name, title: t });
      }
    });
  }
  cache.set(key, results.slice(0, DATA_GOV_LIMIT));
  return results.slice(0, DATA_GOV_LIMIT);
}

/* ---------- Geocode ---------- */
async function geocodeLocation(text) {
  if (!text) return null;
  const key = `geo_${text}`;
  const cached = cache.get(key);
  if (cached) return cached;
  const q = encodeURIComponent(text);
  const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`;
  try {
    const res = await safeGet(url, {
      headers: { "User-Agent": GEOCODING_USER_AGENT },
    });
    if (Array.isArray(res) && res[0]) {
      const out = {
        lat: parseFloat(res[0].lat),
        lon: parseFloat(res[0].lon),
      };
      cache.set(key, out, 60 * 60 * 24);
      return out;
    }
  } catch (e) {
    console.warn("geocodeLocation failed:", e && e.message);
  }
  return null;
}

/* ---------- Weather alerts ---------- */
async function fetchWeatherAlertsForCoords(lat, lon) {
  if (!OWM_KEY) return [];
  const key = `weather_${lat}_${lon}`;
  const cached = cache.get(key);
  if (cached) return cached;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${OWM_KEY}&units=metric`;
  const data = await safeGet(url);
  if (!data) return [];
  const alerts = data.alerts || [];
  const mapped = alerts.map((a) => ({
    source: "OpenWeatherMap",
    title: a.event,
    description: a.description,
    start: a.start,
    end: a.end,
  }));
  cache.set(key, mapped, 60 * 5);
  return mapped;
}

/* ---------- DataGov fetcher (uses getDataGovResource) ---------- */
async function fetchDataGovFeeds() {
  if (!GOV_API_KEY || DATA_GOV_RESOURCE_IDS.length === 0) return [];
  const key = `datagov_${DATA_GOV_RESOURCE_IDS.join("_")}_${DATA_GOV_LIMIT}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const all = [];
  for (const rid of DATA_GOV_RESOURCE_IDS) {
    try {
      // the util now handles retries & timeouts
      const records = await getDataGovResource(rid, {}, DATA_GOV_LIMIT);
      for (const r of (records || []).slice(0, DATA_GOV_LIMIT)) {
        all.push({
          source: "data.gov.in",
          title:
            r.title ||
            r.headline ||
            r.name ||
            r.subject ||
            (r.description && String(r.description).slice(0, 120)),
          message: r.description || r.summary || r.message || "",
          date: r.date || r.updated_at || r.last_updated || null,
          raw: r,
        });
      }
    } catch (e) {
      console.warn("fetchDataGovFeeds error for resource", rid, e && e.message);
    }
  }

  cache.set(
    key,
    all.slice(0, DATA_GOV_LIMIT * DATA_GOV_RESOURCE_IDS.length),
    60 * 2
  );
  return all.slice(0, DATA_GOV_LIMIT * DATA_GOV_RESOURCE_IDS.length);
}

/* ---------- Combined gatherer ---------- */
async function gatherUpdatesForProfile(profile) {
  const [pib, pmk, agri, disaster, dataGov] = await Promise.all([
    fetchPIB(),
    fetchPMKisan(),
    fetchAgricoop(),
    fetchDisasterAlerts(),
    fetchDataGovFeeds(),
  ]);

  let weatherAlerts = [];
  const farmLoc = profile?.farm?.farmLocation || profile?.farmLocation || null;
  if (farmLoc && OWM_KEY) {
    const coords = await geocodeLocation(farmLoc);
    if (coords) {
      weatherAlerts = await fetchWeatherAlertsForCoords(coords.lat, coords.lon);
    }
  }

  const normalize = (u) => ({
    title:
      u.title ||
      u.headline ||
      u.name ||
      (u.raw && (u.raw.title || u.raw.headline)) ||
      "Untitled",
    message: u.message || u.description || u.summary || "",
    tag: (u.category || u.tag || u.source || "update").toString().toLowerCase(),
    source: u.source || "unknown",
    date: u.date || u.createdAt || null,
    link: u.link || (u.raw && (u.raw.link || u.raw.url)) || null,
    raw: u.raw || null,
  });

  const combined = [
    ...pib.map((u) => ({ ...u, category: "policy" })),
    ...pmk.map((u) => ({ ...u, category: "pmkisan" })),
    ...agri.map((u) => ({ ...u, category: "scheme" })),
    ...disaster.map((u) => ({ ...u, category: "disaster" })),
    ...dataGov.map((u) => ({ ...u, category: "datagov" })),
    ...weatherAlerts.map((u) => ({ ...u, category: "weather" })),
  ];

  const seen = new Set();
  const dedup = [];
  for (const it of combined) {
    const title = (it.title || "").trim();
    const key = title ? title.slice(0, 120).toLowerCase() : null;
    if (!key) continue;
    if (!seen.has(key)) {
      seen.add(key);
      dedup.push(normalize(it));
    }
  }

  dedup.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });

  return dedup.slice(0, GLOBAL_LIMIT);
}

/* ---------- Debug route ---------- */
async function debugUpdates(req, res) {
  try {
    const pib = await fetchPIB();
    const pmk = await fetchPMKisan();
    const agri = await fetchAgricoop();
    const disaster = await fetchDisasterAlerts();
    const dataGov = await fetchDataGovFeeds();
    return res.json({
      success: true,
      sources: {
        PIB: { count: pib.length, sample: pib.slice(0, 10) },
        PMKISAN: { count: pmk.length, sample: pmk.slice(0, 10) },
        AGRICOOP: { count: agri.length, sample: agri.slice(0, 10) },
        DISASTER: { count: disaster.length, sample: disaster.slice(0, 10) },
        DATAGOV: { count: dataGov.length, sample: dataGov.slice(0, 10) },
      },
    });
  } catch (e) {
    console.error("debugUpdates error:", e && e.message);
    return res.status(500).json({ success: false, error: e && e.message });
  }
}

/* ---------- Express handler ---------- */
async function getUpdates(req, res) {
  try {
    const profile = req.userProfile || null;
    const updates = await gatherUpdatesForProfile(profile);
    return res.json({
      success: true,
      updates: Array.isArray(updates) ? updates : [],
    });
  } catch (err) {
    console.error("getUpdates error:", err && err.message);
    return res.status(200).json({ success: true, updates: [] });
  }
}

module.exports = {
  getUpdates,
  debugUpdates,
  gatherUpdatesForProfile,
  fetchPIB,
  fetchPMKisan,
  fetchAgricoop,
  fetchDisasterAlerts,
  fetchDataGovFeeds,
};
