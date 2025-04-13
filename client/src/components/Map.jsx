import { MapContainer, TileLayer } from "react-leaflet";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";

function Map() {
    const mapRef = useRef(null);
    const latitude = 51.505;
    const longitude = -0.09;
  
    return ( 
        <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef} className="rounded-t-3xl z-10 h-2/3 w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
    );
  };
  
  export default Map;