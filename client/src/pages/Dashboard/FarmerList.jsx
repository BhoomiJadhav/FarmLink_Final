import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BuyerSidebar from "../../components/BuyerSidebar";
import Topbar from "../../components/topNav";

const API_BASE = "http://localhost:5000/api";

/* ── tiny helpers ── */
const Badge = ({ children, color = "green" }) => {
  const colors = {
    green: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    amber: "bg-amber-50 text-amber-700 border border-amber-200",
    gray: "bg-gray-100 text-gray-600 border border-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full tracking-wide ${colors[color]}`}
    >
      {children}
    </span>
  );
};

const StatPill = ({ icon, label, value, bg }) => (
  <div className={`flex items-center gap-2.5 p-3 rounded-xl ${bg}`}>
    <span className="text-xl">{icon}</span>
    <div>
      <p className="text-[13px] font-bold text-slate-800 leading-none">
        {value}
      </p>
      <p className="text-[10px] text-gray-500 mt-0.5">{label}</p>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   HARVEST CARD
───────────────────────────────────────── */
const HarvestCard = ({ l, expanded, onToggle }) => {
  const location = l.delivery?.pickupLocation;
  const condition = l.qualityDetails.cropCondition.replaceAll("_", " ");

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-green-400" />

      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-[17px] font-bold text-slate-900 leading-tight">
              {l.harvest.cropName}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">by {l.farmer?.name}</p>
          </div>
          <Badge color="blue">{condition}</Badge>
        </div>

        {/* Images */}
        {l.qualityDetails.images?.length > 0 && (
          <div className="grid grid-cols-3 gap-1.5 mb-4 rounded-xl overflow-hidden">
            {l.qualityDetails.images.slice(0, 3).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Crop"
                className="h-20 w-full object-cover"
              />
            ))}
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <StatPill
            icon="📦"
            label="Quantity"
            value={`${l.harvest.quantityAvailable} ${l.harvest.unit}`}
            bg="bg-emerald-50"
          />
          <StatPill
            icon="📅"
            label="Harvested"
            value={`${l.harvest.harvestedMonth} ${l.harvest.harvestedYear}`}
            bg="bg-sky-50"
          />
          <StatPill
            icon="💧"
            label="Moisture"
            value={l.qualityDetails.moistureLevel.replace("_", " ")}
            bg="bg-blue-50"
          />
          <StatPill
            icon="🧹"
            label="Sorting"
            value={l.qualityDetails.sortingStatus.replace("_", " ")}
            bg="bg-violet-50"
          />
        </div>

        {/* Price banner */}
        <div className="flex items-center justify-between bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-xl px-4 py-2.5 mb-3">
          <span className="text-xs text-gray-500 font-medium">
            Expected Price
          </span>
          <span className="text-sm font-bold text-emerald-700">
            ₹{l.expectedPrice.minPricePerUnit} – ₹
            {l.expectedPrice.maxPricePerUnit}
            <span className="text-[10px] font-normal text-gray-500 ml-1">
              / Quintal
            </span>
          </span>
        </div>

        {/* Location */}
        {location && (
          <p className="text-[11px] text-gray-400 mb-3 flex items-start gap-1">
            <span>📍</span>
            <span>
              {location.addressLine}, {location.villageOrCity},{" "}
              {location.district}, {location.state} – {location.pincode}
            </span>
          </p>
        )}

        {/* Expand toggle */}
        <button
          onClick={onToggle}
          className="text-[12px] text-emerald-600 font-semibold hover:text-emerald-800 transition-colors text-left mb-2"
        >
          {expanded ? "▲ Hide details" : "▼ View full details"}
        </button>

        {expanded && (
          <div className="text-[12px] text-gray-600 bg-gray-50 border border-gray-100 rounded-xl p-3 mb-3 space-y-1">
            <p>
              📜 Declaration Accepted:{" "}
              <span className="font-semibold">
                {l.declarationAccepted ? "Yes" : "No"}
              </span>
            </p>
            <p>
              Status:{" "}
              <span className="font-semibold capitalize">{l.status}</span>
            </p>
          </div>
        )}

        {/* Spacer + CTA */}
        <div className="mt-auto pt-2">
          <Link
            to={`/buyer/harvest-contract/${l._id}`}
            className="flex items-center justify-center gap-2 w-full bg-[#1a3c2e] hover:bg-[#14301f] text-white text-[13px] font-semibold py-2.5 rounded-xl transition-colors"
          >
            Initiate Purchase Contract
            <span className="text-base">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   FARMER CARD
───────────────────────────────────────── */
const FarmerCard = ({ f, onView }) => (
  <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
    {/* Accent bar */}
    <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-teal-400" />

    <div className="p-5 flex flex-col flex-1">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {(f.personal?.fullName || "F")[0]}
          </div>
          <div>
            <h3 className="font-bold text-[15px] text-slate-900 leading-tight">
              {f.personal?.fullName}
            </h3>
            <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
              <span>📍</span>
              {f.farm?.farmLocation}
            </p>
          </div>
        </div>
        <Badge color="green">● Available</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-2.5 text-center">
          <p className="text-base font-bold text-amber-600">
            {f.rating?.toFixed(1) || "0.0"} ⭐
          </p>
          <p className="text-[10px] text-gray-500">
            {f.reviewsCount || 0} reviews
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 text-center">
          <p className="text-base font-bold text-emerald-700">
            {f.trustScore || 0}
            <span className="text-[10px] font-normal text-gray-400">/100</span>
          </p>
          <p className="text-[10px] text-gray-500">⚡ Trust Score</p>
        </div>
      </div>

      {/* Farm info */}
      <div className="grid grid-cols-2 gap-2 text-[12px] text-gray-600 mb-4">
        <div className="bg-gray-50 rounded-lg px-3 py-2">
          <span className="text-gray-400 block text-[10px] mb-0.5">Land</span>
          <span className="font-semibold text-slate-700">
            🌾 {f.farm?.farmSize || "--"} Acres
          </span>
        </div>
        <div className="bg-gray-50 rounded-lg px-3 py-2">
          <span className="text-gray-400 block text-[10px] mb-0.5">
            Irrigation
          </span>
          <span className="font-semibold text-slate-700">
            💧 {f.farm?.irrigation || "--"}
          </span>
        </div>
      </div>

      {/* Crop tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {(f.farm?.cropTypes || []).slice(0, 4).map((crop, idx) => (
          <span
            key={idx}
            className="text-[11px] bg-gray-100 text-gray-600 border border-gray-200 px-2.5 py-0.5 rounded-full font-medium"
          >
            {crop}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-auto flex gap-2">
        <Link
          to={`/buyer/cultivation-contract/${f.userId._id}`}
          className="flex-1 text-center border border-[#1a3c2e] text-[#1a3c2e] hover:bg-[#1a3c2e] hover:text-white text-[12px] font-semibold py-2 rounded-xl transition-colors"
        >
          Create Contract
        </Link>
        <button
          onClick={() => onView(f)}
          className="flex-1 bg-[#1a3c2e] hover:bg-[#14301f] text-white text-[12px] font-semibold py-2 rounded-xl transition-colors"
        >
          View Profile
        </button>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   FARMER PROFILE MODAL
───────────────────────────────────────── */
const FarmerModal = ({ farmer, onClose }) => (
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
      {/* Modal header with gradient */}
      <div className="bg-gradient-to-br from-[#1a3c2e] to-[#2d6a4f] px-6 py-5 text-white">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-white font-bold text-lg">
              {(farmer.personal?.fullName || "F")[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold">{farmer.personal?.fullName}</h2>
              <p className="text-emerald-200 text-xs mt-0.5">
                📍 {farmer.farm?.farmLocation || "Location not available"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            {
              icon: "⭐",
              label: `${farmer.reviewsCount || 0} reviews`,
              value: farmer.rating?.toFixed(1) || "0.0",
            },
            {
              icon: "⚡",
              label: "Trust Score",
              value: `${farmer.trustScore || 0}/100`,
            },
            {
              icon: "📞",
              label: "Contact",
              value: farmer.personal?.phone || "--",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur rounded-xl p-3 text-center"
            >
              <p className="text-sm font-bold">{s.value}</p>
              <p className="text-[10px] text-emerald-200 mt-0.5">
                {s.icon} {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            {
              label: "Farm Size",
              value: `${farmer.farm?.farmSize || "--"} Acres`,
              icon: "🌾",
            },
            {
              label: "Irrigation",
              value: farmer.farm?.irrigation || "--",
              icon: "💧",
            },
          ].map((d, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-100 rounded-xl p-3"
            >
              <p className="text-[10px] text-gray-400 mb-1">{d.label}</p>
              <p className="text-[13px] font-semibold text-slate-800">
                {d.icon} {d.value}
              </p>
            </div>
          ))}
          <div className="col-span-2 bg-gray-50 border border-gray-100 rounded-xl p-3">
            <p className="text-[10px] text-gray-400 mb-1">Machinery</p>
            <p className="text-[13px] font-semibold text-slate-800">
              🚜 {farmer.farm?.machinery || "--"}
            </p>
          </div>
        </div>

        {/* Crops */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Crops
          </p>
          <div className="flex flex-wrap gap-2">
            {(farmer.farm?.cropTypes || []).map((c, i) => (
              <span
                key={i}
                className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 text-xs rounded-full font-medium"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() =>
              (window.location.href = `/buyer/cultivation-contract/${farmer.userId._id}`)
            }
            className="flex-1 bg-[#1a3c2e] hover:bg-[#14301f] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            Create Contract
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────── */
const SectionHeader = ({ title, subtitle, count, countLabel }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
    <div>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
    </div>
    {count !== undefined && (
      <span className="self-start sm:self-auto text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full">
        {count} {countLabel}
      </span>
    )}
  </div>
);

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
const FarmerMarket = () => {
  const [harvestListings, setHarvestListings] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchHarvestListings = async () => {
      const res = await fetch(`${API_BASE}/harvest-listings/market`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setHarvestListings(data.listings || []);
    };

    const fetchFarmers = async () => {
      const res = await fetch(`${API_BASE}/farmer/farmers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFarmers(Array.isArray(data) ? data : []);
    };

    Promise.all([fetchHarvestListings(), fetchFarmers()])
      .catch(() => setError("Failed to load market data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex h-screen bg-[#faf8f4]">
        <BuyerSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-500">Loading market data…</p>
            </div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen bg-[#faf8f4]">
        <BuyerSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <div className="flex-1 flex items-center justify-center">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex h-screen bg-[#faf8f4]">
      <BuyerSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <div className="flex-1 overflow-y-auto">
          {/* ── Page hero strip ── */}
          <div className="bg-gradient-to-r from-[#1a3c2e] to-[#2d6a4f] px-8 py-6">
            <h1 className="text-white text-2xl font-bold">Farmer Market</h1>
            <p className="text-emerald-200 text-sm mt-1">
              Browse available harvests and connect with farmers for contracts
            </p>
          </div>

          <div className="p-6 md:p-8">
            {/* ──────── HARVEST LISTINGS ──────── */}
            <section className="mb-14">
              <SectionHeader
                title="🌾 Harvested Crops Available"
                subtitle="Fresh harvests ready for contract-based purchase"
                count={harvestListings.length}
                countLabel="Listings"
              />

              {harvestListings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400">
                  <span className="text-4xl mb-3">🌾</span>
                  <p className="text-sm">No harvested crops available.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {harvestListings.map((l) => (
                    <HarvestCard
                      key={l._id}
                      l={l}
                      expanded={expandedId === l._id}
                      onToggle={() =>
                        setExpandedId(expandedId === l._id ? null : l._id)
                      }
                    />
                  ))}
                </div>
              )}
            </section>

            {/* ──────── FARMER DIRECTORY ──────── */}
            <section>
              <SectionHeader
                title="👨‍🌾 Available Farmers"
                subtitle="Farmers currently open for pre-harvest contracts"
                count={farmers.length}
                countLabel="Farmers"
              />

              {farmers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400">
                  <span className="text-4xl mb-3">👨‍🌾</span>
                  <p className="text-sm">
                    No farmers currently available for contracts.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {farmers.map((f) => (
                    <FarmerCard key={f._id} f={f} onView={setSelectedFarmer} />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {selectedFarmer && (
        <FarmerModal
          farmer={selectedFarmer}
          onClose={() => setSelectedFarmer(null)}
        />
      )}
    </div>
  );
};

export default FarmerMarket;
