// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import logo from "../../assets/farmlink-logo.png";
// import stamp from "../../assets/farmlink-stamp.png";

// export default function ViewContractDocument() {
//   const { contractId } = useParams();
//   const [contract, setContract] = useState(null);

//   useEffect(() => {
//     const fetchContract = async () => {
//       const res = await axios.get(`/contracts/${contractId}`);
//       setContract(res.data.contract);
//     };
//     fetchContract();
//   }, [contractId]);

//   if (!contract) return <div className="p-6">Loading Agreement...</div>;
//   const handleDownloadPDF = async () => {
//     const element = document.getElementById("contract-document");

//     const canvas = await html2canvas(element, {
//       scale: 2,
//       useCORS: true,
//       backgroundColor: "#ffffff",
//       onclone: (doc) => {
//         // force-safe colors for html2canvas
//         doc.body.style.backgroundColor = "#ffffff";
//       },
//     });

//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");

//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = pdf.internal.pageSize.getHeight();

//     const imgWidth = pdfWidth;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     // 1️⃣ MAIN DOCUMENT CONTENT
//     pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

//     // 2️⃣ WATERMARK LOGO (CENTER, VERY LIGHT)
//     pdf.setGState(new pdf.GState({ opacity: 0.08 }));
//     pdf.addImage(logo, "PNG", pdfWidth / 2 - 45, pdfHeight / 2 - 45, 90, 90);
//     pdf.setGState(new pdf.GState({ opacity: 1 }));

//     // 3️⃣ OFFICIAL STAMP (BOTTOM RIGHT – ON TOP)
//     pdf.addImage(stamp, "PNG", pdfWidth - 65, pdfHeight - 65, 50, 50);
//     pdf.setFontSize(10);
//     pdf.text("Digitally Approved by FARMLINK", pdfWidth - 80, pdfHeight - 10);

//     pdf.save(`Contract-${contract.contractId}.pdf`);
//   };

//   return (
//     <div
//       id="contract-document"
//       className="contract-document relative max-w-5xl mx-auto bg-white p-10 text-sm leading-relaxed"
//     >
//       <button
//         onClick={handleDownloadPDF}
//         className="border px-4 py-2 rounded text-sm hover:bg-gray-100"
//       >
//         Download PDF
//       </button>

//       <AgreementHeader contract={contract} />
//       <PartiesSection contract={contract} />
//       <CropSection contract={contract} />
//       <PaymentSection contract={contract} />
//       <StagesSection contract={contract} />
//       <DeclarationSection />
//       <SignatureSection contract={contract} />
//       <div className="relative mt-12">
//         <img
//           src={stamp}
//           alt="Farmlink Official Stamp"
//           className="absolute right-0 bottom-0 w-28 opacity-90"
//         />
//       </div>
//     </div>
//   );
// }
// function AgreementHeader({ contract }) {
//   return (
//     <div className="text-center border-b pb-6 mb-6">
//       <h1 className="text-lg font-bold uppercase">Government of India</h1>
//       <h2 className="font-semibold mt-1">
//         Digital Agriculture Cultivation Agreement
//       </h2>

//       <div className="grid grid-cols-2 gap-4 mt-6 text-left">
//         <p>
//           <strong>Contract ID:</strong> {contract.contractId}
//         </p>
//         <p>
//           <strong>Contract Date:</strong>{" "}
//           {new Date(contract.contractDate).toDateString()}
//         </p>
//         <p>
//           <strong>Contract Type:</strong> {contract.contractType}
//         </p>
//         <p>
//           <strong>Status:</strong> {contract.status}
//         </p>
//       </div>
//     </div>
//   );
// }
// function PartiesSection({ contract }) {
//   return (
//     <section className="mb-6">
//       <h3 className="font-semibold border-b mb-2">Parties to the Agreement</h3>

//       <div className="grid grid-cols-2 gap-6">
//         <div>
//           <p className="font-medium">Farmer</p>
//           <p>Name: {contract.farmer.name}</p>
//           <p>Address: {contract.farmer.address}</p>
//         </div>

//         <div>
//           <p className="font-medium">Buyer</p>
//           <p>Name: {contract.buyer.name}</p>
//           <p>Address: {contract.buyer.address}</p>
//           <p>Mobile: {contract.buyer.mobile}</p>
//           <p>Email: {contract.buyer.email}</p>
//         </div>
//       </div>
//     </section>
//   );
// }
// function CropSection({ contract }) {
//   const c = contract.cropDetails;
//   return (
//     <section className="mb-6">
//       <h3 className="font-semibold border-b mb-2">
//         Crop & Cultivation Details
//       </h3>

//       <ul className="grid grid-cols-2 gap-4">
//         <li>Crop Name: {c.cropName}</li>
//         <li>Variety: {c.variety}</li>
//         <li>Season: {c.season}</li>
//         <li>Contracted Area: {c.contractedArea} Acres</li>
//         <li>Expected Yield: {c.expectedYield} Quintals</li>
//       </ul>
//     </section>
//   );
// }
// function PaymentSection({ contract }) {
//   return (
//     <section className="mb-6">
//       <h3 className="font-semibold border-b mb-2">Payment Terms</h3>

//       {contract.paymentSchedule.map((p, i) => (
//         <p key={i}>
//           • {p.stage} – ₹{p.amount} ({p.status})
//         </p>
//       ))}
//     </section>
//   );
// }
// function StagesSection({ contract }) {
//   return (
//     <section className="mb-6">
//       <h3 className="font-semibold border-b mb-2">
//         Cultivation Stages & Obligations
//       </h3>

//       {contract.cultivationStages.map((s, i) => (
//         <p key={i}>
//           {i + 1}. {s.stageName} – {s.status}
//         </p>
//       ))}
//     </section>
//   );
// }
// function DeclarationSection() {
//   return (
//     <section className="mb-6">
//       <h3 className="font-semibold border-b mb-2">Declaration & Undertaking</h3>

//       <p>
//         Both parties hereby declare that the information provided in this
//         agreement is true and correct. This agreement is legally binding and
//         governed under applicable agricultural contract laws of India.
//       </p>
//     </section>
//   );
// }
// function SignatureSection({ contract }) {
//   return (
//     <section>
//       <h3 className="font-semibold border-b mb-2">Digital Signatures</h3>

//       <div className="grid grid-cols-2 gap-6 mt-4">
//         <div>
//           <p className="font-medium">Farmer Signature</p>
//           <p>Signed: {contract.farmerSignature.signed ? "Yes" : "No"}</p>
//           <p>Date: {contract.farmerSignature.signedAt}</p>
//         </div>

//         <div>
//           <p className="font-medium">Buyer Signature</p>
//           <p>Signed: {contract.buyerSignature.signed ? "Yes" : "No"}</p>
//           <p>Date: {contract.buyerSignature.signedAt}</p>
//         </div>
//       </div>
//     </section>
//   );
// }
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "../../api/axios";
import { useReactToPrint } from "react-to-print";
import stamp from "../../assets/farmlink-stamp.png";

export default function ViewContractDocument() {
  const { contractId } = useParams();
  const [contract, setContract] = useState(null);

  // ✅ create ref
  const printRef = useRef(null);

  useEffect(() => {
    const fetchContract = async () => {
      const res = await axios.get(`/contracts/${contractId}`);
      setContract(res.data.contract);
    };
    fetchContract();
  }, [contractId]);

  // ✅ CORRECT API
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: contract ? `Contract-${contract.contractId}` : "Contract",
  });

  if (!contract) return <div className="p-6">Loading Agreement...</div>;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Button must be OUTSIDE printable area */}
      <div className="flex justify-end mb-4 no-print">
        <button
          onClick={handlePrint}
          className="border px-4 py-2 rounded text-sm hover:bg-gray-100"
        >
          Download PDF
        </button>
      </div>

      {/* ✅ PRINTABLE CONTENT */}
      <div
        ref={printRef}
        className="contract-document contract-print-scope relative bg-white p-10 text-sm leading-relaxed"
      >
        <AgreementHeader contract={contract} />
        <PartiesSection contract={contract} />
        <CropSection contract={contract} />

        <PricingSection contract={contract} />
        <DeliverySection contract={contract} />
        <InsuranceSection contract={contract} />

        <ResponsibilitiesSection contract={contract} />
        <LegalSection contract={contract} />

        <StagesSection contract={contract} />
        <DeclarationSection />
        <SignatureSection contract={contract} />

        {/* STAMP */}
        <div className="flex justify-end mt-12">
          <div className="text-center">
            <img src={stamp} className="w-28 mx-auto" />
            <p className="text-xs mt-1">Digitally Approved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== SECTIONS ===================== */

function AgreementHeader({ contract }) {
  return (
    <div className="text-center border-b pb-6 mb-6">
      <h1 className="text-lg font-bold uppercase">Government of India</h1>
      <h2 className="font-semibold mt-1">
        Digital Agriculture Cultivation Agreement
      </h2>

      <div className="grid grid-cols-2 gap-4 mt-6 text-left">
        <p>
          <strong>Contract ID:</strong> {contract.contractId}
        </p>
        <p>
          <strong>Contract Date:</strong>{" "}
          {new Date(contract.contractDate).toDateString()}
        </p>
        <p>
          <strong>Contract Type:</strong> {contract.contractType}
        </p>
        <p>
          <strong>Status:</strong> {contract.status}
        </p>
      </div>
    </div>
  );
}

function PartiesSection({ contract }) {
  return (
    <section className="mb-6">
      <h3 className="font-semibold border-b mb-2">Parties to the Agreement</h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="font-medium">Farmer</p>
          <p>Name: {contract.farmer.name}</p>
          <p>Address: {contract.farmer.address}</p>
        </div>
        <div>
          <p className="font-medium">Buyer</p>
          <p>Name: {contract.buyer.name}</p>
          <p>Address: {contract.buyer.address}</p>
          <p>Mobile: {contract.buyer.mobile}</p>
          <p>Email: {contract.buyer.email}</p>
        </div>
      </div>
    </section>
  );
}

function CropSection({ contract }) {
  const c = contract.cropDetails;
  return (
    <section className="mb-6">
      <h3 className="font-semibold border-b mb-2">
        Crop & Cultivation Details
      </h3>
      <ul className="grid grid-cols-2 gap-4">
        <li>Crop Name: {c.cropName}</li>
        <li>Variety: {c.variety}</li>
        <li>Season: {c.season}</li>
        <li>Contracted Area: {c.contractedArea} Acres</li>
        <li>Expected Yield: {c.expectedYield} Quintals</li>
      </ul>
    </section>
  );
}

function PricingSection({ contract }) {
  const p = contract.pricing;

  if (!p) return null;

  return (
    <section className="mb-6">
      <h3 className="font-semibold border-b mb-2">Pricing & Payment Terms</h3>

      <ul className="space-y-1">
        <li>
          <strong>Agreed Price:</strong> ₹{p.agreedPricePerUnit} per quintal
        </li>
        <li>
          <strong>Estimated Contract Value:</strong> ₹{p.estimatedValue}
        </li>
        <li>
          <strong>Advance Payment:</strong> {p.advancePaymentPercent}% ( ₹
          {p.advanceAmount})
        </li>
        <li>
          <strong>Final Payment Terms:</strong> {p.finalPaymentTerms}
        </li>
        <li>
          <strong>Price Negotiable:</strong> {p.priceNegotiable ? "Yes" : "No"}
        </li>
      </ul>
    </section>
  );
}
function DeliverySection({ contract }) {
  const d = contract.delivery;
  if (!d) return null;

  return (
    <section className="mb-6">
      <h3 className="font-semibold border-b mb-2">Delivery Terms</h3>

      <ul className="space-y-1">
        <li>
          <strong>Expected Delivery Month:</strong> {d.approxDeliveryMonth}
        </li>
        <li>
          <strong>Delivery Location:</strong> {d.deliveryLocation}
        </li>
        <li>
          <strong>Transportation By Buyer:</strong>{" "}
          {d.transportationByBuyer ? "Yes" : "No"}
        </li>
        <li>
          <strong>Delivery Managed By:</strong> {d.deliveryManagedBy}
        </li>
      </ul>
    </section>
  );
}
function InsuranceSection({ contract }) {
  const i = contract.insurance;
  if (!i) return null;

  return (
    <section className="mb-6">
      <h3 className="font-semibold border-b mb-2">Insurance & Risk Coverage</h3>

      <ul className="space-y-1">
        <li>
          <strong>Insurance Provider:</strong>{" "}
          {i.providerName || "Government Scheme"}
        </li>
        <li>
          <strong>Policy Number:</strong> {i.policyNumber}
        </li>
        <li>
          <strong>Valid Till:</strong>{" "}
          {i.policyValidTill
            ? new Date(i.policyValidTill).toDateString()
            : "N/A"}
        </li>
        <li>
          <strong>Flood Risk:</strong> {i.riskManagement?.flood}
        </li>
        <li>
          <strong>Drought Risk:</strong> {i.riskManagement?.drought}
        </li>
      </ul>
    </section>
  );
}
function ResponsibilitiesSection({ contract }) {
  const r = contract.responsibilities;
  if (!r) return null;

  return (
    <section className="mb-6">
      <h3 className="font-semibold border-b mb-2">Responsibilities</h3>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="font-medium mb-1">Buyer Responsibilities</p>
          <ul className="list-disc pl-5">
            {r.buyerResponsibilities?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-medium mb-1">Farmer Responsibilities</p>
          <ul className="list-disc pl-5">
            {r.farmerResponsibilities?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function LegalSection({ contract }) {
  const l = contract.legal;
  if (!l) return null;

  return (
    <section className="mb-6">
      <h3 className="font-semibold border-b mb-2">
        Legal & Dispute Resolution
      </h3>

      <p>
        <strong>Applicable Laws:</strong> {l.applicableLaws}
      </p>
      <p className="mt-1">
        <strong>Dispute Resolution:</strong> {l.disputeResolutionMethod}
      </p>
    </section>
  );
}

function StagesSection({ contract }) {
  return (
    <section className="mb-6">
      <h3 className="font-semibold border-b mb-2">
        Cultivation Stages & Obligations
      </h3>
      {contract.cultivationStages.map((s, i) => (
        <p key={i}>
          {i + 1}. {s.stageName} – {s.status}
        </p>
      ))}
    </section>
  );
}

function DeclarationSection() {
  return (
    <section className="mb-6">
      <h3 className="font-semibold border-b mb-2">Declaration & Undertaking</h3>
      <p>
        Both parties hereby declare that the information provided in this
        agreement is true and correct and governed under applicable agricultural
        laws of India.
      </p>
    </section>
  );
}

function SignatureSection({ contract }) {
  return (
    <section>
      <h3 className="font-semibold border-b mb-2">Digital Signatures</h3>
      <div className="grid grid-cols-2 gap-6 mt-4">
        <div>
          <p className="font-medium">Farmer Signature</p>
          <p>Signed: {contract.farmerSignature.signed ? "Yes" : "No"}</p>
          <p>Date: {contract.farmerSignature.signedAt}</p>
        </div>
        <div>
          <p className="font-medium">Buyer Signature</p>
          <p>Signed: {contract.buyerSignature.signed ? "Yes" : "No"}</p>
          <p>Date: {contract.buyerSignature.signedAt}</p>
        </div>
      </div>
    </section>
  );
}
