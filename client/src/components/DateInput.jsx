import { useState } from "react";
import CalendarDays from "../assets/icons/CalendarDays";
import ChevronDown from "../assets/icons/ChevronDown";

function DateInput() {

    const [time, setTime] = useState("Jetzt");

  return (
    <>
        <div className="flex items-center w-[45%] bg-gray-100 rounded-r-lg py-4 hover:cursor-pointer">
            <CalendarDays/>
            <p className="text-xs font-normal pl-2 pr-0.5">{time}</p>      
            <ChevronDown style={"pr-2 scale-60"} />  
        </div>
    </>
  )
}

export default DateInput