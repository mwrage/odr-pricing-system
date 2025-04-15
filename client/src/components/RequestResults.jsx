import { useState } from "react"
import TripOptionCard from "./TripOptionCard"
import PassengerButton from "./PassengerButton";
import ConfirmButton from "./ConfirmButton";
import CalendarDays from "../assets/icons/CalendarDays";

function RequestResults() {

    const [expanded, setExpanded] = useState(false)
    const [selectedOption, setSelectedOption] = useState(0);
    const expandList = () => {
        setExpanded(!expanded)
      }
    const togglePassengerSettings = () => {
        console.log("test")
    }
    const simulateBooking = () => {
        console.log("test")
    }

    const prebooking = true

    return (
        <>
            <div className={`z-20 flex flex-col w-full bg-gray-50 rounded-b-3xl self-end px-4 pb-4 rounded-t-md ${expanded ? "h-full" :  "h-3/4" }`} style={{ boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.1)' }}>
                <button onClick={expandList} className="w-full pt-2 pb-3 hover:cursor-pointer">
                    <div className="w-1/6 h-1 bg-zinc-200 rounded-full mx-auto"></div>
                </button>

                <h1 className="font-medium py-2">lümo</h1>
                <div className="overflow-y-scroll h-full no-scrollbar">
                    <TripOptionCard index={0} selected={0 === selectedOption} onClick={() => setSelectedOption(0)} type={"lumo"} walk_to={1} walk_from={4} prebooking={false} departure={"8"} stop={"Kronsforder Alee"} price={"6.40"} discount={"-22%"} regular_price={"8.20"} />
                    <TripOptionCard index={1} selected={1 === selectedOption} onClick={() => setSelectedOption(1)} type={"lumo"} walk_to={1} walk_from={4} prebooking={true} departure={"21:30 - 21:50"} stop={"Kronsforder Alee"} arrival={"21:52"} price={"2.00"} discount={"-22%"} regular_price={"8.20"} />     
                    <TripOptionCard index={2} />                
                </div>
            </div>

            <div className="w-full h-40 bg-white z-20 rounded-b-xl bottom-0 p-2"  style={{ boxShadow: '0 -2x 6px rgba(0, 0, 0, 0.9)' }}>
                <button className="flex items-center justify-self-end border-1 border-zinc-400 px-3 py-1.5 rounded-full hover:cursor-pointer" onClick={togglePassengerSettings}>
                    <PassengerButton />
                </button>
                <div className="flex">
                    <button className="w-4/5" onClick={simulateBooking}>
                        { prebooking ? <ConfirmButton label={"Eine Fahrt reservieren"} sublabel={"Variabel machen"} /> : <ConfirmButton label={"Diese Fahrt buchen"} /> }
                    </button> 
                    <button className="w-1/5 my-2 ml-2 flex items-center justify-center bg-gray-200 rounded-xl">
                        <CalendarDays size={20} />
                    </button>                   
                </div>

            </div>
        </>
    )
}

export default RequestResults