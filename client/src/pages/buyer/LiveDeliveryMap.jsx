import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

function MoveMarker({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, map]);

  return position ? <Marker position={position} /> : null;
}

export default function LiveDeliveryMap({ lat, lng }) {
  if (!lat || !lng) {
    return (
      <div className="h-[320px] flex items-center justify-center text-sm text-gray-500">
        Waiting for driver location…
      </div>
    );
  }

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ height: "320px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MoveMarker position={[lat, lng]} />
    </MapContainer>
  );
}
