import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../../../api/axios";

export default function DriverDelivery() {
  const { contractId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState("Waiting to start delivery");
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);

  const [debug, setDebug] = useState("=== DEBUG LOG ===\n");

  const watchIdRef = useRef(null);
  const wakeLockRef = useRef(null);

  /* ================= DEBUG HELPERS ================= */
  function log(msg) {
    setDebug((prev) => prev + msg + "\n");
  }

  function logObj(label, obj) {
    log(label + " → " + JSON.stringify(obj, null, 2));
  }

  /* ================= START LIVE TRACKING ================= */
  async function startTracking() {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      log("ERROR → Geolocation not supported");
      return;
    }

    if (!token) {
      log("ERROR → Tracking token missing in URL");
      return;
    }

    setStarted(true);
    setStatus("Starting live tracking…");
    log("START TRACKING CLICKED");

    /* 🔒 Keep screen awake (important for OnePlus & Android) */
    if ("wakeLock" in navigator) {
      try {
        wakeLockRef.current = await navigator.wakeLock.request("screen");
        log("WAKE LOCK → acquired");
      } catch (e) {
        log("WAKE LOCK → failed");
      }
    }

    /* 🔹 Initial GPS ping */
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const payload = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          token,
        };

        logObj("INITIAL GPS", payload);

        try {
          const res = await api.post(
            `/harvest-contracts/delivery/driver-location/${contractId}`,
            payload
          );
          console.log(
            "FINAL URL:",
            api.defaults.baseURL + "/harvest-contracts/..."
          );

          logObj("INITIAL API RESPONSE", {
            status: res.status,
            data: res.data,
          });
        } catch (err) {
          logObj("INITIAL API ERROR", {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
          });
        }
      },
      (err) => {
        log(`INITIAL GPS ERROR → ${err.code}: ${err.message}`);
      },
      { enableHighAccuracy: false }
    );

    /* 🔹 Continuous tracking */
    watchIdRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        setStatus("Sharing live location…");

        const payload = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          token,
        };

        logObj("WATCH GPS", payload);

        try {
          const res = await api.post(
            `/harvest-contracts/delivery/driver-location/${contractId}`,
            payload
          );

          logObj("WATCH API RESPONSE", {
            status: res.status,
            data: res.data,
          });
        } catch (err) {
          logObj("WATCH API ERROR", {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
          });
        }
      },
      (err) => {
        log(`WATCH GPS ERROR → ${err.code}: ${err.message}`);
        setStatus("Location error: " + err.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 5000,
        timeout: 10000,
      }
    );
  }

  /* ================= CLEANUP ================= */
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        log("CLEANUP → watch cleared");
      }
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        log("CLEANUP → wake lock released");
      }
    };
  }, []);

  /* ================= OTP VERIFY ================= */
  async function submitOtp() {
    try {
      setVerifying(true);
      logObj("OTP SUBMIT", { otp, token });

      const res = await api.post(
        `/harvest-contracts/delivery/verify-otp/${contractId}`,
        { otp, token }
      );

      logObj("OTP RESPONSE", {
        status: res.status,
        data: res.data,
      });

      alert("Delivery completed successfully");
    } catch (err) {
      logObj("OTP ERROR", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      alert("Invalid OTP");
    } finally {
      setVerifying(false);
    }
  }

  /* ================= RENDER ================= */
  if (!token) {
    return (
      <div className="p-6 text-center text-red-600">
        Invalid or missing tracking token
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBFAF7]">
      <div className="bg-white p-6 rounded-xl border w-full max-w-sm space-y-4">
        <h2 className="text-lg font-semibold text-center">Delivery Tracking</h2>

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

        {/* OTP INPUT */}
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

        {/* DEBUG PANEL (TEMPORARY) */}
        <pre className="text-xs bg-black text-green-400 p-2 mt-3 max-h-64 overflow-auto">
          {debug}
        </pre>

        <p className="text-xs text-gray-400 text-center">
          Keep this page open and screen ON until delivery is completed
        </p>
      </div>
    </div>
  );
}
