// const DeliveryTracking = () => {
//   return (
//     <div className="bg-white border rounded-xl p-6">
//       <h2 className="font-semibold mb-4">Delivery Tracking</h2>

//       <div className="space-y-3 text-sm">
//         <div>
//           <strong>Pickup:</strong> Ramesh Kumar Farm, Village Mohana
//         </div>
//         <div>
//           <strong>Delivery:</strong> ABC Foods Warehouse, Raipur
//         </div>
//         <div>
//           <strong>Expected:</strong> Mar 25 – 30, 2025
//         </div>
//       </div>

//       <div className="mt-4 text-gray-400 text-sm">
//         Delivery will unlock after harvest completion.
//       </div>
//     </div>
//   );
// };

// export default DeliveryTracking;
const DeliveryTracking = ({ delivery }) => {
  if (!delivery) return null;

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="font-semibold mb-4">Delivery Tracking</h2>

      <div className="space-y-2 text-sm">
        <div>
          <strong>Pickup:</strong> {delivery.pickupLocation || "—"}
        </div>
        <div>
          <strong>Delivery:</strong> {delivery.deliveryLocation || "—"}
        </div>
        <div>
          <strong>Expected:</strong> {delivery.expectedWindow || "—"}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {delivery.milestones?.map((m, i) => (
          <div key={i} className="flex items-center gap-3 text-sm">
            <span
              className={`w-3 h-3 rounded-full ${
                m.done ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            {m.label}
          </div>
        ))}
      </div>

      {!delivery.milestones?.some(
        (m) => m.label === "Harvest Ready" && m.done,
      ) && (
        <div className="mt-4 text-gray-400 text-sm">
          Delivery will unlock after harvest completion.
        </div>
      )}
    </div>
  );
};

export default DeliveryTracking;
