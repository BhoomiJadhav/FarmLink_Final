import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import ContractEditor from "../../components/contractEditor";
import ContractPreview from "../../components/ContractPreview";

import {
  createCultivationContract,
  getContractById,
  updateContract,
} from "../../api/contractApi";
import { getBuyerDetails } from "../../api/userApi";
import { getFarmerById } from "../../api/farmerApi";

export default function ContractEditorPage() {
  const previewRef = useRef(null);

  const { farmerId } = useParams();
  const [searchParams] = useSearchParams();
  const contractId = searchParams.get("contractId");

  const [contract, setContract] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(true);

  /* ================= INIT ================= */
  useEffect(() => {
    const init = async () => {
      try {
        /* ---------- EDIT MODE ---------- */
        if (contractId) {
          const res = await getContractById(contractId);

          if (res.contract.contractType !== "CULTIVATION") {
            alert("This contract is not a cultivation contract.");
            return;
          }

          setContract(res.contract);
          setLoading(false);
          return;
        }

        /* ---------- CREATE MODE ---------- */
        const buyer = await getBuyerDetails();
        const farmer = await getFarmerById(farmerId);

        setContract({
          contractName: "Crop Cultivation Contract",
          contractDate: new Date().toISOString(),
          buyerLocation: "",
          status: "DRAFT",

          buyer: {
            buyerId: buyer._id,
            name: buyer.name,
            address: buyer.buyerProfile?.address || "",
            email: buyer.email || "",
            mobile: buyer.buyerProfile?.phone || "",
          },

          farmer: {
            farmerId: farmer.userId || farmer._id,
            name: farmer.personal?.fullName || farmer.name,
            address:
              farmer.personal?.address || farmer.farm?.farmLocation || "",
          },

          cropDetails: {
            cropName: "",
            variety: "",
            season: "",
            contractedArea: "",
            expectedYield: "",
            cultivationGuidelines: "",
          },

          pricing: {
            agreedPricePerUnit: "",
            advancePaymentPercent: "",
            finalPaymentTerms: "",
          },

          delivery: {
            approxDeliveryMonth: "",
            deliveryLocation: "",
            deliveryManagedBy: "BUYER",
          },

          insurance: {
            providedByCompany: false,
            pmfbyMandatory: true,
            policyNumber: "",
          },

          legal: {
            applicableLaws: "Indian Contract Act, 1872",
            disputeResolutionMethod:
              "Farmlink Mediation followed by Court (India)",
          },
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Unable to load contract editor");
      }
    };

    init();
  }, [farmerId, contractId]);

  /* ================= PDF DOWNLOAD ================= */
  // const handleDownloadPDF = useReactToPrint({
  //   contentRef: previewRef,
  //   documentTitle: `Contract_${contract?._id || "DRAFT"}`,
  //   pageStyle: `
  //   @page { size: A4; margin: 20mm; }

  //   body {
  //     -webkit-print-color-adjust: exact !important;
  //     print-color-adjust: exact !important;
  //   }

  //   * {
  //     visibility: visible !important;
  //   }

  //   .print-container {
  //     display: block !important;
  //   }
  // `,
  // });

  // const handleDownloadPDF = useReactToPrint({
  //   contentRef: previewRef,
  //   documentTitle: `Contract_${contract?._id || "DRAFT"}`,
  // });

  /* ================= SAVE ================= */
  const handleSave = async (mode) => {
    try {
      const payload = { ...contract, status: mode };

      let res;
      if (contract._id) {
        res = await updateContract(contract._id, payload);
      } else {
        res = await createCultivationContract(payload);
      }
      const total =
        Number(contract.pricing.agreedPricePerUnit || 0) *
        Number(contract.cropDetails.expectedYield || 0);

      contract.pricing.totalAmount = total;

      const advance =
        (total * Number(contract.pricing.advancePaymentPercent || 0)) / 100;

      contract.pricing.advanceAmount = advance;

      setContract(res.contract);

      alert(
        mode === "DRAFT"
          ? "Draft saved successfully"
          : "Contract sent to farmer",
      );
    } catch (err) {
      console.error(err);
      alert("Failed to save contract");
    }
  };

  if (loading || !contract) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading contract editor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* ACTION BAR */}
      {/* <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            handleDownloadPDF();
          }}
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          Download PDF
        </button>
      </div> */}

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-2 gap-6 print:">
        <ContractEditor
          contract={contract}
          setContract={setContract}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSave={handleSave}
        />

        <ContractPreview
          ref={previewRef}
          contract={contract}
          contractId={contract._id}
        />
      </div>
    </div>
  );
}
