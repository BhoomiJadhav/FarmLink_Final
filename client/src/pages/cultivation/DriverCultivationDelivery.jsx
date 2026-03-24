import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../../api/axios";

export default function DriverCultivationDelivery() {
  const { contractId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState("Waiting to start delivery");
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);

  const watchIdRef = useRef(null);
  const wakeLockRef = useRef(null);

  /* ================= START LIVE TRACKING ================= */
  async function startTracking() {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }

    if (!token) {
      setStatus("Tracking token missing");
      return;
    }

    setStarted(true);
    setStatus("Starting live tracking...");

    /* 🔒 Keep screen awake */
    if ("wakeLock" in navigator) {
      try {
        wakeLockRef.current = await navigator.wakeLock.request("screen");
      } catch (err) {
        console.error("Failed to acquire wake lock:", err);
      }
    }

    /* 🔹 Continuous tracking */
    watchIdRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        setStatus("Sharing live location...");

        try {
          await api.post(
            `/cultivation-contracts/delivery/driver-location/${contractId}`,
            {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              token,
            },
          );
        } catch (err) {
          console.error("Location update failed", err);
        }
      },
      (err) => {
        setStatus("Location error: " + err.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 5000,
        timeout: 10000,
      },
    );
  }

  /* ================= OTP VERIFY ================= */
  async function submitOtp() {
    try {
      setVerifying(true);

      await api.post(
        `/cultivation-contracts/delivery/verify-otp/${contractId}`,
        { otp, token },
      );

      alert("Delivery completed successfully");
    } catch (err) {
      alert("Invalid OTP");
    } finally {
      setVerifying(false);
    }
  }

  /* ================= CLEANUP ================= */
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }

      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
      }
    };
  }, []);

  /* ================= INVALID TOKEN ================= */
  if (!token) {
    return (
      <div className="p-6 text-center text-red-600">
        Invalid or missing tracking token
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBFAF7]">
      <div className="bg-white p-6 rounded-xl border w-full max-w-sm space-y-4">
        <h2 className="text-lg font-semibold text-center">
          Cultivation Delivery Tracking
        </h2>

        {!started ? (
          <button
            onClick={startTracking}
            className="w-full bg-emerald-600 text-white py-2 rounded"
          >
            Start Delivery
          </button>
        ) : (
          <p className="text-sm text-gray-600 text-center">{status}</p>
        )}

        {/* OTP SECTION */}
        <div className="border-t pt-4 space-y-3">
          <h4 className="font-medium text-sm">Enter OTP from Farmer</h4>

          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="6-digit OTP"
            className="border rounded px-3 py-2 w-full"
          />

          <button
            onClick={submitOtp}
            disabled={verifying}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Verify OTP & Complete Delivery
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center">
          Keep this page open until delivery is completed
        </p>
      </div>
    </div>
  );
}
