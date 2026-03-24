const Contract = require("../Models/CultivationContract");

const runPaymentPenaltyCron = async () => {
  console.log("💰 Running payment penalty cron");

  const contracts = await Contract.find({ status: "ACTIVE" });

  for (const contract of contracts) {
    let updated = false;

    for (const payment of contract.payments) {
      if (
        payment.status === "DUE" &&
        payment.dueDate &&
        new Date() > payment.dueDate
      ) {
        const daysLate = Math.ceil(
          (new Date() - payment.dueDate) / (24 * 60 * 60 * 1000),
        );

        const percent = daysLate * payment.penalty.percentagePerWeek;
        // 👆 reuse this field as daily %

        const capped = Math.min(percent, payment.penalty.maxCapPercent);

        payment.status = "PENALIZED";

        payment.penalty.appliedAmount = (payment.amount * capped) / 100;

        updated = true;
      }
    }

    if (updated) await contract.save();
  }
};

module.exports = { runPaymentPenaltyCron };
