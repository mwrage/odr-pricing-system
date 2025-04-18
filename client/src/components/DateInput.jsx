import { useState, useContext } from "react";
import DateTimePicker from "./DateTimePicker";
import { AppContext } from "../context/context";

function DateInput() {

  const { isDeparture, setIsDeparture } = useContext(AppContext);
    return (
      <>
          <div className="flex flex-col items-center w-full">
              <div className="w-full">
                <button className={`w-1/2 text-center py-2 border-b-2 hover:cursor-pointer ${isDeparture ? "border-black" : "border-zinc-100 text-zinc-600"}`} onClick={() => { setIsDeparture(true) }}>
                  <p>Abfahrt um:</p>
                </button>
                <button className={`w-1/2 text-center py-2 border-b-2 hover:cursor-pointer ${!isDeparture ? "border-black" : "border-zinc-100 text-zinc-600"}`} onClick={() => { setIsDeparture(false) }}>
                  <p>Ankunft bis:</p>
                </button>
              </div> 
          </div> 
          <DateTimePicker subLabel={isDeparture} />
      </>
    )
}

export default DateInput