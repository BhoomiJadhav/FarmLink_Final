// simple deep merge for objects (arrays replaced)
export const deepMerge = (target = {}, source = {}) => {
  const out = { ...target };
  Object.keys(source).forEach((k) => {
    if (
      source[k] &&
      typeof source[k] === "object" &&
      !Array.isArray(source[k])
    ) {
      out[k] = deepMerge(target[k], source[k]);
    } else {
      out[k] = source[k];
    }
  });
  return out;
};

export const MIN_REQUIRED_CHECK = (data = {}) => {
  // Only require basic contract info for initial creation
  const contractTitle = data.contractTitle;
  const location = data.location;
  const date = data.date;
  return !!(contractTitle && location && date);
};
