import ChevronDown from "../assets/icons/ChevronDown";
import User4 from "../assets/icons/User4";
import { AppContext } from "../context/context"
import { useContext, useState, useEffect } from "react";
import { calculateArrayTotal } from "../utils/calculateArrayTotal";
import { useLocation } from "react-router-dom";

function PassengerButton({ resultsView = false, btnStyle = true })  {
    const { passengersNum, setPassengersNum, setHasTicket } = useContext(AppContext);
    const [passengersSum, setPassengersSum] = useState(1);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const scenarioParam = query.get("scenario");

    useEffect(() => {
        const temp = calculateArrayTotal(passengersNum)
        setPassengersSum(temp);            
    }, [passengersNum]);

    return (
        <>
            <User4 size={18} color={"#a1a1aa"} />
            <p className="font-normal text-xs px-1">{resultsView && (scenarioParam == 0 || scenarioParam == 1) ? 1 : resultsView && scenarioParam == 2 ? 2 : passengersSum} {passengersSum == 1 ? "Fahrgast" : "Fahrgäste"}</p>
            { btnStyle && ( <ChevronDown size={14} style={"pb-0.5"}/> )} 
        </>

    );
};

export default PassengerButton;