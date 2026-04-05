// const axios = require("axios");

// exports.parseVoice = async (req, res) => {
//   try {
//     const { text } = req.body;

//     const response = await axios.post(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         model: "llama3-70b-8192",
//         messages: [
//           {
//             role: "user",
//             content: `
// Extract structured data from:

// "${text}"

// Return ONLY JSON:
// {
//   "cropName": "",
//   "variety": "",
//   "quantityAvailable": "",
//   "harvestedMonth": "",
//   "harvestedYear": "",
//   "cropCondition": "",
//   "sortingStatus": "",
//   "moistureLevel": "",
//   "minPrice": "",
//   "maxPrice": "",
//   "addressLine": "",
//   "villageOrCity": "",
//   "district": "",
//   "state": "",
//   "pincode": ""
// }
// `,
//           },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       },
//     );

//     const output = response.data.choices[0].message.content;

//     const jsonMatch = output.match(/\{[\s\S]*\}/);

//     if (!jsonMatch) {
//       return res.status(500).json({ message: "Invalid AI response" });
//     }

//     const parsed = JSON.parse(jsonMatch[0]);

//     res.json(parsed);
//   } catch (err) {
//     console.error("GROQ ERROR:", err.response?.data || err.message);
//     res.status(500).json({ message: "AI parsing failed" });
//   }
// };

const axios = require("axios");

exports.parseVoice = async (req, res) => {
  try {
    const { text } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "user",
            content: `
IMPORTANT:
- Return ONLY pure JSON
- No explanation
- No \`\`\`json
- Do NOT generate random words like getDate, EqualTo

Extract structured data from:

"${text}"

Return:
{
  "cropName": "",
  "variety": "",
  "quantityAvailable": "",
  "harvestedMonth": "",
  "harvestedYear": "",
  "cropCondition": "",
  "sortingStatus": "",
  "moistureLevel": "",
  "minPrice": "",
  "maxPrice": "",
  "addressLine": "",
  "villageOrCity": "",
  "district": "",
  "state": "",
  "pincode": ""
}

STRICT:
- cropCondition → FRESH / STORED_LT_1_MONTH / STORED_1_3_MONTHS / STORED_GT_3_MONTHS
- sortingStatus → SORTED / PARTIALLY_SORTED / NOT_SORTED
- moistureLevel → LOW / MEDIUM / HIGH / NOT_TESTED
- addressLine must be ONE string
`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const rawOutput = response.data.choices[0].message.content;
    console.log("AI RAW OUTPUT:", rawOutput);

    // 🧹 CLEAN OUTPUT
    let cleaned = rawOutput
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/Here is.*?:/g, "")
      .trim();

    // 🔧 FIX BROKEN addressLine arrays
    cleaned = cleaned.replace(
      /"addressLine":\s*("[^"]*",\s*"[^"]*",\s*"[^"]*")/g,
      (match) => {
        const parts = match.match(/"([^"]*)"/g);
        const joined = parts.map((p) => p.replace(/"/g, "")).join(", ");
        return `"addressLine": "${joined}"`;
      },
    );

    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(500).json({ message: "Invalid AI response" });
    }

    let parsed;

    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.log("JSON ERROR:", jsonMatch[0]);

      // fallback safe object
      return res.json({
        cropName: "",
        variety: "",
        quantityAvailable: "",
        harvestedMonth: "",
        harvestedYear: "",
        cropCondition: "",
        sortingStatus: "",
        moistureLevel: "",
        minPrice: "",
        maxPrice: "",
        addressLine: "",
        villageOrCity: "",
        district: "",
        state: "",
        pincode: "",
      });
    }

    // 🔥 NORMALIZATION FUNCTION
    const cleanText = (val) => {
      if (!val) return "";
      return String(val)
        .replace(/[^a-zA-Z0-9\u0900-\u097F\s,]/g, "")
        .trim();
    };

    Object.keys(parsed).forEach((key) => {
      parsed[key] = cleanText(parsed[key]);
    });

    const data = { ...parsed };

    // 🌾 Crop + Variety Fix
    if (data.cropName?.includes("तांदूळ") || data.cropName?.includes("चावल")) {
      data.cropName = "Rice";
    }

    if (!data.variety && data.cropName === "Rice") {
      if (text.toLowerCase().includes("basmati") || text.includes("बासमती")) {
        data.variety = "Basmati";
      }
    }

    // 📦 Quantity
    if (data.quantityAvailable) {
      data.quantityAvailable = data.quantityAvailable.replace(/\D/g, "");
    }

    // 📅 Month Mapping
    const monthMap = {
      जानेवारी: "January",
      फेब्रुवारी: "February",
      मार्च: "March",
    };

    if (monthMap[data.harvestedMonth]) {
      data.harvestedMonth = monthMap[data.harvestedMonth];
    }

    // 💧 Moisture Mapping
    if (data.moistureLevel.includes("कमी")) {
      data.moistureLevel = "LOW";
    }

    // 🧺 Sorting Mapping
    if (
      data.sortingStatus.toLowerCase().includes("sort") ||
      data.sortingStatus.includes("छांट")
    ) {
      data.sortingStatus = "SORTED";
    }

    // 🌟 Condition fallback
    if (!data.cropCondition && text.includes("ताजे")) {
      data.cropCondition = "FRESH";
    }

    // 📍 Address fallback
    if (!data.addressLine && data.villageOrCity) {
      data.addressLine = data.villageOrCity;
    }

    // 📍 Pincode fix
    // const pinMatch = String(data.pincode).match(/\d{6}/);
    // if (pinMatch) {
    //   data.pincode = pinMatch[0];
    // }
    // 📍 Fix pincode
    if (data.pincode) {
      const pinMatch = String(data.pincode).match(/\d{6}/);
      if (pinMatch) {
        data.pincode = pinMatch[0]; // removes spaces
      }
    }
    // 💧 Moisture fix
    if (data.moistureLevel) {
      const val = data.moistureLevel.toUpperCase();

      if (val.includes("LOW")) data.moistureLevel = "LOW";
      else if (val.includes("MEDIUM")) data.moistureLevel = "MEDIUM";
      else if (val.includes("HIGH")) data.moistureLevel = "HIGH";
      else data.moistureLevel = "NOT_TESTED"; // fallback
    }
    // 🌟 Crop Condition
    if (!data.cropCondition) {
      data.cropCondition = "FRESH";
    }

    // 🧺 Sorting
    if (!data.sortingStatus) {
      data.sortingStatus = "NOT_SORTED";
    }

    // 💧 Moisture default
    if (!data.moistureLevel) {
      data.moistureLevel = "NOT_TESTED";
    }

    console.log("FINAL CLEAN DATA:", data);

    res.json(data);
  } catch (err) {
    console.error("OPENROUTER ERROR:", err.response?.data || err.message);
    res.status(500).json({ message: "AI parsing failed" });
  }
};
