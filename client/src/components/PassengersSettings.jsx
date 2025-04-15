import PassengersInput from "./PassengersInput";
import ConfirmButton from "./ConfirmButton";
import ChevronDown from "../assets/icons/ChevronDown";

function PassengerSettings({ togglePassengerSettings })  {
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
      <button onClick={togglePassengerSettings}>
        <ConfirmButton label={"Erledigt"} />
      </button>
    </>
  );
};

export default PassengerSettings;