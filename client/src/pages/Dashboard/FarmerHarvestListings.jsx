import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/topNav";
import api from "../../api/axios";
import { format } from "date-fns";

/* =========================
   EDIT MODAL
========================= */
function EditListingModal({ listing, onClose, onSave }) {
  const [form, setForm] = useState({
    quantityAvailable: listing.harvest.quantityAvailable,
    minPrice: listing.expectedPrice.minPricePerUnit,
    maxPrice: listing.expectedPrice.maxPricePerUnit,
    district: listing.delivery?.pickupLocation?.district || "",
    state: listing.delivery?.pickupLocation?.state || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4">Edit Listing</h2>

        <div className="grid gap-4">
          <input
            name="quantityAvailable"
            value={form.quantityAvailable}
            onChange={handleChange}
            placeholder="Quantity"
            className="border p-2 rounded-lg"
          />

          <input
            name="minPrice"
            value={form.minPrice}
            onChange={handleChange}
            placeholder="Min Price"
            className="border p-2 rounded-lg"
          />

          <input
            name="maxPrice"
            value={form.maxPrice}
            onChange={handleChange}
            placeholder="Max Price"
            className="border p-2 rounded-lg"
          />

          <input
            name="district"
            value={form.district}
            onChange={handleChange}
            placeholder="District"
            className="border p-2 rounded-lg"
          />

          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            className="border p-2 rounded-lg"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-green-600 text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   LISTING CARD
========================= */
function ListingCard({ listing, onDelete, onEdit }) {
  const createdOn = listing.createdAt
    ? format(new Date(listing.createdAt), "dd MMM yyyy")
    : "—";

  return (
    <div className="bg-white rounded-2xl border border-[#E1E6D8] p-6 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between gap-4">
        {/* LEFT */}
        <div>
          <h3 className="text-lg font-semibold text-[#1F2933]">
            {listing.harvest.cropName}
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            Qty: {listing.harvest.quantityAvailable} {listing.harvest.unit}
          </p>

          <p className="text-sm mt-2 text-gray-700">
            ₹{listing.expectedPrice.minPricePerUnit} - ₹
            {listing.expectedPrice.maxPricePerUnit} / {listing.harvest.unit}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            {listing.delivery?.pickupLocation?.district},{" "}
            {listing.delivery?.pickupLocation?.state}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            Offers: {listing.pendingContracts?.length || 0}
          </p>
        </div>

        {/* RIGHT */}
        <div className="text-right flex flex-col justify-between">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
              ${
                listing.status === "OPEN"
                  ? "bg-green-100 text-green-700"
                  : listing.status === "CONTRACT_SENT"
                    ? "bg-yellow-100 text-yellow-700"
                    : listing.status === "SOLD"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-200 text-gray-700"
              }`}
          >
            {listing.status}
          </span>

          <p className="text-xs text-gray-400 mt-3">{createdOn}</p>

          <div className="flex gap-3 mt-4 justify-end">
            <button
              onClick={() => onEdit(listing)}
              className="text-blue-600 text-sm font-semibold hover:underline"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(listing._id)}
              className="text-red-600 text-sm font-semibold hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* IMAGE */}
      {listing.qualityDetails?.images?.length > 0 && (
        <img
          src={listing.qualityDetails.images[0]}
          alt="crop"
          className="mt-4 h-32 w-full object-cover rounded-lg"
        />
      )}
    </div>
  );
}

/* =========================
   MAIN PAGE
========================= */
export default function FarmerHarvestListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingListing, setEditingListing] = useState(null);

  const fetchListings = () => {
    api
      .get("/harvest-listings/farmer/my-listings")
      .then((res) => {
        setListings(res.data.listings || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchListings();
  }, []);

  /* DELETE */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this listing?")) return;

    try {
      await api.delete(`/harvest-listings/${id}`);
      setListings((prev) => prev.filter((l) => l._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  /* OPEN MODAL */
  const handleEdit = (listing) => {
    setEditingListing(listing);
  };

  /* SAVE EDIT */
  const handleSaveEdit = async (form) => {
    try {
      await api.put(`/harvest-listings/${editingListing._id}`, {
        "harvest.quantityAvailable": Number(form.quantityAvailable),
        "expectedPrice.minPricePerUnit": Number(form.minPrice),
        "expectedPrice.maxPricePerUnit": Number(form.maxPrice),
        "delivery.pickupLocation.district": form.district,
        "delivery.pickupLocation.state": form.state,
      });

      setEditingListing(null);
      fetchListings();
    } catch {
      alert("Update failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7F2]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <Topbar />

        <section className="px-10 py-6">
          <h1 className="text-2xl font-semibold text-[#25341F]">
            My Harvest Listings
          </h1>

          <p className="text-sm text-[#7A8A6D] mt-1">
            Track your crop listings and buyer activity
          </p>

          <div className="mt-6">
            {loading ? (
              <p>Loading listings...</p>
            ) : listings.length === 0 ? (
              <p className="text-gray-500">No listings created yet.</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {listings.map((listing) => (
                  <ListingCard
                    key={listing._id}
                    listing={listing}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* EDIT MODAL */}
      {editingListing && (
        <EditListingModal
          listing={editingListing}
          onClose={() => setEditingListing(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* ANIMATION */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease;
          }
        `}
      </style>
    </div>
  );
}
