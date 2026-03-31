import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function HarvestContractCreate() {
  const { listingId } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const [pricePerUnit, setPricePerUnit] = useState("");
  const [paymentMode, setPaymentMode] = useState("BEFORE_DELIVERY");

  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [transportByBuyer, setTransportByBuyer] = useState(true);

  const [confirmRead, setConfirmRead] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* ================= FETCH HARVEST LISTING ================= */
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/harvest-listings/${listingId}`);
        setListing(res.data.listing);
        console.log("Listing API response:", res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  /* ================= SUBMIT CONTRACT ================= */
  // const handleSubmit = async () => {
  //   if (!confirmRead) {
  //     alert("Please confirm that you have read the crop details");
  //     return;
  //   }

  //   try {
  //     setSubmitting(true);

  //     await api.post("/harvest-contracts/create", {
  //       harvestListingId: listingId,

  //       buyerLocation:
  //         listing?.farmer?.address || "Buyer location not specified",

  //       payment: {
  //         pricePerUnit: Number(pricePerUnit),
  //         mode: paymentMode, // ✅ correct key
  //       },

  //       delivery: {
  //         expectedDeliveryDate: deliveryDate,
  //         deliveryLocation: deliveryLocation.trim(),
  //         transportationByBuyer: transportByBuyer,
  //       },

  //       buyerConfirmation: true,
  //     });

  //     alert("Harvest contract sent to farmer");
  //     navigate("/buyer/contracts");
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Failed to send contract");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };
  const handleSubmit = async () => {
    if (!confirmRead) {
      alert("Please confirm that you have read the crop details");
      return;
    }

    const price = Number(pricePerUnit);
    const min = expectedPrice?.minPricePerUnit;
    const max = expectedPrice?.maxPricePerUnit;

    if (!price || price <= 0) {
      alert("Please enter a valid price");
      return;
    }

    if (price < min) {
      alert(`Price must be at least ₹${min}`);
      return;
    }

    if (max && price > max) {
      alert(`Price cannot exceed ₹${max}`);
      return;
    }

    if (!deliveryDate) {
      alert("Please select delivery date");
      return;
    }

    const selectedDate = new Date(deliveryDate);
    if (selectedDate < new Date()) {
      alert("Delivery date cannot be in the past");
      return;
    }

    if (!deliveryLocation.trim()) {
      alert("Delivery location is required");
      return;
    }

    if (deliveryLocation.trim().length < 5) {
      alert("Enter a proper delivery location");
      return;
    }

    if (!["BEFORE_DELIVERY", "ON_DELIVERY"].includes(paymentMode)) {
      alert("Invalid payment mode");
      return;
    }

    try {
      setSubmitting(true);

      await api.post("/harvest-contracts/create", {
        harvestListingId: listingId,
        buyerLocation:
          listing?.farmer?.address || "Buyer location not specified",
        payment: {
          pricePerUnit: price,
          mode: paymentMode,
        },
        delivery: {
          expectedDeliveryDate: deliveryDate,
          deliveryLocation: deliveryLocation.trim(),
          transportationByBuyer: transportByBuyer,
        },
        buyerConfirmation: true,
      });

      alert("Harvest contract sent to farmer");
      navigate("/buyer/contracts");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send contract");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!listing) {
    return (
      <div className="p-6 text-red-600">
        Listing not found. Check if the listing is already under contract.
      </div>
    );
  }

  const { harvest, farmer, expectedPrice } = listing;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* ================= HARVEST DETAILS ================= */}
      <div className="rounded-xl border bg-white p-6">
        <h2 className="text-lg font-semibold mb-4">Harvest Crop Details</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <b>Crop:</b> {harvest.cropName}
          </div>
          <div>
            <b>Variety:</b> {harvest.variety || "—"}
          </div>
          <div>
            <b>Quality Grade:</b> {harvest.qualityGrade}
          </div>
          <div>
            <b>Quantity:</b> {harvest.quantityAvailable} {harvest.unit}
          </div>
          <div>
            <b>Farmer:</b> {farmer.name || "—"}
          </div>
          <div>
            <b>Farmer Address:</b> {farmer.farm?.farmLocation || "—"}
          </div>
        </div>
      </div>
      <div className="col-span-2 rounded-lg bg-green-50 border border-green-200 p-3 text-sm">
        <b>Farmer Expected Price:</b> ₹{expectedPrice?.minPricePerUnit} – ₹
        {expectedPrice?.maxPricePerUnit} per {harvest.unit}
      </div>

      {/* ================= BUYER OFFER ================= */}
      <div className="rounded-xl border bg-white p-6 space-y-4">
        <h2 className="text-lg font-semibold">Buyer Offer</h2>

        <div>
          <label className="block text-sm mb-1">Price per Unit (₹)</label>
          <input
            type="number"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Payment Mode</label>
          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="w-full rounded border px-3 py-2"
          >
            <option value="BEFORE_DELIVERY">Before Delivery </option>
            <option value="ON_DELIVERY">On Delivery</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Pickup / Delivery Date</label>
          <input
            type="datetime-local"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Delivery Location</label>
          <input
            type="text"
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={transportByBuyer}
            onChange={() => setTransportByBuyer(!transportByBuyer)}
          />
          Transportation managed by buyer
        </label>

        <label className="flex items-center gap-2 text-sm mt-4">
          <input
            type="checkbox"
            checked={confirmRead}
            onChange={() => setConfirmRead(!confirmRead)}
          />
          I have read and verified the crop details provided by the farmer
        </label>
      </div>

      {/* ================= CTA ================= */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="rounded-full bg-emerald-600 px-8 py-3 text-white font-semibold disabled:opacity-50"
        >
          Send Purchase Offer
        </button>
      </div>
    </div>
  );
}
