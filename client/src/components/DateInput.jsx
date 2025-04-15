import { useState } from "react";
import DateTimePicker from "./DateTimePicker";

function DateInput() {

    const [depart, setDepart] = useState(true);
    return (
      <>
          <div className="flex flex-col items-center w-full">
              <div className="w-full">
                <button className={`w-1/2 text-center py-2 border-b-2 hover:cursor-pointer ${depart ? "border-black" : "border-zinc-100 text-zinc-600"}`} onClick={() => { setDepart(true) }}>
                  <p>Abfahrt um:</p>
                </button>
                <button className={`w-1/2 text-center py-2 border-b-2 hover:cursor-pointer ${!depart ? "border-black" : "border-zinc-100 text-zinc-600"}`} onClick={() => { setDepart(false) }}>
                  <p>Ankunft bis:</p>
                </button>
              </div> 
          </div> 
          <DateTimePicker subLabel={depart} />
      </>
    )
}

export default DateInput