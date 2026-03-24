// // const PaymentSchedule = ({ payments = [] }) => {
// //   return (
// //     <div className="bg-white border rounded-xl p-6">
// //       <h2 className="font-semibold mb-4">Payment Schedule</h2>

// //       <div className="space-y-4">
// //         {payments.map((p, i) => (
// //           <div
// //             key={i}
// //             className="flex justify-between items-center p-4 rounded-lg border"
// //           >
// //             <div>
// //               <div className="font-medium">{p.label}</div>
// //               <div className="text-sm text-gray-500">
// //                 ₹{p.amount.toLocaleString()}
// //               </div>
// //             </div>

// //             {p.status === "paid" && (
// //               <span className="text-green-600">Paid</span>
// //             )}
// //             {p.status === "pending" && (
// //               <button className="btn-primary">Pay Now</button>
// //             )}
// //             {p.status === "upcoming" && (
// //               <span className="text-gray-400">Upcoming</span>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PaymentSchedule;
// const PaymentSchedule = ({ payments = [] }) => {
//   return (
//     <div className="bg-white border rounded-xl p-6">
//       <h2 className="font-semibold mb-4">Payment Schedule</h2>

//       <div className="space-y-4">
//         {payments.map((p, i) => (
//           <div
//             key={i}
//             className="flex justify-between items-center p-4 rounded-lg border"
//           >
//             <div>
//               <div className="font-medium">{p.type}</div>
//               <div className="text-sm text-gray-500">
//                 ₹{p.amount?.toLocaleString() || "—"}
//               </div>
//             </div>

//             {p.status === "PAID" && (
//               <span className="text-green-600 font-medium">Paid</span>
//             )}

//             {p.status === "DUE" && (
//               <button className="px-3 py-1 text-sm rounded bg-green-600 text-white">
//                 Pay Now
//               </button>
//             )}

//             {p.status === "LOCKED" && (
//               <span className="text-gray-400 text-sm">Locked</span>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PaymentSchedule;

import React from "react";
import axios from "../../../api/axios";

const statusColor = {
  LOCKED: "bg-gray-200 text-gray-500",
  DUE: "bg-yellow-100 text-yellow-700",
  PENDING_VERIFICATION: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  PENALIZED: "bg-red-100 text-red-700",
};

const PaymentSchedule = ({ contractId, payments = [], dispute }) => {
  const isPaymentFrozen =
    dispute?.status === "OPEN" || dispute?.status === "UNDER_REVIEW";

  const uploadProof = async (paymentId, file) => {
    if (!file) return;

    const formData = new FormData();
    // ✅ KEY FIX: Changed "proof" to "images" to match Backend Multer config
    formData.append("images", file);

    try {
      await axios.post(
        `/contracts/${contractId}/payments/${paymentId}/upload-proof`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  const verifyPayment = async (paymentId) => {
    // Note: Your controller doesn't strictly need a URL anymore as it just flips status
    // but keeping this to match your existing UI logic
    try {
      await axios.post(
        `/contracts/${contractId}/payments/${paymentId}/verify`
      );

      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  const isOverdue = (payment) => {
    if (!payment.dueDate) return false;
    return new Date() > new Date(payment.dueDate);
  };

  return (
    <div className="space-y-4">
      {isPaymentFrozen && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-xl text-sm mb-4">
          ⚠ Payments are temporarily frozen due to an active dispute.
        </div>
      )}
      {payments.map((p) => (
        <div
          key={p._id}
          className="border rounded-lg p-4 flex justify-between items-center shadow-sm bg-white"
        >
          <div>
            <h4 className="font-semibold text-lg">{p.type} PAYMENT</h4>
            <p className="text-sm">Amount: ₹{p.amount}</p>
            {p.dueDate && (
              <p className="text-sm text-gray-500">
                Due: {new Date(p.dueDate).toLocaleDateString()}
              </p>
            )}
            {p.status === "PENALIZED" && (
              <p className="text-red-600 text-sm">
                Penalty: ₹{p.penalty?.appliedAmount || 0}
              </p>
            )}
            {p.status === "DUE" && isOverdue(p) && (
              <p className="text-red-600 text-sm font-semibold">Overdue</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded text-sm font-medium ${
                statusColor[p.status]
              }`}
            >
              {p.status.replace("_", " ")}
            </span>

            {(p.status === "DUE" || p.status === "PENALIZED") && (
              <label
                className={`px-4 py-1 rounded transition ${
                  isPaymentFrozen
                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                    : p.status === "PENALIZED" 
                      ? "bg-red-600 text-white cursor-pointer hover:bg-red-700" 
                      : "bg-black text-white cursor-pointer hover:bg-gray-800"
                }`}
              >
                {p.status === "PENALIZED" ? "Pay with Penalty" : "Upload Proof"}
                <input
                  type="file"
                  hidden
                  disabled={isPaymentFrozen}
                  accept="image/*"
                  onChange={(e) => uploadProof(p._id, e.target.files[0])}
                />
              </label>
            )}

            {p.status === "PENDING_VERIFICATION" && (
              <button
                disabled={isPaymentFrozen}
                onClick={() => verifyPayment(p._id)}
                className={`px-4 py-1 rounded font-medium transition ${
                  isPaymentFrozen
                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                Verify Receipt
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentSchedule;