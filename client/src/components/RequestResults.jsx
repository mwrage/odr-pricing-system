import { useState, useContext, useEffect  } from "react"
import { AppContext } from "../context/context"
import TripOptionCard from "./TripOptionCard"
import PassengerButton from "./PassengerButton";
import ConfirmButton from "./ConfirmButton";
import CalendarDays from "../assets/icons/CalendarDays";
import ChevronDown from "../assets/icons/ChevronDown";
import Legend from "./Legend";
import LegendButton from "./LegendButton";
import PassengerSettings from "./PassengersSettings";
import DateInput from "./DateInput";
import InvalidRequestCard from "./InvalidRequestCard";
import PriceStructureModal from "./PriceStructureModal";

function RequestResults() {

    const [expanded, setExpanded] = useState(false)
    const [dateSettings, setDateSettings] = useState(false)
    const [selectedOption, setSelectedOption] = useState(0);
    const { requestResponse, tripTimeLabels, isPreebooked, isValidRequest, setIsValidRequest, isOpen, setTripRequested, setBooked } = useContext(AppContext);
    const [showLegend, setShowLegend] = useState(false)
    const [passengerSettings, setPassengerSettings] = useState(false)
    const expandList = () => {
        setExpanded(!expanded)
      }
    const togglePassengerSettings = () => {
        setPassengerSettings(!passengerSettings)
    }

    const toggleDateSettings = () => {
        setDateSettings(!dateSettings)
    }

    const simulateBooking = () => {
        setBooked(true)
        setTripRequested(false)
        const timer = setTimeout(() => {
            setBooked(false);
        },2000);
    }

    useEffect(() => {
        const isValid = requestResponse[0]?.some(option => option.route.status === 200);
        setIsValidRequest(isValid);
      }, [requestResponse]);

    return (
        <>  {isOpen && (<PriceStructureModal/>)}
            <div className={`z-20 flex flex-col w-full bg-gray-50 self-end px-4 rounded-t-md ${expanded ? "h-3/4" : (passengerSettings || dateSettings) ? "h-1/4" :  "h-1/2" }`} style={{ boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.1)' }}>
                <button onClick={expandList} className="w-full pt-2 pb-3 hover:cursor-pointer">
                    <div className="w-1/6 h-1 bg-zinc-200 rounded-full mx-auto"></div>
                </button>
                
                <div className="overflow-y-scroll h-full no-scrollbar">
                    <h1 className="font-medium py-2">lümo</h1>
                    {requestResponse[0].map((option, index) => (
                        <div key={index}>
                        {option.route.status === 200 && (
                            <TripOptionCard index={option.id} selected={option.id === selectedOption} onClick={() => setSelectedOption(option.id)} type={"lumo"} totalWalkingDistance={option.route.total_walking_distance}
                            walk_to={option.route.walking_time_org_stop} walk_from={option.route.walking_time_dest_stop} prebooking={option.request.prebooking} departure={option.route.odr_wait_time} 
                            stop={option.route.next_stop_org_name} price={option.pricing.individual_price} discount={option.pricing.discount} regular_price={option.pricing.total_price} 
                            ticket_share={option.pricing.ticket_share} alternative_share={option.pricing.alternative_share} safety_share={option.pricing.safety_share} 
                            comfort_share={option.pricing.comfort_share}  lumoTime={option.route.odr_trip_time} busTime={option.route.bus_time} ticket_level={option.route.ticket_level}
                            weather={option.route.weather} weatherCondition={option.route.condition} temperature={option.route.temperature} requestedTime={option.request.time}
                            distance_threshold={option.pricing.distance_threshold} temp_threshold={option.pricing.temp_threshold} wait_threshold={option.pricing.wait_threshold}
                            walk_to_dist={option.route.walking_dist_org_stop} walk_from_dist={option.route.walking_dist_dest_stop} />
                         )}
                        {option.route.status === 400 && (
                            <InvalidRequestCard />
                         )}
                        </div>
                    ))}     
              </div>
            </div>

            <div className={`w-full ${(passengerSettings || dateSettings) ? "h-full" : "h-40"} bg-white z-100 rounded-b-xl bottom-0 p-2 shadow-[0_-3px_9px_rgba(0,0,0,0.4)]`}>
                {!showLegend && !passengerSettings && !dateSettings && (
                    <div className="h-28">
                        <div className="w-full flex justify-between">
                            <button className="flex items-center justify-self-end border-1 border-zinc-400 px-3 py-1.5 rounded-full hover:cursor-pointer" onClick={() => setShowLegend(true)}>
                                <LegendButton />                        
                            </button>
                            <button className="flex items-center justify-self-end border-1 border-zinc-300 text-zinc-400 px-3 py-1.5 rounded-full" >
                                {/** onClick={togglePassengerSettings}*/ }
                                <PassengerButton btnStyle={false}/>
                            </button>
                        </div>
                        <div className="flex">
                            <button className="w-full" onClick={simulateBooking}>
                            {isValidRequest ? (
                            <>
                                { isPreebooked ? <ConfirmButton label={"Eine Fahrt reservieren"} sublabel={tripTimeLabels} /> : <ConfirmButton label={"Diese Fahrt buchen"} /> }
                            </>
                            ) : (
                            <>
                                <button disabled className="w-full bg-zinc-400 py-2 text-center rounded-xl my-2 hover:cursor-pointer">
                                    <p className="text-white inter-500">{isPreebooked ? "Eine Fahrt reservieren" : "Diese Fahrt buchen"}</p>
                                </button>
                            </>
                            )

                            }
                                
                            </button> 
                            {/* <button className="w-1/5 my-2 ml-2 flex items-center justify-center bg-gray-200 rounded-xl" onClick={toggleDateSettings}>
                                <CalendarDays size={20} />
                            </button>                    */}
                        </div>                    
                    </div>
                )}
                {showLegend && !passengerSettings && !dateSettings && (
                    <div className="h-28">
                        <div className="w-full flex items-center justify-between">
                            <button onClick={() => setShowLegend(false)} className="hover:cursor-pointer w-1/3 py-2 pr-2">
                                <ChevronDown size={20} style={"rotate-90"} />
                            </button>
                            <h1 className="text-lg font-semibold w-[70%]">Preisfaktoren</h1>
                        </div> 
                        <div className="w-full h-0.5 bg-zinc-100 rounded-full mt-1.5 mb-4"></div>
                        <Legend />                   
                    </div>

                )}

                {/* Passenger settings view */}
                {passengerSettings && !dateSettings && (
                    <PassengerSettings createNewRequest={true} togglePassengerSettings={togglePassengerSettings} />                        
                )}

                {/* Date and time settings view */}
                {!showLegend && !passengerSettings && dateSettings && (
                    <>
                    {/* Header */}
                    <div className="w-full flex items-center justify-between pt-4 pb-2">
                        <button onClick={toggleDateSettings} className="hover:cursor-pointer w-1/4 py-2 pr-2">
                        <ChevronDown size={20} style={"rotate-90"} />
                        </button>
                        <h1 className="text-lg font-semibold w-[70%]">Eine Fahrt buchen</h1>
                    </div>
                    <div></div>
                    {/* Route inputs */}
                    <div className="w-full h-0.5 bg-zinc-100 rounded-full my-1"></div>
                    <DateInput />
                    <button className="w-full" onClick={toggleDateSettings}>
                        <ConfirmButton label={"Planen"} createNewRequest={true}/>
                    </button>
                    </>
                )}


            </div>
        </>
    )
}

export default RequestResults