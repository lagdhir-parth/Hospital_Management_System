import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Critical: Import here if not global
import L from "leaflet";
import { useEffect } from "react";

const markerIcon = new L.Icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const position = [22.3039, 70.8022]; // Rajkot coords

// Hook to trigger map resize after DOM mount
const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
};

const MapComponent = () => {
  return (
    <div className="h-80 w-full rounded-xl overflow-hidden border-4 border-(--color-border)">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }} // Inline styles required over className
      >
        <ResizeMap /> {/*Forces redraw*/}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>
            <strong>123 Healthcare Drive</strong>
            <br />
            Medical District, Rajkot
            <br />
            Gujarat, India
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
