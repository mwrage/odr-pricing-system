import Route1 from "../assets/icons/Route1"
import ConfirmButton from "./ConfirmButton"
import { useContext } from "react";
import { AppContext } from "../context/context";

function PriceStructureModal() {
    const { setIsOpen } = useContext(AppContext);

    return (
      <>
          <div className="flex flex-col bg-white w-72 mx-auto text-center self-center shadow-2xl shadow-zinc-700 z-100 py-4 px-6 mt-12 inter-500 rounded-lg absolute">
            <div className="flex justify-center w-full pb-2">
                <Route1 size={44} />             
            </div>
            <h1 className="inter-600">Flexible Fahrt, flexibler Preis!</h1>
            <p className="inter-400 hyphens-auto text-justify py-1" lang="de"> Pro Fahrt enthält dein Preis immer einen <span className="inter-500">Mindestbeitrag von 1€</span>.</p>
            <p className="inter-400 hyphens-auto text-justify" lang="de">
                Was du zusätzlich bezahlst, hängt von verschiedenen <span className="inter-500">Faktoren deiner Fahrt</span> ab. 
                Je nach Bedarf können sich diese auch reduzieren - damit du garantiert effizient mobil bleibst!</p>
            <button className="w-full hover:cursor-pointer" onClick={() => setIsOpen(false)}>
                <ConfirmButton label="Okay" />
            </button>   
          </div> 
      </>
    )
}

export default PriceStructureModal