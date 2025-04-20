import { useRef, useContext, useState, useEffect } from "react";
import { Popover, PopoverButton, PopoverPanel, Switch } from '@headlessui/react'
import { MapContainer, TileLayer, ZoomControl, useMapEvents, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AppContext } from "../context/context"
import ChevronDown from "../assets/icons/ChevronDown";
import Ticket1 from "../assets/icons/Ticket1";
import { reverseGeocode } from "../utils/reverseGeocode";

function Map() {
  
    const mapRef = useRef(null);
    const { tripRequested, setTripRequested, originCoords, setOriginCoords, destinationCoords, setDestinationCoords, hasTicket, setHasTicket, chooseOnMap, setChooseOnMap, setDestinationName, setOriginName, chooseStart, setChooseStart } = useContext(AppContext);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [center, setCenter] = useState(null);
    const [showTicketSettings, setShowTicketSettings] = useState(false)

    function ClickHandler({ onMapClick }) {
      if(chooseOnMap) {
        useMapEvents({
          click(e) {
            onMapClick(e.latlng);
          },
        });    
      }
      return null;
    }

    const navigateBack = () => {
      setTripRequested(false)
    }

    const handleMapClick = async (latlng) => {
      if (chooseStart) {
        const fetchOriginName = async () => {
          const name = await reverseGeocode(latlng.lat, latlng.lng);
          setOriginName(name);
        };
        fetchOriginName();
        setOriginCoords(latlng);
      } else {
        const fetchDestinationName = async () => {
            const name = await reverseGeocode(latlng.lat, latlng.lng);
            setDestinationName(name);
          };
        fetchDestinationName();
        setDestinationCoords(latlng);        
      }
      setChooseOnMap(false)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`
      );
      const data = await response.json();
      const address = data.display_name || "Adresse nicht gefunden";
      setSelectedAddress(address);
      console.log(address)
      console.log(hasTicket)
    };

    useEffect(() => {
      const getUserLocation = () => {
        return new Promise((resolve) => {
          if (!navigator.geolocation) {
            resolve([53.86793879579819, 10.688151930113486]);
          } else {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                resolve([pos.coords.latitude, pos.coords.longitude]);
              },
              () => {
                resolve([53.86793879579819, 10.688151930113486]);
              },
              {
                enableHighAccuracy: true,
                timeout: 5000,
              }
            );
          }
        });
      };
    
      getUserLocation().then((coords) => {
        setCenter(coords);
        setOriginCoords(coords)
      });
    }, []);
  
    return ( 
      <div className={`flex flex-col relative ${tripRequested ? "h-1/4" : "h-2/3"}`}>
          {tripRequested && (
            <button className="m-4 flex items-center justify-center absolute z-20 h-10 w-10 rounded-full bg-white shadow-lg shadow-zinc-400 hover:cursor-pointer" onClick={navigateBack}>
              <ChevronDown size={24} style={"rotate-90"} />
            </button>
          )}
          {!tripRequested  && (
            <>
            <Popover className="relative z-100 self-end">
              <PopoverButton className="flex items-center justify-center z-100 w-10 h-10 m-4 rounded-full bg-white shadow-lg shadow-zinc-400 hover:cursor-pointer">
                <Ticket1 size={22} style={"#27272a"} />
              </PopoverButton>
              <PopoverPanel anchor="bottom end" className="flex flex-col z-100 mt-1 mr-4 bg-white shadow-2xl shadow-zinc-600 p-2 rounded-md">
                <div className="flex items-center justify-center">
                  <p className="pr-2 inter-500">Ticket vorhanden</p>
                  <Switch checked={hasTicket} onClick={() => setHasTicket(!hasTicket)} className="group inline-flex h-5 w-10 items-center rounded-full bg-gray-200 transition data-[checked]:bg-zinc-800">
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                  </Switch>                  
                </div>
              </PopoverPanel>
            </Popover>
            </>
          )}
          {center && (
        <MapContainer center={center} zoom={tripRequested ? 10 : 16} zoomControl={false} ref={mapRef} className={` absolute text-xs rounded-t-3xl z-10 w-full h-full`}>
          <TileLayer
            //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
          />
          <Marker id="originMarker" position={originCoords} >
            <Tooltip direction="top" permanent>Start</Tooltip>
          </Marker>
          <ClickHandler onMapClick={handleMapClick} />
          {destinationCoords && 
          <Marker id="destinationMarker" position={destinationCoords} >
            <Tooltip direction="top" permanent>Ziel</Tooltip>  
          </Marker>
          }
          {/* <ZoomControl position="bottomright" /> */}
        </MapContainer>            
          )}

        </div>
    );
  };
  
  export default Map;