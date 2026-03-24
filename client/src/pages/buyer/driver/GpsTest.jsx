import React, { useState } from "react";

export default function GpsTest() {
  const [status, setStatus] = useState("Idle");
  const [coords, setCoords] = useState(null);

  function requestLocation() {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }

    setStatus("Requesting permission...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setStatus("Location fetched successfully");
      },
      (error) => {
        setStatus(`Error: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <button
        onClick={requestLocation}
        style={{
          padding: "12px 20px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Get My Location
      </button>

      <p style={{ marginTop: 20 }}>{status}</p>

      {coords && (
        <pre style={{ marginTop: 10 }}>{JSON.stringify(coords, null, 2)}</pre>
      )}
    </div>
  );
}
