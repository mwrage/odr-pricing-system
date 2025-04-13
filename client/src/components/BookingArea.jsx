import { useState } from "react"
import TextInput from "./TextInput"
import PassengersInput from "./PassengersInput"
import DateInput from "./DateInput"
import ChevronDown from "../assets/icons/ChevronDown"
import ArrowDownward from "../assets/icons/ArrowDownward"
import Search1 from "../assets/icons/Search1";
import MapPin5 from "../assets/icons/MapPin5"
import Bus1 from "../assets/icons/Bus1"

function BookingArea() {
    const [expanded, setExpanded] = useState(false)
    const [chooseStart, setChooseStart] = useState(false)
    const [rotated, setRotated] = useState(false)
    
    const expandSettings = () => {
      setExpanded(!expanded)
    }
    const switchInputs = () => {
      setChooseStart(!chooseStart)
      setRotated(!setRotated)
    }

    return (
      <>
        <div className={`flex flex-col w-full bg-white rounded-b-3xl self-end px-5 pb-5 rounded-t-md ${expanded ? "h-[95%]" : "h-[35%]" }`} style={{ boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.1)' }}>
        <button onClick={expandSettings} className="w-full pt-2 pb-3 hover:cursor-pointer">
          <div className="w-1/6 h-1 bg-zinc-100 rounded-full mx-auto"></div>
        </button>

        {/* Default requests settings view */}
        { !expanded && (
            <>
              {/* Search + date */}
              <div className="w-full flex items-center justify-between">
                <button className="relative flex items-center w-full rounded-l-lg pr-1 hover:cursor-pointer" onClick={expandSettings}>
                  <Search1 size={16} />
                  <div className="w-full bg-gray-100 rounded-l-lg">
                    <p className="justify-self-start pl-8 font-medium py-3.5">Wohin?</p>
                  </div>
                </button>
                <DateInput />
              </div>
              {/* Passenger */}
              <div className="w-full flex items-center justify-between py-4">
                  <p className="text-sm font-normal">Fährst du alleine?</p>
                  <PassengersInput />
              </div>
              <div className="flex items-center py-2">
                <Bus1 size={22} />
                <p className="px-2 text-sm">Hauptbahnhof Lübeck</p>
              </div>
            </>   
        )}

        {/* Expanded requests settings view */}
        { expanded && (
            <>
              {/* Header */}
              <div className="w-full flex items-center justify-between pt-4 pb-2">
                <button onClick={expandSettings} className="hover:cursor-pointer w-1/4">
                  <ChevronDown size={20} style={"rotate-90"} />
                </button>
                <h1 className="text-lg font-semibold w-2/3">{chooseStart ? "Einstieg bestätigen" :" Wo wollen Sie hin?"}</h1>
                <button className={`flex -space-x-2 hover:cursor-pointer ${rotated ? "rotate-180 duration-150" : "rotate-0 duration-150"} `} onClick={switchInputs}>
                  <ArrowDownward size={20} />
                  <ArrowDownward size={20} style={"rotate-180"} />
                </button>
              </div>
              {/* Route inputs */}
              <TextInput label="Gewünschter Start" iconRotation="rotate-180" />
              <TextInput label="Gewünschtes Zeil"/>
              <div className="flex items-center py-2">
                <MapPin5 size={20} />
                <p className="px-2 text-xs">Auf Karte auswählen</p>
              </div>
              <div className="w-full h-0.5 bg-zinc-100 rounded-full my-2"></div>
              <p className="px-2 text-xs">Vorschläge</p>
              <div className="flex items-center py-2">
                <Bus1 size={22} />
                <p className="px-2 text-sm">Hauptbahnhof Lübeck</p>
              </div>
            </>
        )}

        </div>
      </>
    )
  }
  
  export default BookingArea
  