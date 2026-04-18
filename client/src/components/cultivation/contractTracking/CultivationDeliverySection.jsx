// import { useState } from "react";
// import axios from "../../../api/axios";
// import LiveDeliveryMap from "../../../pages/buyer/LiveDeliveryMap";

// const CultivationDeliverySection = ({ contract, role, refresh }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [driverContact, setDriverContact] = useState("");

//   const delivery = contract?.deliveryExecution || {};

//   const canDispatch =
//     role === "BUYER" &&
//     contract.status === "HARVEST_COMPLETED" &&
//     delivery.status === "PENDING";

//   const handleDispatch = async () => {
//     await axios.post(
//       `/cultivation-contracts/delivery/dispatch/${contract._id}`,
//       { vehicleNumber, driverContact },
//     );

//     setShowModal(false);
//     refresh();
//   };

//   if (contract.status !== "HARVEST_COMPLETED") return null;

//   return (
//     <div className="bg-white border rounded-xl p-6 space-y-4">
//       <h3 className="text-lg font-semibold">Delivery Section</h3>

//       <p className="text-sm">
//         Delivery Status:{" "}
//         <span className="font-semibold">{delivery.status || "PENDING"}</span>
//       </p>

//       {canDispatch && (
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-emerald-600 text-white px-4 py-2 rounded"
//         >
//           Add Vehicle & Dispatch
//         </button>
//       )}

//       {/* DRIVER TRACKING LINK */}
//       {delivery.trackingToken && (
//         <div className="bg-blue-50 p-3 rounded text-sm">
//           <p className="font-medium">Driver Tracking Link</p>
//           <p className="break-all text-blue-700">
//             {`${window.location.origin}/delivery/cultivation/${contract._id}?token=${delivery.trackingToken}`}
//           </p>
//         </div>
//       )}

//       {/* FARMER OTP DISPLAY */}
//       {role === "FARMER" &&
//         delivery.status === "IN_TRANSIT" &&
//         delivery.deliveryOtp && (
//           <div className="bg-yellow-50 border p-3 rounded">
//             <p className="text-sm font-medium">Share this OTP with Driver</p>
//             <p className="text-xl font-bold tracking-widest">
//               {delivery.deliveryOtp}
//             </p>
//           </div>
//         )}

//       {/* LIVE MAP */}
//       {delivery.status === "IN_TRANSIT" && (
//         <div className="mt-4">
//           <h4 className="font-semibold mb-2">Live Delivery Tracking</h4>
//           <LiveDeliveryMap
//             lat={delivery?.liveLocation?.lat}
//             lng={delivery?.liveLocation?.lng}
//           />
//         </div>
//       )}

//       {showModal && (
//         <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
//             <h3 className="font-semibold">Dispatch Vehicle</h3>

//             <input
//               placeholder="Vehicle Number"
//               value={vehicleNumber}
//               onChange={(e) => setVehicleNumber(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//             />

//             <input
//               placeholder="Driver Contact"
//               value={driverContact}
//               onChange={(e) => setDriverContact(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//             />

//             <div className="flex justify-end gap-3">
//               <button onClick={() => setShowModal(false)}>Cancel</button>
//               <button
//                 onClick={handleDispatch}
//                 className="bg-emerald-600 text-white px-4 py-2 rounded"
//               >
//                 Dispatch
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CultivationDeliverySection;
import React, { useState } from "react";
import axios from "../../../api/axios";
import LiveDeliveryMap from "../../../pages/buyer/LiveDeliveryMap";
import { 
  Truck, 
  MapPin, 
  Phone, 
  Hash, 
  ShieldCheck, 
  ExternalLink, 
  Clock,
  Navigation
} from "lucide-react";

const CultivationDeliverySection = ({ contract, role, refresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [driverContact, setDriverContact] = useState("");

  const delivery = contract?.deliveryExecution || {};

  const canDispatch =
    role === "BUYER" &&
    contract.status === "HARVEST_COMPLETED" &&
    delivery.status === "PENDING";

  const handleDispatch = async () => {
    await axios.post(
      `/cultivation-contracts/delivery/dispatch/${contract._id}`,
      { vehicleNumber, driverContact },
    );

    setShowModal(false);
    refresh();
  };

  if (contract.status !== "HARVEST_COMPLETED") return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
            <Truck size={16} className="text-emerald-600" /> Fulfillment & Logistics
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-wider">Post-harvest transport tracking</p>
        </div>
        
        <div className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${
          delivery.status === 'IN_TRANSIT' ? 'bg-blue-50 text-blue-700 border-blue-200' :
          delivery.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
          'bg-slate-50 text-slate-500 border-slate-200'
        }`}>
          {delivery.status || "PENDING"}
        </div>
      </div>

      <div className="space-y-6">
        {/* ACTION BUTTON & STATUS */}
        {canDispatch && (
          <div className="bg-slate-50 rounded-2xl p-6 border border-dashed border-slate-300 flex flex-col items-center text-center">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                <Navigation size={20} className="text-slate-400"/>
             </div>
             <p className="text-xs font-bold text-slate-600 uppercase tracking-tight mb-4">Harvest is verified. Ready for logistics dispatch.</p>
             <button
                onClick={() => setShowModal(true)}
                className="w-full md:w-auto bg-[#0f172a] text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200 active:scale-[0.98]"
              >
                Initiate Dispatch Protocol
              </button>
          </div>
        )}

        {/* DRIVER TRACKING LINK */}
        {delivery.trackingToken && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
               <div className="p-2 bg-white rounded-lg border border-blue-100 text-blue-600">
                  <ExternalLink size={16}/>
               </div>
               <div>
                  <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest">Driver Tracking Access</p>
                  <p className="text-[10px] font-bold text-blue-600 opacity-80 break-all select-all">
                    {`${window.location.origin}/delivery/cultivation/${contract._id}?token=${delivery.trackingToken}`}
                  </p>
               </div>
            </div>
            <span className="text-[9px] font-black text-blue-500 uppercase px-2 py-1 bg-white rounded-md border border-blue-100">Live Link</span>
          </div>
        )}

        {/* FARMER OTP DISPLAY */}
        {role === "FARMER" &&
          delivery.status === "IN_TRANSIT" &&
          delivery.deliveryOtp && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center shadow-sm">
              <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest mb-3">Counterparty Verification OTP</p>
              <div className="bg-white py-4 rounded-xl border border-amber-200 shadow-inner">
                <p className="text-4xl font-black text-slate-900 tracking-[0.4em] translate-x-1">
                  {delivery.deliveryOtp}
                </p>
              </div>
              <p className="text-[9px] font-bold text-amber-600 uppercase mt-3 tracking-wider">Provide this to the driver upon loading</p>
            </div>
          )}

        {/* LIVE MAP */}
        {delivery.status === "IN_TRANSIT" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
               <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={14} className="text-emerald-600"/> Current Transit Coordinates
               </h4>
               <span className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Clock size={10}/> Real-time Polling
               </span>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 h-[350px] shadow-inner bg-slate-50">
              <LiveDeliveryMap
                lat={delivery?.liveLocation?.lat}
                lng={delivery?.liveLocation?.lng}
              />
            </div>
          </div>
        )}
      </div>

      {/* DISPATCH MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl animate-in zoom-in duration-150">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Truck size={20}/>
               </div>
               <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight uppercase">Logistics Setup</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Post-harvest Fulfillment</p>
               </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14}/>
                <input
                  placeholder="REGISTRATION NUMBER"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs font-black uppercase text-slate-800 outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14}/>
                <input
                  placeholder="DRIVER CONTACT NO."
                  value={driverContact}
                  onChange={(e) => setDriverContact(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs font-black uppercase text-slate-800 outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button 
                className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors"
                onClick={() => setShowModal(false)}
              >
                Discard
              </button>
              <button
                onClick={handleDispatch}
                className="flex-1 bg-emerald-600 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-700 active:scale-[0.98] transition-all"
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CultivationDeliverySection;