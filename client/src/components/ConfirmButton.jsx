import { useLocation } from "react-router-dom";

function ConfirmButton(props) {
    const { label, sublabel = "" } = props;
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const scenarioParam = query.get("scenario");

    return (
        <>
            <div className="w-full bg-zinc-800 py-2 text-center rounded-xl my-2 hover:cursor-pointer">
                <p className="text-white inter-500">{label}</p>
                <p className="text-white inter-200 text-xs">{sublabel != "" && scenarioParam == 0 ? "Freitag, 23:30" : sublabel != "" && scenarioParam == 1 ? "Donnerstag, 21:00" : sublabel != "" && scenarioParam == 2 ? "Donnerstag, 20:30" : sublabel}</p>
            </div>
        </>
    )
}

export default ConfirmButton