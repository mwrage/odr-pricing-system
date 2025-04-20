import ChevronDown from "../assets/icons/ChevronDown";
import User4 from "../assets/icons/User4";
import { AppContext } from "../context/context"
import { useContext, useState, useEffect } from "react";
import { calculateArrayTotal } from "../utils/calculateArrayTotal";

function PassengerButton({ btnStyle = true })  {
    const { passengersNum } = useContext(AppContext);
    const [passengersSum, setPassengersSum] = useState(1);

    useEffect(() => {
        const temp = calculateArrayTotal(passengersNum)
        setPassengersSum(temp);
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