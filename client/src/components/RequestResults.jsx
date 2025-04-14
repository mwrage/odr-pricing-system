import { useState } from "react"
import TripOptionCard from "./TripOptionCard"

function RequestResults() {

    const [expanded, setExpanded] = useState(false)
    const [selectedOption, setSelectedOption] = useState(0);
    const expandList = () => {
        setExpanded(!expanded)
      }

    return (
        <>
            <div className={`z-20 flex flex-col w-full bg-gray-50 rounded-b-3xl self-end px-4 pb-4 rounded-t-md ${expanded ? "h-full" :  "h-3/4" }`} style={{ boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.1)' }}>
                <button onClick={expandList} className="w-full pt-2 pb-3 hover:cursor-pointer">
                    <div className="w-1/6 h-1 bg-zinc-200 rounded-full mx-auto"></div>
                </button>

                <h1 className="font-medium py-2">lümo</h1>
                <div className="overflow-y-scroll h-full no-scrollbar">
                    <TripOptionCard index={0} selected={0 === selectedOption} onClick={() => setSelectedOption(0)} type={"lumo"} walk_to={1} walk_from={4} prebooking={false} departure={"8"} stop={"Kronsforder Alee"} price={"2.00"} />
                    <TripOptionCard index={1} selected={1 === selectedOption} onClick={() => setSelectedOption(1)} type={"lumo"} walk_to={1} walk_from={4} prebooking={true} departure={"21:30-21:50"} stop={"Kronsforder Alee"} arrival={"21:52"} price={"2.00"}/>     
                    <TripOptionCard index={2} />                
                </div>
            </div>
        </>
    )
}

export default RequestResults