import { useState, useContext  } from "react"
import { AppContext } from "../context/context"
import TextInput from "./TextInput"
import PassengersInput from "./PassengersInput"
import PassengerButton from "./PassengerButton"
import PassengerSettings from "./PassengersSettings"
import DateInput from "./DateInput"
import ConfirmButton from "./ConfirmButton";
import DateTimePicker from "./DateTimePicker";
import ChevronDown from "../assets/icons/ChevronDown"
import ArrowDownward from "../assets/icons/ArrowDownward"
import Search1 from "../assets/icons/Search1";
import MapPin5 from "../assets/icons/MapPin5"
import Bus1 from "../assets/icons/Bus1"
import CalendarDays from "../assets/icons/CalendarDays";
import User4 from "../assets/icons/User4";

function BookingArea() {
    const [expanded, setExpanded] = useState(false)
    const [dateSettings, setDateSettings] = useState(false)
    const [passengerSettings, setPassengerSettings] = useState(false)
    const [chooseStart, setChooseStart] = useState(false)
    const [rotated, setRotated] = useState(false)
    const [time, setTime] = useState("Jetzt");
    const { tripRequested, setTripRequested, tripTime } = useContext(AppContext);
    
    const expandSettings = () => {
      setExpanded(!expanded)
    }
    const switchInputs = () => {
      setChooseStart(!chooseStart)
      setRotated(!setRotated)
    }
    const toggleDateSettings = () => {
      console.log(tripTime)
      setDateSettings(!dateSettings)
    }
    const togglePassengerSettings = () => {
      setPassengerSettings(!passengerSettings)
    }

    const handleRequest = () => {
      // ToDo: get real request parameters
      // ToDo: check request parameters
      setTripRequested(true)
    }

    return (
      <> 
        {/* ${expanded ? "h-full" : dateSettings ? "h-1/2" : passengerSettings ? "h-2/3" : "h-[35%]" } */}
        <div className={`z-20 flex flex-col w-full bg-white rounded-b-3xl self-end px-5 pb-5 rounded-t-md ${(expanded ||  dateSettings || passengerSettings) ? "h-full" :  "h-[35%]" }`} style={{ boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.1)' }}>
        { !dateSettings && !passengerSettings && (
            <button onClick={expandSettings} className="w-full pt-2 pb-3 hover:cursor-pointer">
              <div className="w-1/6 h-1 bg-zinc-200 rounded-full mx-auto"></div>
            </button>
        )}

        {/* Default requests settings view */}
        { !expanded && !dateSettings && !passengerSettings && (
            <>
              {/* Search + date */}
              <div className="w-full flex items-center justify-between">
                <button className="relative flex items-center w-full rounded-l-lg pr-1 hover:cursor-pointer" onClick={expandSettings}>
                  <Search1 size={16} />
                  <div className="w-full bg-gray-100 rounded-l-lg">
                    <p className="justify-self-start pl-8 font-medium py-3.5">Wohin?</p>
                  </div>
                </button>
                {/* <DateInput /> */}
                <button className="flex items-center w-[45%] bg-gray-100 rounded-r-lg py-4 hover:cursor-pointer" onClick={toggleDateSettings}>
                  <CalendarDays style={"ml-3"} />
                  <p className="text-xs font-normal pl-2 pr-0.5">{time}</p>      
                  <ChevronDown style={"pr-2 scale-60"} />  
                </button>
              </div>
              {/* Passenger */}
              <div className="w-full flex items-center justify-between py-4">
                  <p className="text-sm font-normal">Fährst du alleine?</p>
                  {/* <PassengersInput /> */}
                  <button className="flex items-center border-1 border-zinc-400 px-3 py-1.5 rounded-full hover:cursor-pointer" onClick={togglePassengerSettings}>
                    <PassengerButton />
                  </button>
              </div>
              <div className="flex items-center py-2">
                <Bus1 size={22} />
                <p className="px-2 text-sm">Hauptbahnhof Lübeck</p>
              </div>
            </>   
        )}

        {/* Expanded requests settings view */}
        { expanded && !dateSettings && !passengerSettings && (
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
                <Bus1 size={22} color={"#343C54"}/>
                <p className="px-2 text-sm">Hauptbahnhof Lübeck</p>
              </div>
              <button onClick={handleRequest}>
                <ConfirmButton label={"Fahrt anfragen"}/>
              </button>
            </>
        )}

        {/* Date and time settings view */}
        { !expanded && dateSettings && (
            <>
              {/* Header */}
              <div className="w-full flex items-center justify-between pt-4 pb-2">
                <button onClick={toggleDateSettings} className="hover:cursor-pointer w-1/4 py-2 pr-2">
                  <ChevronDown size={20} style={"rotate-90"} />
                </button>
                <h1 className="text-lg font-semibold w-[70%]">Eine Fahrt buchen</h1>
              </div>
              <div></div>
              {/* Route inputs */}
              <div className="w-full h-0.5 bg-zinc-100 rounded-full my-1"></div>
              <DateInput />
              <button onClick={toggleDateSettings}>
                <ConfirmButton label={"Planen"}/>
              </button>
            </>
        )}

        {/* Passenger settings view */}
        { !expanded && passengerSettings && (
          <PassengerSettings togglePassengerSettings={togglePassengerSettings} />
        )}

        </div>
      </>
    )
  }
  
  export default BookingArea
  