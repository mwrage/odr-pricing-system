import { useRef, useContext, useState, useEffect } from "react";
import { Popover, PopoverButton, PopoverPanel, Switch } from '@headlessui/react'
import { MapContainer, TileLayer, ZoomControl, useMapEvents, Marker, Tooltip } from "react-leaflet";
import {Icon} from 'leaflet'
import "leaflet/dist/leaflet.css";
import { AppContext } from "../context/context"
import ChevronDown from "../assets/icons/ChevronDown";
import Ticket1 from "../assets/icons/Ticket1";
import { reverseGeocode } from "../utils/reverseGeocode";
import BookingConfirmation from "./BookingConfirmation";
import { useLocation } from "react-router-dom";

function Map() {
  
    const mapRef = useRef(null);
    const { tripRequested, setTripRequested, originCoords, setOriginCoords, destinationCoords, setDestinationCoords, hasTicket, setHasTicket, chooseOnMap, setChooseOnMap, setDestinationName, setOriginName, chooseStart, booked } = useContext(AppContext);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [center, setCenter] = useState(null);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const scenarioParam = query.get("scenario");

    const locationIcon = new Icon ({
      iconUrl : '/location-pin.svg',
      iconSize : [35, 35],
      iconAnchor : [20, 5],
      popupAnchor : [-3, -76]
    })

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
        setOriginCoords([latlng.lat, latlng.lng]);
      } else {
        const fetchDestinationName = async () => {
            const name = await reverseGeocode(latlng.lat, latlng.lng);
            setDestinationName(name);
          };
        fetchDestinationName();
        setDestinationCoords([latlng.lat, latlng.lng]);        
      }
      setChooseOnMap(false)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`
      );
      const data = await response.json();
      const address = data.display_name || "Adresse nicht gefunden";
      setSelectedAddress(address);
    };

    useEffect(() => {
      if (scenarioParam == 0) {
        setHasTicket(true)
      } else if (scenarioParam == 1) {
          setHasTicket(false)
      } else if (scenarioParam == 2) {
          setHasTicket(true)
      }
      const getUserLocation = () => {
        return new Promise((resolve) => {
          if (scenarioParam == 0) {
            resolve([53.84744398630202, 10.678369399799335])
          } else if (scenarioParam == 1) {
            resolve([53.860392208920615, 10.69017740460969])
          } else if (scenarioParam == 2) {
            resolve([53.868803464034976, 10.703942829848167])
          } else if (!navigator.geolocation) {
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

    useEffect(() => {
      if (chooseOnMap && mapRef.current) {
        const map = mapRef.current;
        if (map && map.setZoom) {
          if (map && map._leaflet_id) { // prüfen, ob die Map schon geladen ist
            map.flyTo(map.getCenter(), chooseOnMap ? 13 : 16, {
              animate: true,
              duration: 1.5, // Dauer in Sekunden
            });
          }
        }
      }
    }, [chooseOnMap]);

    useEffect(() => {
      const map = mapRef.current;
      if (map && map.flyTo) {
        if (originCoords) {
          map.flyTo(originCoords, 16, {
            animate: true,
            duration: 1,
          });
        }
      }
    }, [originCoords]);

    useEffect(() => {
      const map = mapRef.current;
      if (map && map.flyTo) {
        if (destinationCoords) {
          map.flyTo(destinationCoords, 16, {
            animate: true,
            duration: 1,
          });
        }
      }
    }, [destinationCoords]);
  
    return ( 
      <div className={`flex flex-col relative ${tripRequested ? "h-1/4" : "h-2/3"}`}>
          {booked && <BookingConfirmation />}
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
          <Marker id="originMarker" position={originCoords} icon={locationIcon} >
            <Tooltip direction="top" permanent>Start</Tooltip>
          </Marker>
          <ClickHandler onMapClick={handleMapClick} />
          {destinationCoords && 
          <Marker id="destinationMarker" position={destinationCoords} icon={locationIcon} >
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