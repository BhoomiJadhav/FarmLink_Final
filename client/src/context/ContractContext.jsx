import { createContext, useContext, useState } from "react";
import axios from "axios";

export const ContractContext = createContext();

export const useContract = () => useContext(ContractContext);

export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState({
    contractTitle: "Contract Farming Agreement",
    contractNumber: "",
    date: new Date(),
    location: "",

    sponsorId: "",
    farmerId: "",

    sponsor: { name: "", address: "" },
    farmer: { name: "", address: "" },

    cropDetails: {
      cropName: "",
      quantity: "",
      area: "",
      surveyNumber: "",
      seasonPeriod: "",
      startDate: "",
      endDate: "",
      expectedStartDate: "",
      expectedEndDate: "",
      variety: "",
      qualityStandard: "",
    },

    responsibilities: { sponsor: [], farmer: [] },

    seedInfo: {
      providedBySponsor: false,
      seedQuality: "",
      seedVariety: "",
      seedQuantityKg: "",
      certification: "",
    },

    deliveryInfo: {
      managedBySponsor: false,
      deliveryLocation: "",
      deliveryDate: "",
      transportBy: "Sponsor",
      weighmentMethod: "",
    },

    pricing: {
      gradeA: "",
      gradeB: "",
      preHarvest: 0,
      postHarvest: 0,
      totalContract: 0,
      currency: "INR",
      priceUnit: "per tonne",
      paymentTerms: [],
      paymentMethod: "",
      bonusPenaltyTerms: "",
      paymentSchedule: [],
    },

    financialHelp: {
      advanceAmount: 0,
      repaymentTerms: "",
      interestRate: 0,
      type: "",
      disbursementDate: "",
      disbursementMode: "",
    },

    conditions: {
      fieldVisitRequired: false,
      photoDocumentationRequired: false,
      lossClause: "",
      additionalBusinessConditions: "",
      additionalConditions: "",
      termination: "",
      forceMajeure: "",
      insurance: "",
      qualityStandards: "",
      compliance: "",
      confidentiality: "",
    },

    disputes: {
      method: "",
      resolutionMethod: "",
      jurisdiction: "",
      mediator: "",
      rules: "",
      noticePeriodDays: "",
      additionalTerms: [],
    },

    signatures: {
      sponsor: { name: "", signatureUrl: "", signedAt: "" },
      farmer: { name: "", signatureUrl: "", signedAt: "" },
      witnesses: [],
    },

    status: "Pending",

    escrow: {
      funded: false,
      released: false,
      refunded: false,
      amount: 0,
      fundedAt: "",
      releasedAt: "",
      refundedAt: "",
    },

    negotiationMessage: "",
  });

  // Update a nested field dynamically
  const updateContractField = (path, value) => {
    setContract((prev) => {
      const newState = { ...prev };
      const keys = path.split(".");
      let temp = newState;
      keys.forEach((key, i) => {
        const isLast = i === keys.length - 1;
        const isIndex = !isNaN(parseInt(key));
        if (isLast) {
          temp[key] = value;
        } else {
          temp[key] = Array.isArray(temp[key])
            ? [...temp[key]]
            : { ...temp[key] };
          temp = temp[key];
        }
      });
      return newState;
    });
  };

  // Save contract to backend
  const saveContract = async () => {
    try {
      const res = await axios.post("/api/contracts/create", contract);
      return res.data.contract;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to save contract");
    }
  };

  const value = {
    contract,
    setContract,
    updateContractField,
    saveContract,
  };

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};
