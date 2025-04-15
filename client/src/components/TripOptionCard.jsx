import { useState } from "react"
import TripOptionShort from "./TripOptionShort";
import PriceDetails from "./PriceDetails";
import ChevronDown from "../assets/icons/ChevronDown";

function TripOptionCard(props) {
    const { index, selected, onClick, type, walk_to, walk_from, prebooking, departure, stop, arrival, price, discount, regular_price } = props
    const [showDetails, setShowDetails] = useState(false)


    return (
        <>
            <div key={index} className={`w-full h-fit bg-white border ${selected ? "border-black" : "border-zinc-200"} rounded-lg pt-3 mb-4 px-2 text-sm`} onClick={onClick}>
                {showDetails ? (
                    <>
                    <div className="w-full flex items-center justify-between">
                        <button onClick={() => setShowDetails(false)} className="hover:cursor-pointer w-1/4 pr-2">
                            <ChevronDown size={20} style={"rotate-90"} />
                        </button>
                        <h1 className="text-base font-semibold w-2/3">Dein Fahrtpreis</h1>
                    </div>
                    <div className="w-full h-0.5 bg-zinc-100 rounded-full my-2"></div>
                    <PriceDetails walk_to={walk_to} walk_from={walk_from} prebooking={prebooking} departure={departure} stop={stop} arrival={arrival} price={price} discount={discount} regular_price={regular_price}/>
                    </>
                ) : (
                    <>
                    <TripOptionShort selected={selected} walk_to={walk_to} walk_from={walk_from} prebooking={prebooking} departure={departure} stop={stop} arrival={arrival} price={price} discount={discount} regular_price={regular_price}/>
                    <button className="w-full text-sm text-center bg-zinc-800 text-white mt-2 mb-3 rounded-lg py-2" onClick={() => setShowDetails(true)}>Mehr zu meinem Preis</button>
                    </>
                )}
            </div>
        </>
    )
}

export default TripOptionCard