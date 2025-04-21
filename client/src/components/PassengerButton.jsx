import ChevronDown from "../assets/icons/ChevronDown";
import User4 from "../assets/icons/User4";
import { AppContext } from "../context/context"
import { useContext, useState, useEffect } from "react";
import { calculateArrayTotal } from "../utils/calculateArrayTotal";
import { useLocation } from "react-router-dom";

function PassengerButton({ btnStyle = true })  {
    const { passengersNum, setPassengersNum, setHasTicket } = useContext(AppContext);
    const [passengersSum, setPassengersSum] = useState(1);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const scenarioParam = query.get("scenario");

    useEffect(() => {
        if (scenarioParam == 0) {
            setHasTicket(true)
            setPassengersNum([1, 0, 0, 0, 0]); // has ticket
            setPassengersSum(1);
        } else if (scenarioParam == 1) {
            setHasTicket(false)
            setPassengersNum([0, 1, 0, 0, 0]); // has no ticket
            setPassengersSum(1);    
        } else {
            const temp = calculateArrayTotal(passengersNum)
            setPassengersSum(temp);            
        }
    }, [passengersNum]);

    return (
        <>
            <User4 size={18} color={"#a1a1aa"} />
            <p className="font-normal text-xs px-1">{passengersSum} {passengersSum == 1 ? "Fahrgast" : "Fahrgäste"}</p>
            { btnStyle && ( <ChevronDown size={14} style={"pb-0.5"}/> )} 
        </>

    );
};

export default PassengerButton;