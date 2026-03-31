// import React, { useRef, forwardRef } from "react";

// import { Download, Printer } from "lucide-react";
// import FarmlinkLogo from "../assets/farmlink-logo.png";

// const ContractPreview = forwardRef(({ contract, contractId }, ref) => {
//   const isPdf =
//     new URLSearchParams(window.location.search).get("pdf") === "true";

//   const crop = contract.cropDetails || {};
//   const payment = contract.payment || {};
//   const delivery = contract.delivery || {};
//   const insurance = contract.insurance || {};
//   const legal = contract.legal || {};
//   const buyer = contract.buyer || {};
//   const farmer = contract.farmer || {};

//   const totalValue =
//     Number(payment.agreedPricePerUnit || 0) * Number(crop.expectedYield || 0);

//   const advanceAmount =
//     (totalValue * Number(payment.advancePaymentPercent || 0)) / 100;

//   const remainingAmount = totalValue - advanceAmount;
//   console.log("Contract object:", contract);
//   console.log("Contract ID:", contract?._id);
//   const handleDownloadPDF = useReactToPrint({
//     content: () => previewRef.current,
//     documentTitle: `Contract_${contract.contractId || "DRAFT"}`,
//     pageStyle: `
//     @page {
//       size: A4;
//       margin: 20mm;
//     }
//     body {
//       -webkit-print-color-adjust: exact;
//       print-color-adjust: exact;
//     }
//   `,
//   });

//   console.log("contract._id:", contract._id);
//   console.log("contract.contractId:", contract.contractId);
//   console.log("prop contractId:", contractId);

//   return (
//     <div className="max-w-5xl mx-auto">
//       {/* ACTION BAR */}
//       {!isPdf && (
//         <div className="flex justify-end gap-2 mb-4">
//           <button
//             onClick={handleDownloadPDF}
//             className="flex items-center gap-2 px-3 py-2 border rounded text-sm hover:bg-gray-50"
//           >
//             <Download size={16} /> Download PDF
//           </button>

//           <button
//             onClick={() => window.print()}
//             className="flex items-center gap-2 px-3 py-2 border rounded text-sm hover:bg-gray-50"
//           >
//             <Printer size={16} /> Print
//           </button>
//         </div>
//       )}

//       {/* ================= PDF CONTENT ================= */}
//       <div ref={pdfRef} className=" bg-white border rounded-xl shadow">
//         {/* ============ HEADER ============ */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <div className="flex items-center gap-4">
//             <img src={FarmlinkLogo} alt="Farmlink" className="h-12" />
//             <div>
//               <h1 className="text-xl font-bold">
//                 FARMLINK AGRICULTURAL CONTRACT
//               </h1>
//               <p className="text-xs text-gray-600">
//                 A digital contract platform for assured farming
//               </p>
//             </div>
//           </div>

//           <div className="text-xs text-gray-600 text-right">
//             <p>Contract ID: {contract._id || "Draft"}</p>
//             <p>
//               Date:{" "}
//               {new Date(contract.contractDate).toLocaleDateString("en-IN")}
//             </p>
//           </div>
//         </div>

//         {/* ============ BODY ============ */}
//         <div className="p-6 space-y-8 text-sm leading-relaxed">
//           {/* 1. PARTIES */}
//           <section>
//             <h2 className="font-semibold text-lg mb-3">
//               1. Parties to the Agreement
//             </h2>
//             <div className="grid grid-cols-2 gap-4 border p-4">
//               <div>
//                 <p className="font-medium">Buyer</p>
//                 <p>{buyer.name}</p>
//                 <p className="text-gray-600">{buyer.address}</p>
//                 <p className="text-gray-600">{buyer.email}</p>
//                 <p className="text-gray-600">{buyer.mobile}</p>
//               </div>
//               <div>
//                 <p className="font-medium">Farmer</p>
//                 <p>{farmer.name}</p>
//                 <p className="text-gray-600">{farmer.address}</p>
//                 <p className="text-gray-600">{farmer.mobile}</p>
//               </div>
//             </div>
//           </section>

//           {/* 2. CROP DETAILS */}
//           <section>
//             <h2 className="font-semibold text-lg mb-3">
//               2. Crop & Cultivation Details
//             </h2>
//             <div className="border p-4 grid grid-cols-2 gap-4">
//               <p>
//                 <b>Crop:</b> {crop.cropName}
//               </p>
//               <p>
//                 <b>Variety:</b> {crop.variety || "—"}
//               </p>
//               <p>
//                 <b>Season:</b> {crop.season}
//               </p>
//               <p>
//                 <b>Area:</b> {crop.contractedArea} acres
//               </p>
//               <p>
//                 <b>Expected Yield:</b> {crop.expectedYield} quintals
//               </p>
//             </div>
//             {crop.cultivationGuidelines && (
//               <div className="mt-3 border p-4 bg-gray-50">
//                 <p className="font-medium mb-1">Cultivation Guidelines</p>
//                 <p className="whitespace-pre-line">
//                   {crop.cultivationGuidelines}
//                 </p>
//               </div>
//             )}
//           </section>

//           {/* 3. PAYMENT TERMS */}
//           <section>
//             <h2 className="font-semibold text-lg mb-3">3. Payment Terms</h2>
//             <div className="border p-4 grid grid-cols-2 gap-4">
//               <p>
//                 <b>Agreed Price:</b> ₹{payment.agreedPricePerUnit} / unit
//               </p>
//               <p>
//                 <b>Advance:</b> {payment.advancePaymentPercent}%
//               </p>
//             </div>

//             <div className="mt-4 bg-blue-50 border p-4">
//               <p className="font-semibold mb-2">Payment Distribution</p>
//               <p>
//                 <b>Total Value:</b> ₹{totalValue.toLocaleString()}
//               </p>
//               <p className="text-green-700">
//                 <b>Advance Payable:</b> ₹{advanceAmount.toLocaleString()}
//               </p>
//               <p className="text-indigo-700">
//                 <b>Balance Payable:</b> ₹{remainingAmount.toLocaleString()}
//               </p>
//             </div>

//             {payment.finalPaymentTerms && (
//               <div className="mt-3 border p-4">
//                 <p className="font-medium mb-1">Final Payment Conditions</p>
//                 <p className="whitespace-pre-line">
//                   {payment.finalPaymentTerms}
//                 </p>
//               </div>
//             )}
//           </section>

//           {/* 4. DELIVERY */}
//           <section>
//             <h2 className="font-semibold text-lg mb-3">
//               4. Delivery & Logistics
//             </h2>
//             <div className="border p-4 grid grid-cols-2 gap-4">
//               <p>
//                 <b>Delivery Month:</b> {delivery.approxDeliveryMonth}
//               </p>
//               <p>
//                 <b>Location:</b> {delivery.deliveryLocation}
//               </p>
//               <p>
//                 <b>Managed By:</b> {delivery.deliveryManagedBy}
//               </p>
//             </div>
//           </section>

//           {/* 5. INSURANCE */}
//           <section>
//             <h2 className="font-semibold text-lg mb-3">
//               5. Insurance & Liability
//             </h2>
//             <div className="border p-4">
//               <p>
//                 <b>Insurance:</b>{" "}
//                 {insurance.providedByCompany ? "Provided" : "Not Provided"}
//               </p>
//               <p>
//                 <b>PMFBY Policy:</b>{" "}
//                 {insurance.policyNumber ||
//                   "To be provided by farmer at acceptance"}
//               </p>
//             </div>
//           </section>

//           {/* 6. LEGAL */}
//           <section>
//             <h2 className="font-semibold text-lg mb-3">6. Legal Clauses</h2>
//             <div className="border p-4 space-y-3">
//               <p>
//                 <b>Force Majeure:</b> Natural calamities or government actions
//                 shall not constitute breach.
//               </p>
//               <p>
//                 <b>Dispute Resolution:</b> Mediation → Arbitration → Court.
//               </p>
//               <p>
//                 <b>Governing Law:</b> Indian Contract Act, 1872.
//               </p>
//             </div>
//           </section>

//           {/* SIGNATURES */}
//           <section className="border-t pt-6">
//             <h2 className="font-semibold text-lg mb-3">Digital Signatures</h2>
//             <div className="grid grid-cols-2 gap-6">
//               <div>
//                 <p className="font-medium">Buyer</p>
//                 <p>
//                   Status:{" "}
//                   {contract.signatures?.buyerSigned ? "Signed" : "Pending"}
//                 </p>
//               </div>
//               <div>
//                 <p className="font-medium">Farmer</p>
//                 <p>
//                   Status:{" "}
//                   {contract.signatures?.farmerSigned ? "Signed" : "Pending"}
//                 </p>
//               </div>
//             </div>
//           </section>
//         </div>

//         {/* ============ FOOTER ============ */}
//         <div className="border-t p-4 text-xs text-gray-600 text-center">
//           <p>
//             Generated via <b>Farmlink</b> – Assured Contract Farming Platform
//           </p>
//           <p>Support: support@farmlink.in | Helpline: +91 98765 43210</p>
//           <p className="mt-1">
//             This is a digitally generated agreement and does not require
//             physical stamping.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// });
// export default ContractPreview;
import React, { forwardRef } from "react";
import FarmlinkLogo from "../assets/farmlink-logo.png";

const ContractPreview = forwardRef(({ contract, contractId }, ref) => {
  if (!contract) return null;

  const crop = contract.cropDetails || {};
  const pricing = contract.pricing || {};
  const delivery = contract.delivery || {};
  const insurance = contract.insurance || {};
  const buyer = contract.buyer || {};
  const farmer = contract.farmer || {};

  const totalValue =
    Number(pricing.agreedPricePerUnit || 0) * Number(crop.expectedYield || 0);

  const advanceAmount =
    (totalValue * Number(pricing.advancePaymentPercent || 0)) / 100;

  const remainingAmount = totalValue - advanceAmount;

  return (
    <div ref={ref}>
      {!contract ? (
        <div>Loading preview...</div>
      ) : (
        <>
          <div className="max-w-5xl mx-auto bg-white border rounded-xl shadow">
            {/* ============ HEADER ============ */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-4">
                <img src={FarmlinkLogo} alt="Farmlink" className="h-12" />
                <div>
                  <h1 className="text-xl font-bold">
                    FARMLINK AGRICULTURAL CONTRACT
                  </h1>
                  <p className="text-xs text-gray-600">
                    A digital contract platform for assured farming
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-600 text-right">
                <p>Contract ID: {contract.contractId || "Draft"}</p>
                <p>
                  Date:{" "}
                  {new Date(contract.contractDate).toLocaleDateString("en-IN")}
                </p>
              </div>
            </div>

            {/* ============ BODY ============ */}
            <div className="p-6 space-y-8 text-sm leading-relaxed">
              {/* 1. PARTIES */}
              <section>
                <h2 className="font-semibold text-lg mb-3">
                  1. Parties to the Agreement
                </h2>
                <div className="grid grid-cols-2 gap-4 border p-4">
                  <div>
                    <p className="font-medium">Buyer</p>
                    <p>{buyer.name}</p>
                    <p className="text-gray-600">{buyer.address}</p>
                    <p className="text-gray-600">{buyer.email}</p>
                    <p className="text-gray-600">{buyer.mobile}</p>
                  </div>
                  <div>
                    <p className="font-medium">Farmer</p>
                    <p>{farmer.name}</p>
                    <p className="text-gray-600">{farmer.address}</p>
                    <p className="text-gray-600">{farmer.mobile}</p>
                  </div>
                </div>
              </section>

              {/* 2. CROP DETAILS */}
              <section>
                <h2 className="font-semibold text-lg mb-3">
                  2. Crop & Cultivation Details
                </h2>
                <div className="border p-4 grid grid-cols-2 gap-4">
                  <p>
                    <b>Crop:</b> {crop.cropName || "—"}
                  </p>
                  <p>
                    <b>Variety:</b> {crop.variety || "—"}
                  </p>
                  <p>
                    <b>Season:</b> {crop.season || "—"}
                  </p>
                  <p>
                    <b>Area:</b> {crop.contractedArea || "—"} acres
                  </p>
                  <p>
                    <b>Expected Yield:</b> {crop.expectedYield || "—"} quintals
                  </p>
                </div>

                {crop.cultivationGuidelines && (
                  <div className="mt-3 border p-4 bg-gray-50">
                    <p className="font-medium mb-1">Cultivation Guidelines</p>
                    <p className="whitespace-pre-line">
                      {crop.cultivationGuidelines}
                    </p>
                  </div>
                )}
              </section>

              {/* 3. PAYMENT TERMS */}
              <section>
                <h2 className="font-semibold text-lg mb-3">3. Payment Terms</h2>
                <div className="border p-4 grid grid-cols-2 gap-4">
                  <p>
                    <b>Agreed Price:</b> ₹{pricing.agreedPricePerUnit || "—"} /
                    unit
                  </p>
                  <p>
                    <b>Advance:</b> {pricing.advancePaymentPercent || 0}%
                  </p>
                </div>

                <div className="mt-4 bg-blue-50 border p-4">
                  <p className="font-semibold mb-2">Payment Distribution</p>
                  <p>
                    <b>Total Value:</b> ₹{totalValue.toLocaleString()}
                  </p>
                  <p className="text-green-700">
                    <b>Advance Payable:</b> ₹{advanceAmount.toLocaleString()}
                  </p>
                  <p className="text-indigo-700">
                    <b>Balance Payable:</b> ₹{remainingAmount.toLocaleString()}
                  </p>
                </div>

                {pricing.finalPaymentTerms && (
                  <div className="mt-3 border p-4">
                    <p className="font-medium mb-1">Final Payment Conditions</p>
                    <p className="whitespace-pre-line">
                      {pricing.finalPaymentTerms}
                    </p>
                  </div>
                )}
              </section>

              {/* 4. DELIVERY */}
              <section>
                <h2 className="font-semibold text-lg mb-3">
                  4. Delivery & Logistics
                </h2>
                <div className="border p-4 grid grid-cols-2 gap-4">
                  <p>
                    <b>Delivery Month:</b> {delivery.approxDeliveryMonth || "—"}
                  </p>
                  <p>
                    <b>Location:</b> {delivery.deliveryLocation || "—"}
                  </p>
                  <p>
                    <b>Managed By:</b> {delivery.deliveryManagedBy || "—"}
                  </p>
                </div>
              </section>

              {/* 5. INSURANCE */}
              <section>
                <h2 className="font-semibold text-lg mb-3">
                  5. Insurance & Liability
                </h2>
                <div className="border p-4">
                  <p>
                    <b>Insurance:</b>{" "}
                    {insurance.providedByCompany ? "Provided" : "Not Provided"}
                  </p>
                  <p>
                    <b>PMFBY Policy:</b>{" "}
                    {insurance.policyNumber || "To be provided by farmer"}
                  </p>
                </div>
              </section>

              {/* 6. LEGAL */}
              <section>
                <h2 className="font-semibold text-lg mb-3">6. Legal Clauses</h2>
                <div className="border p-4 space-y-2">
                  <p>
                    <b>Governing Law:</b> Indian Contract Act, 1872
                  </p>
                  <p>
                    <b>Dispute Resolution:</b> Mediation → Arbitration → Court
                  </p>
                </div>
              </section>

              {/* SIGNATURES */}
              <section className="border-t pt-6">
                <h2 className="font-semibold text-lg mb-3">
                  Digital Signatures
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-medium">Buyer</p>
                    <p>
                      Status:{" "}
                      {contract.signatures?.buyerSigned ? "Signed" : "Pending"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Farmer</p>
                    <p>
                      Status:{" "}
                      {contract.signatures?.farmerSigned ? "Signed" : "Pending"}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* FOOTER */}
            <div className="border-t p-4 text-xs text-gray-600 text-center">
              <p>
                Generated via <b>Farmlink</b> – Assured Contract Farming
                Platform
              </p>
              <p>
                This is a digitally generated agreement and does not require
                physical stamping.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default ContractPreview;
