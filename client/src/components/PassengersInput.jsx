import { useState } from "react";
import User4 from "../assets/icons/User4";
import ChevronDown from "../assets/icons/ChevronDown";

function PassengersInput() {

    const [passengersNum, setPassengersNum] = useState(1);

  return (
    <>
        <button className="flex items-center border-1 border-zinc-400 px-3 py-1.5 rounded-full hover:cursor-pointer">
            <User4 size={18}/>
            <p className="font-normal text-xs px-1">{passengersNum} {passengersNum == 1 ? "Fahrgast" : "Fahrgäste"}</p>
            <ChevronDown size={14} style={"pt-0.5"}/>
        </button>
    </>
  )
}

export default PassengersInput