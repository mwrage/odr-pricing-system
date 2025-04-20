import PassengersInput from "./PassengersInput";
import ConfirmButton from "./ConfirmButton";
import ChevronDown from "../assets/icons/ChevronDown";
import { sendRequestToBackend } from "../utils/sendRequestToBackend";
import { useContext  } from "react"
import { AppContext } from "../context/context"

function PassengerSettings({ createNewRequest = false, togglePassengerSettings })  {

  const { setTripRequested, tripTime, setRequestResponse, setWaitingForResponse, isPreebooked, hasTicket, originCoords, destinationCoords, isDeparture, setResults } = useContext(AppContext);

  const handleButtonClick = () => {
    if (createNewRequest) {
      togglePassengerSettings()
      setWaitingForResponse(true)
      const results = sendRequestToBackend({setTripRequested, setRequestResponse, setWaitingForResponse, isPreebooked, hasTicket, originCoords, destinationCoords, isDeparture, tripTime})
      setResults(results)
    } else {
      togglePassengerSettings()      
    }
  }

  return (
    <>
      {/* Header */}
      <div className="w-full flex items-center justify-between pt-4 pb-2">
        <button onClick={togglePassengerSettings} className="hover:cursor-pointer w-1/4 py-2 pr-2">
          <ChevronDown size={20} style={"rotate-90"} />
        </button>
        <h1 className="text-lg font-semibold w-3/4">Zusätzliche Fahrgäste</h1>
      </div>

      {/* Linie */}
      <div className="w-full h-0.5 bg-zinc-100 rounded-full mb-1"></div>

      {/* Passengers input */}
      <PassengersInput />

      {/* Confirm Button */}
      <button className="w-full" onClick={handleButtonClick}>
        <ConfirmButton label={"Erledigt"} />
      </button>
    </>
  );
};

export default PassengerSettings;