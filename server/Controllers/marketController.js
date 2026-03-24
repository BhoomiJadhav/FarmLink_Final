// server/Controllers/marketController.js

// defensive axios require — place at top of file
let axios;
try {
  axios = require("axios");
  if (process.env.NODE_ENV !== "production") {
    try {
      console.debug(
        "axios version:",
        axios.VERSION || axios.default?.version || "unknown"
      );
    } catch (_) {}
  }
} catch (e) {
  console.error("Axios require failed in", __filename, ":", e && e.message);
  axios = null;
}
const { getDataGovResource } = require("../utils/dataGovApi");

// Example resource id: Agmarknet / daily market price dataset (replace if you have better one)
const AGMARKNET_RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";

const CACHED_PRICES = [
  { name: "Wheat", price: "₹2200", changePercent: 2.1, source: "cached" },
  { name: "Rice", price: "₹3500", changePercent: -1.2, source: "cached" },
  { name: "Cotton", price: "₹6800", changePercent: 3.5, source: "cached" },
];

async function getMarketPrices(req, res) {
  try {
    // you can accept query params like state, district, commodity etc.
    const { limit = 50, commodity } = req.query;
    const params = {};

    // If user provided commodity, try to use it as filter (data.gov field varies)
    if (commodity) params.q = commodity;

    const records = await getDataGovResource(
      AGMARKNET_RESOURCE_ID,
      params,
      Number(limit)
    );

    // Map to simple shape for frontend
    const prices = (records || []).map((r) => {
      // data.gov/agmarknet fields vary; try multiple keys defensively
      const name =
        r.commodity ||
        r.commodity_name ||
        r.commodity_name_english ||
        r.Commodity ||
        r.name ||
        "Unknown";
      // price field might be modal_price, min_price, max_price etc. Try to pick a sensible value
      const priceRaw =
        r.modal_price ||
        r.modal_price_per_qtl ||
        r.price ||
        r.min_price ||
        r.max_price ||
        r.price_unit ||
        r.average_price ||
        r.value ||
        r.PMPrice ||
        null;

      // normalize price to string with rupee symbol if numeric
      const price =
        priceRaw === null || priceRaw === undefined
          ? "₹—"
          : typeof priceRaw === "number"
          ? `₹${priceRaw}`
          : String(priceRaw).includes("₹")
          ? String(priceRaw)
          : `₹${String(priceRaw)}`;

      // data.gov may not give price change; leave null or compute if you have historical data
      const change = null;

      return { name, price, change, source: "Agmarknet" };
    });

    return res.json({ success: true, prices });
  } catch (err) {
    console.error("getMarketPrices error:", err.message || err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch market prices" });
  }
}
async function getMarketFallback(req, res) {
  try {
    // 1) Try Data.Gov (example resource). Replace resource id & params as needed.
    const DATA_GOV_KEY = process.env.DATA_GOV_API_KEY;
    if (DATA_GOV_KEY) {
      try {
        // Example: try a known resource (update resource id to the correct one you want)
        const resourceId =
          process.env.DATA_GOV_RESOURCE_ID ||
          "9ef84268-d588-465a-a308-a864a43d0070";
        const url = `https://api.data.gov.in/resource/${resourceId}?api-key=${DATA_GOV_KEY}&format=json&limit=20`;
        const dgResp = await axios.get(url, { timeout: 10_000 });
        const records = dgResp.data?.records || [];
        if (records && records.length) {
          // Map to our UI shape: name, price, changePercent (best-effort)
          const prices = records.slice(0, 20).map((r) => ({
            name: r.commodity || r.name || r.Commodity || "Unknown",
            price: r.price || r.maximum_price || r.modal_price || "₹—",
            changePercent: r.changePercent ?? null,
            source: "data.gov",
          }));
          if (prices.length) return res.json({ success: true, prices });
        }
      } catch (err) {
        console.warn("data.gov fetch failed:", err.message || err);
      }
    }

    // 2) If data.gov fails or empty -> try Agmarknet or other APIs here (not implemented)
    // You can add extra source logic here.

    // 3) Final fallback: return cached prices
    return res.json({ success: true, prices: CACHED_PRICES });
  } catch (err) {
    console.error("market fallback error:", err);
    return res
      .status(500)
      .json({ success: false, message: "market fallback error" });
  }
}
module.exports = { getMarketPrices, getMarketFallback };
