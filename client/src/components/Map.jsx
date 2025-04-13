import { useRef, useContext } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AppContext } from "../context/context"
import ChevronDown from "../assets/icons/ChevronDown";

function Map() {
  
    const mapRef = useRef(null);
    const latitude = 51.505;
    const longitude = -0.09;
    const { tripRequested, setTripRequested } = useContext(AppContext);

    const navigateBack = () => {
      setTripRequested(false)
    }
  
    return ( 
      <div className={`relative ${tripRequested ? "h-1/4" : "h-2/3"}`}>
          {tripRequested && (
            <button className="m-4 flex items-center justify-center absolute z-20 h-10 w-10 rounded-full bg-white shadow-lg shadow-zinc-400 hover:cursor-pointer" onClick={navigateBack}>
              <ChevronDown size={24} style={"rotate-90"} />
            </button>
          )}
        <MapContainer center={[latitude, longitude]} zoom={13} zoomControl={false} ref={mapRef} className={` absolute text-xs rounded-t-3xl z-10 w-full h-full`}>
          <TileLayer
            //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
          />
          <ZoomControl position="bottomright" />
        </MapContainer></div>
    );
  };
  
  export default Map;