import ChevronDown from "../assets/icons/ChevronDown";
import User4 from "../assets/icons/User4";
import { AppContext } from "../context/context"
import { useContext, useState, useEffect } from "react";

function PassengerButton({ num })  {
    const { passengersNum } = useContext(AppContext);
    const [passengersSum, setPassengersSum] = useState(1);

    useEffect(() => {
        let temp = 0;
        for (let i = 0; i < passengersNum.length; i++) {
            temp += passengersNum[i];
        }
        setPassengersSum(temp);
    }, [passengersNum]);

    return (
        <>
            <User4 size={18}/>
            <p className="font-normal text-xs px-1">{passengersSum} {passengersSum == 1 ? "Fahrgast" : "Fahrgäste"}</p>
            <ChevronDown size={14} style={"pb-0.5"}/>    
        </>

    );
};

export default PassengerButton;