// const addDays = (date, days) => {
//   const d = new Date(date);
//   d.setDate(d.getDate() + days);
//   return d;
// };

const computeStageDueInfo = (contract) => {
  const seedStartDate =
    contract.seedDispatch?.farmerConfirmedAt ||
    contract.seedDispatch?.buyerConfirmedAt;

  if (!seedStartDate) return [];

  const start = new Date(seedStartDate);

  return contract.cultivationStages.map((stage) => {
    const dueDate = new Date(start);
    dueDate.setDate(dueDate.getDate() + stage.expectedDays);

    const today = new Date();
    const diffTime = dueDate - today;
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      _id: stage._id,
      name: stage.name,
      expectedDays: stage.expectedDays,
      daysRemaining,
      farmerConfirmed: stage.farmerConfirmed,
      reminder: stage.reminder || { levelSent: 0 },
    };
  });
};

module.exports = { computeStageDueInfo };

module.exports = { computeStageDueInfo };
