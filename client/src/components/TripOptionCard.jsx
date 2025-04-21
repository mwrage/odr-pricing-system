import { useState, useContext } from "react"
import { AppContext } from "../context/context";
import TripOptionShort from "./TripOptionShort";
import PriceDetails from "./PriceDetails";
import ChevronDown from "../assets/icons/ChevronDown";
import QuestionMarkCircle from "../assets/icons/QuestionMarkCircle";


function TripOptionCard(props) {
    const { index, selected, onClick, type, walk_to, walk_from, prebooking, departure, stop, arrival, price, discount, regular_price, ticket_share, alternative_share, safety_share, comfort_share, lumoTime, busTime, ticket_level, totalWalkingDistance, weather, weatherCondition, temperature, distance_threshold, temp_threshold, wait_threshold, walk_to_dist, walk_from_dist, requestedTime} = props
    const [showDetails, setShowDetails] = useState(false)
    const { setIsOpen } = useContext(AppContext);

    const segments = [
        { factor:"Min.", label: 1, value: 1, color: "#3f3f46", textColorDonut: "#3f3f46", textColorBar: "text-white border-zinc-800" },
        { factor:"Ticket", label: ticket_share, value: ticket_share < 0 ? ticket_share * (-1) : ticket_share, color: ticket_share < 0 ? "rgba(245, 158, 11, 0.1)" : "#f59e0b", textColorDonut: "#f59e0b", textColorBar: ticket_share < 0 ? "text-zinc-800 border-amber-300" : "text-white border-amber-500" },        
        { factor:"Alternativangebot", label: alternative_share, value: alternative_share < 0 ? alternative_share * (-1) : alternative_share, color: alternative_share < 0 ? "rgba(236, 72, 153, 0.1)" : "#ec4899", textColorDonut: "#ec4899", textColorBar: alternative_share < 0 ? "text-zinc-800 border-pink-300" : "text-white border-pink-500"},
        { factor:"Sicherheit", label: safety_share, value: safety_share < 0 ? safety_share * (-1) : safety_share, color: safety_share < 0 ? "rgba(99, 102, 241, 0.1)" : "#6366f1", textColorDonut: "#6366f1", textColorBar: safety_share < 0 ? "text-zinc-800 border-indigo-300" : "text-white border-indigo-500"},
        { factor:"Komfort", label: comfort_share, value: comfort_share < 0 ? comfort_share * (-1) : comfort_share, color: comfort_share < 0 ? "rgba(14, 165, 233, 0.1)" : "#0ea5e9", textColorDonut: "#0ea5e9", textColorBar: comfort_share < 0 ? "text-zinc-800 border-sky-300" : "text-white border-sky-500"},  
    ];

    return (
            <div key={index} className={`flex flex-col w-full h-fit bg-white border ${selected ? "border-black" : "border-zinc-200"} rounded-lg px-2 pt-3 mb-4 text-sm`} onClick={onClick}>
                {showDetails ? (
                    <>
                    <div className="w-full flex items-center justify-center px-2">
                        <button onClick={() => setShowDetails(false)} className="hover:cursor-pointer w-1/4 pr-2">
                            <ChevronDown size={20} style={"rotate-90"} />
                        </button>
                        <h1 className="text-base font-semibold w-2/3">Dein Fahrtpreis</h1>
                        
                        <button className="hover:cursor-pointer" onClick={() => setIsOpen(true)}>
                            <QuestionMarkCircle size={28} />
                        </button>
                    </div>
                    <div className="w-11/12 place-self-center h-0.5 bg-zinc-100 rounded-full my-2"></div>
                    <PriceDetails walk_to={walk_to} walk_from={walk_from} prebooking={prebooking} departure={departure} stop={stop} arrival={arrival} 
                    price={price} discount={discount} regular_price={regular_price} segments={segments} walk_to_dist={walk_to_dist} walk_from_dist={walk_from_dist}
                    lumoTime={lumoTime} busTime={busTime} ticket_level={ticket_level} totalWalkingDistance={totalWalkingDistance} 
                    weather={weather} weatherCondition={weatherCondition} temperature={temperature}
                    distance_threshold={distance_threshold} temp_threshold={temp_threshold} wait_threshold={wait_threshold}
                    ticketDiscount={ticket_share < 0 ? true : false} alternativeDiscount={alternative_share < 0 ? true : false}  safetyDiscount={safety_share < 0 ? true : false}  comfortDiscount={comfort_share < 0 ? true : false}/>
                    </>
                ) : (
                    <>
                    {/* <TripOptionShort selected={selected} walk_to={walk_to} walk_from={walk_from} prebooking={prebooking} departure={departure} stop={stop} arrival={arrival} price={price} discount={discount} regular_price={regular_price} ticket_share={ticket_share} alternative_share={alternative_share} safety_share={safety_share} comfort_share={comfort_share}/> */}
                    <TripOptionShort selected={selected} walk_to={walk_to} walk_from={walk_from} prebooking={prebooking} departure={departure} stop={stop} arrival={arrival} price={price} discount={discount} regular_price={regular_price} segments={segments}  requestedTime={requestedTime}/>
                    <button className="hover:cursor-pointer w-full self-center text-sm text-center bg-zinc-800 text-white mt-2 mb-3 rounded-lg py-2" onClick={() => setShowDetails(true)}>Mehr zu meinem Preis</button>
                    </>
                )}
            </div>
    )
}

export default TripOptionCard