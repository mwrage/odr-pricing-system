import ChevronDown from "../assets/icons/ChevronDown";
import User4 from "../assets/icons/User4";
import { AppContext } from "../context/context"
import { useContext } from "react";

function PassengerButton({ num })  {
    const { passengersNum } = useContext(AppContext);
    return (
        <>
            <User4 size={18}/>
            <p className="font-normal text-xs px-1">{passengersNum} {passengersNum == 1 ? "Fahrgast" : "Fahrgäste"}</p>
            <ChevronDown size={14} style={"pb-0.5"}/>    
        </>

    );
};

export default PassengerButton;