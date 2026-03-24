// server/utils/dataGovApi.js
// Robust DataGov fetcher: reads api-key at runtime, retries with backoff, longer timeouts.
// Returns [] on any failure.

let axios;
try {
  // try to use require if available
  axios = require("axios");
} catch (e) {
  // axios not installed or require failed
  axios = null;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Fetch structured records from data.gov.in for a given resource.
 * Retries up to 3 times with exponential backoff.
 *
 * @param {string} resourceId
 * @param {object} params
 * @param {number} limit
 */
async function getDataGovResource(resourceId, params = {}, limit = 50) {
  // ensure axios is present at runtime
  if (!axios) {
    try {
      axios = require("axios");
    } catch (e) {
      console.error(
        "data.gov fetch failed: axios is not installed/available",
        e && e.message
      );
      return [];
    }
  }

  const DATA_GOV_KEY =
    process.env.DATA_GOV_API_KEY ||
    process.env.GOV_API_KEY ||
    process.env.DATA_GOV_KEY ||
    "";

  if (!DATA_GOV_KEY) {
    console.warn("DATA_GOV_API_KEY not set — returning []");
    return [];
  }

  const qParams = new URLSearchParams({
    "api-key": DATA_GOV_KEY,
    format: "json",
    limit: String(limit),
    ...params,
  });

  const url = `https://api.data.gov.in/resource/${resourceId}?${qParams.toString()}`;

  const maxAttempts = 3;
  let attempt = 0;

  while (attempt < maxAttempts) {
    attempt += 1;
    const timeoutMs = 15000 + attempt * 5000; // 15s, 20s, 25s
    try {
      const res = await axios.get(url, { timeout: timeoutMs });
      // data.gov commonly returns { success: 1, count, records: [...] }
      if (res && res.data) {
        if (Array.isArray(res.data.records)) return res.data.records;
        // fallback: some endpoints return arrays directly
        if (Array.isArray(res.data)) return res.data;
        // sometimes the payload is under data.records even if not array
        return res.data.records || res.data || [];
      }
      return [];
    } catch (err) {
      const msg = (err && (err.message || String(err))) || "unknown error";
      // For timeout or 5xx, retry; for 4xx (bad request/forbidden) do not retry repeatedly
      const status = err && err.response && err.response.status;
      console.warn(
        `data.gov fetch attempt ${attempt} failed for ${resourceId}: ${msg} (status: ${
          status || "n/a"
        })`
      );
      // if client error (4xx), break early
      if (status && status >= 400 && status < 500) {
        break;
      }
      if (attempt < maxAttempts) {
        // exponential backoff with jitter
        const backoff =
          Math.min(60000, 500 * 2 ** attempt) + Math.floor(Math.random() * 300);
        await sleep(backoff);
        continue;
      }
      // last attempt failed
      console.error(`data.gov fetch failed: ${msg}`);
      return [];
    }
  }

  return [];
}

module.exports = { getDataGovResource };
