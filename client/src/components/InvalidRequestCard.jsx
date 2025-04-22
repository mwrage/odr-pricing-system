import { AppContext } from "../context/context"
import { useContext } from "react";
import ConfirmButton from "./ConfirmButton";

function InvalidRequestCard({ description }) {

    const { setTripRequested } = useContext(AppContext);

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full text-center pt-6 px-6 pb-3 bg-white border rounded-lg text-sm">
                <p className="inter-500 pb-2">Huch! Deine Anfrage konnte nicht verarbeitet werden.</p>
                <p className="inter-300 text-xs">{description}</p>
                <button className="w-full" onClick={() => {setTripRequested(false)}}>
                    <ConfirmButton label={"Neue Anfrage erstellen"} />
                </button>
            </div>
        </>
    )
}

export default InvalidRequestCard