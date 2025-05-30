import { useState } from "react"
import Bus1 from "../assets/icons/Bus1";
import Ticket1 from "../assets/icons/Ticket1";
import CloudSun from "../assets/icons/CloudSun";
import DonutChart from "./DonutChart";
import Explanation from "./Explanation";

function PriceDetails(props) {
    const { walk_to, walk_from, prebooking, departure, stop, arrival, price, discount, regular_price, segments, lumoTime, busTime, ticketDiscount, alternativeDiscount, safetyDiscount, comfortDiscount, ticket_level, totalWalkingDistance, weather, weatherCondition, temperature, distance_threshold, temp_threshold, wait_threshold, walk_to_dist, walk_from_dist } = props
    const [showExplanation, setShowExplanation] = useState(1)

    return (
      <div className="flex flex-col h-full">

        <div className="flex items-center justify-center w-full pt-10 pb-14">
            <DonutChart total={price} max={regular_price} data={segments} /> 
        </div>
        

        <div className="w-full flex">
            <button className={`flex justify-center border py-1 w-1/4 ${showExplanation === 1 ? "bg-amber-500 border-amber-600 border-b-transparent" : "bg-amber-500/20 border-b-amber-500 border-transparent"}`} onClick={() => setShowExplanation(1)}>
                <Ticket1 size={20} />
            </button>
            <button className={`flex justify-center border py-1 w-1/4 ${showExplanation === 2 ? "bg-pink-500 border-pink-600 border-b-transparent" : "bg-pink-500/20 border-b-pink-500 border-transparent"}`} onClick={() => setShowExplanation(2)}>
                <Bus1 size={20} color={"#FFFFFF"} />
            </button>
            <button className={`flex justify-center border py-1 w-1/4 ${showExplanation === 3 ? "bg-indigo-500 border-indigo-600 border-b-transparent" : "bg-indigo-500/20 border-b-indigo-500 border-transparent"}`} onClick={() => setShowExplanation(3)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" id="Walk--Streamline-Tabler" height={20} width={20} ><desc>{"Walk Streamline Icon: https://streamlinehq.com"}</desc><path d="M7.5 2.5a0.625 0.625 0 1 0 1.25 0 0.625 0.625 0 1 0 -1.25 0" strokeWidth={1} /><path d="m4.375 13.125 1.875 -2.5" strokeWidth={1} /><path d="m10 13.125 -1.25 -2.5 -1.875 -1.875 0.625 -3.75" strokeWidth={1} /><path d="m3.75 7.5 1.25 -1.875 2.5 -0.625 1.875 1.875 1.875 0.625" strokeWidth={1} /></svg>
            </button>
            <button className={`flex justify-center border py-1 w-1/4 ${showExplanation === 4 ? "bg-sky-500 border-sky-600 border-b-transparent" : "bg-sky-500/20 border-b-sky-500 border-transparent"}`} onClick={() => setShowExplanation(4)}>
                <CloudSun size={20} />
            </button>
        </div>
        <div className="mb2">
        
            <Explanation isTicket={showExplanation === 1 ? true : false} lumoTime={lumoTime} busTime={busTime} ticket_level={ticket_level} walk_to={walk_to_dist} walk_from={walk_from_dist}
            factor={showExplanation === 1 ? "ticket" : showExplanation === 2 ? "alternative" : showExplanation === 3 ? "safety" : "comfort"} 
            isDiscount={showExplanation === 1 ? ticketDiscount : showExplanation === 2 ? alternativeDiscount : showExplanation === 3 ? safetyDiscount : comfortDiscount} 
            state={"tbd"} totalWalkingDistance={totalWalkingDistance} weather={weather} weatherCondition={weatherCondition} temperature={temperature} waitingTime={departure}
            distance_threshold={distance_threshold} temp_threshold={temp_threshold} wait_threshold={wait_threshold}
            color={showExplanation === 1 ? "text-amber-500 border-amber-500" : showExplanation === 2 ? "text-pink-500 border-pink-500" : showExplanation === 3 ? "text-indigo-500 border-indigo-500" : "text-sky-500 border-sky-500"
            } />

        </div>

      </div>
    );
  };

export default PriceDetails