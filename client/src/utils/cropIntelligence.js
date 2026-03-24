/* =========================================================
   Crop Intelligence Rules (Advisory Only)
   ---------------------------------------------------------
   NOTE:
   - These are indicative ranges, NOT guarantees
   - Values vary by region, weather, practices
   - Used only for UI guidance & warnings
========================================================= */

export const CROP_RULES = {
  cotton: {
    displayName: "Cotton",
    category: "Fiber",
    seasons: ["Kharif"],
    durationMonths: [5, 6],
    yieldPerAcreQuintal: [8, 12],
    sowingMonths: ["June", "July"],
    harvestMonths: ["November", "December", "January"],
    insuranceRecommended: true,
  },

  wheat: {
    displayName: "Wheat",
    category: "Cereal",
    seasons: ["Rabi"],
    durationMonths: [4, 5],
    yieldPerAcreQuintal: [15, 20],
    sowingMonths: ["October", "November"],
    harvestMonths: ["March", "April"],
    insuranceRecommended: true,
  },

  rice: {
    displayName: "Rice (Paddy)",
    category: "Cereal",
    seasons: ["Kharif"],
    durationMonths: [4, 5],
    yieldPerAcreQuintal: [18, 25],
    sowingMonths: ["June", "July"],
    harvestMonths: ["October", "November"],
    insuranceRecommended: true,
  },

  sugarcane: {
    displayName: "Sugarcane",
    category: "Cash Crop",
    seasons: ["Annual"],
    durationMonths: [10, 12],
    yieldPerAcreQuintal: [300, 400],
    sowingMonths: ["January", "February"],
    harvestMonths: ["December", "January"],
    insuranceRecommended: true,
  },

  soybean: {
    displayName: "Soybean",
    category: "Oilseed",
    seasons: ["Kharif"],
    durationMonths: [3, 4],
    yieldPerAcreQuintal: [10, 14],
    sowingMonths: ["June"],
    harvestMonths: ["September", "October"],
    insuranceRecommended: true,
  },

  maize: {
    displayName: "Maize",
    category: "Cereal",
    seasons: ["Kharif", "Rabi"],
    durationMonths: [3, 4],
    yieldPerAcreQuintal: [12, 18],
    sowingMonths: ["June", "October"],
    harvestMonths: ["September", "February"],
    insuranceRecommended: true,
  },
};

/* ---------- Safe fallback for unknown crops ---------- */
export function getCropGuidance(cropName) {
  if (!cropName) return null;

  const key = cropName.toLowerCase().trim();

  return (
    CROP_RULES[key] || {
      displayName: cropName,
      category: "General Crop",
      seasons: ["Depends on region"],
      durationMonths: [3, 6],
      yieldPerAcreQuintal: [5, 20],
      sowingMonths: ["Depends on climate"],
      harvestMonths: ["Depends on crop cycle"],
      insuranceRecommended: true,
    }
  );
}
