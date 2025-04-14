import { useState } from "react"
import TripOptionShort from "./TripOptionShort";

function TripOptionCard(props) {
    const { index, selected, onClick, type, walk_to, walk_from, prebooking, departure, stop, arrival,  price } = props
    const [showDetails, setShowDetails] = useState(false)


    return (
        <>
            <div key={index} className={`w-full h-40 bg-white border ${selected ? "border-black" : "border-zinc-200"} rounded-lg pt-3 mb-4 px-2 text-sm`} onClick={onClick}>
                {showDetails ? (
                    <p>Test Details</p>
                ) : (
                    <>
                    <TripOptionShort walk_to={walk_to} walk_from={walk_from} prebooking={prebooking} departure={departure} stop={stop} arrival={arrival} price={price} />
                    <button className="w-full text-sm text-right" onClick={() => setShowDetails(true)}>Mehr zur Preiszusammensetzung</button>
                    </>
                )}
            </div>
        </>
    )
}

export default TripOptionCard