import { useState, useContext  } from "react"
import { AppContext } from "../context/context"
import TripOptionCard from "./TripOptionCard"
import PassengerButton from "./PassengerButton";
import ConfirmButton from "./ConfirmButton";
import CalendarDays from "../assets/icons/CalendarDays";
import ChevronDown from "../assets/icons/ChevronDown";
import BookingConfirmation from "./BookingConfirmation";
import Legend from "./Legend";
import LegendButton from "./LegendButton";

function RequestResults() {

    const [expanded, setExpanded] = useState(false)
    const [selectedOption, setSelectedOption] = useState(0);
    const [booked, setBooked] = useState(false)
    const { requestResponse } = useContext(AppContext);
    const [showLegend, setShowLegend] = useState(false)
    const expandList = () => {
        setExpanded(!expanded)
      }
    const togglePassengerSettings = () => {
        console.log("test")
    }
    const simulateBooking = () => {
        setBooked(true)
        console.log("Test JSON data:")
        console.log(requestResponse)
        const timer = setTimeout(() => {
            setBooked(false);
        },2000);

    }

    const prebooking = true

    return (
        <>  
            {booked && <BookingConfirmation />}
            <div className={`z-20 flex flex-col w-full bg-gray-50 self-end px-4 rounded-t-md ${expanded ? "h-full" :  "h-3/4" }`} style={{ boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.1)' }}>
                <button onClick={expandList} className="w-full pt-2 pb-3 hover:cursor-pointer">
                    <div className="w-1/6 h-1 bg-zinc-200 rounded-full mx-auto"></div>
                </button>

                <div className="overflow-y-scroll h-full no-scrollbar">
                    <h1 className="font-medium py-2">lümo</h1>
                    {requestResponse.map(option => (
                        <>
                        <TripOptionCard index={option.id} selected={option.id === selectedOption} onClick={() => setSelectedOption(option.id)} type={"lumo"} walk_to={option.route.walking_time_org_stop} walk_from={option.route.walking_time_dest_stop} prebooking={option.request.prebooking} departure={option.route.odr_wait_time} stop={option.route.next_stop_org_name} price={option.pricing.individual_price} discount={option.pricing.discount} regular_price={option.pricing.total_price} ticket_share={option.pricing.ticket_share} alternative_share={option.pricing.alternative_share} safety_share={option.pricing.safety_share} comfort_share={option.pricing.comfort_share}  />
                        <TripOptionCard index={option.id} selected={option.id === selectedOption} onClick={() => setSelectedOption(option.id)} type={"lumo"} walk_to={option.route.walking_time_org_stop} walk_from={option.route.walking_time_dest_stop} prebooking={option.request.prebooking} departure={8} stop={option.route.next_stop_org_name} price={option.pricing.individual_price} discount={option.pricing.discount} regular_price={option.pricing.total_price} ticket_share={option.pricing.ticket_share} alternative_share={option.pricing.alternative_share} safety_share={option.pricing.safety_share} comfort_share={option.pricing.comfort_share}  />
                        </>
                    ))}     
              </div>
            </div>

            <div className="w-full h-40 bg-white z-100 rounded-b-xl bottom-0 p-2 shadow-[0_-3px_9px_rgba(0,0,0,0.4)]">
                {!showLegend && (
                    <div className="h-28">
                        <div className="w-full flex justify-between">
                            <button className="flex items-center justify-self-end border-1 border-zinc-400 px-3 py-1.5 rounded-full hover:cursor-pointer" onClick={() => setShowLegend(true)}>
                                <LegendButton />                        
                            </button>
                            <button className="flex items-center justify-self-end border-1 border-zinc-400 px-3 py-1.5 rounded-full hover:cursor-pointer" onClick={togglePassengerSettings}>
                                <PassengerButton />
                            </button>
                        </div>
                        <div className="flex">
                            <button className="w-4/5" onClick={simulateBooking}>
                                { prebooking ? <ConfirmButton label={"Eine Fahrt reservieren"} sublabel={"Variabel machen"} /> : <ConfirmButton label={"Diese Fahrt buchen"} /> }
                            </button> 
                            <button className="w-1/5 my-2 ml-2 flex items-center justify-center bg-gray-200 rounded-xl">
                                <CalendarDays size={20} />
                            </button>                   
                        </div>                    
                    </div>
                )}
                {showLegend && (
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


            </div>
        </>
    )
}

export default RequestResults