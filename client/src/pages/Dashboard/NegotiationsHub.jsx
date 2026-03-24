import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import NegotiationChat from "../../components/NegotiationChat";

export default function NegotiationsHub({ userRole }) {
  const location = useLocation();
  const initialSelectedId = location.state?.selectedNegotiationId;
  const [negotiations, setNegotiations] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchNegotiations();
  }, []);

  const fetchNegotiations = async () => {
    const res = await axios.get("/negotiation/my");
    setNegotiations(res.data.negotiations);
  };

  useEffect(() => {
    if (initialSelectedId && negotiations.length > 0) {
      const found = negotiations.find((n) => n._id === initialSelectedId);
      if (found) setSelected(found);
    }
  }, [negotiations]);
  return (
    <div className="h-screen flex bg-gray-50">
      {/* LEFT LIST */}
      <div className="w-1/3 border-r bg-white overflow-y-auto">
        <h2 className="p-4 font-semibold text-lg border-b">Negotiations</h2>

        {negotiations.map((n) => (
          <div
            key={n._id}
            onClick={() => setSelected(n)}
            className={`p-4 cursor-pointer hover:bg-gray-100 ${
              selected?._id === n._id ? "bg-gray-100" : ""
            }`}
          >
            <p className="font-medium">{n.contractId.cropDetails?.cropName}</p>
            <p className="text-xs text-gray-500">
              {n.contractId.pricing?.agreedPricePerUnit} / unit
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT CHAT */}
      <div className="flex-1">
        {selected ? (
          <NegotiationChat negotiationId={selected._id} userRole={userRole} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a negotiation
          </div>
        )}
      </div>
    </div>
  );
}
