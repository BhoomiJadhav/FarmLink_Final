const CROP_STAGE_DAYS = {
  wheat: {
    "Seeds Delivered & Sowing": 0,
    "Germination Phase": 8,
    "Vegetative Growth": 22,
    "Tillering Stage": 32,
    "Flowering & Grain Formation": 47,
    "Ripening & Harvest": 115,
  },

  rice: {
    "Seeds Delivered & Sowing": 0,
    "Germination Phase": 10,
    "Vegetative Growth": 25,
    "Tillering Stage": 35,
    "Flowering & Grain Formation": 55,
    "Ripening & Harvest": 130,
  },
};

module.exports = { CROP_STAGE_DAYS };
