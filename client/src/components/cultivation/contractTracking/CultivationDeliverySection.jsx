import { useState } from "react";
import axios from "../../../api/axios";
import LiveDeliveryMap from "../../../pages/buyer/LiveDeliveryMap";

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
    <div className="bg-white border rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold">Delivery Section</h3>

      <p className="text-sm">
        Delivery Status:{" "}
        <span className="font-semibold">{delivery.status || "PENDING"}</span>
      </p>

      {canDispatch && (
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded"
        >
          Add Vehicle & Dispatch
        </button>
      )}

      {/* DRIVER TRACKING LINK */}
      {delivery.trackingToken && (
        <div className="bg-blue-50 p-3 rounded text-sm">
          <p className="font-medium">Driver Tracking Link</p>
          <p className="break-all text-blue-700">
            {`${window.location.origin}/delivery/cultivation/${contract._id}?token=${delivery.trackingToken}`}
          </p>
        </div>
      )}

      {/* FARMER OTP DISPLAY */}
      {role === "FARMER" &&
        delivery.status === "IN_TRANSIT" &&
        delivery.deliveryOtp && (
          <div className="bg-yellow-50 border p-3 rounded">
            <p className="text-sm font-medium">Share this OTP with Driver</p>
            <p className="text-xl font-bold tracking-widest">
              {delivery.deliveryOtp}
            </p>
          </div>
        )}

      {/* LIVE MAP */}
      {delivery.status === "IN_TRANSIT" && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Live Delivery Tracking</h4>
          <LiveDeliveryMap
            lat={delivery?.liveLocation?.lat}
            lng={delivery?.liveLocation?.lng}
          />
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h3 className="font-semibold">Dispatch Vehicle</h3>

            <input
              placeholder="Vehicle Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              placeholder="Driver Contact"
              value={driverContact}
              onChange={(e) => setDriverContact(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                onClick={handleDispatch}
                className="bg-emerald-600 text-white px-4 py-2 rounded"
              >
                Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CultivationDeliverySection;
