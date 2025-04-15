import Route1 from "../assets/icons/Route1"
import ConfirmButton from "./ConfirmButton"

function PriceStructureModal({ setIsOpen }) {

    return (
      <>
          <div className="flex flex-col bg-white w-1/5 text-center shadow-2xl shadow-zinc-700 z-100 py-4 px-8 mt-32 inter-500 rounded-lg absolute self-center">
            <div className="flex justify-center w-full pb-2">
                <Route1 size={44} />             
            </div>
            <h1 className="inter-600">Flexible Fahrt, flexibler Preis!</h1>
            <p className="inter-400 hyphens-auto" lang="de">
                Was du zahlst, hängt von verschiedenen Faktoren deiner Fahrt ab. 
                Je nach Bedarf können sich diese auch reduzieren - damit du garantiert effizient mobil bleibst!</p>
            <button className="w-full hover:cursor-pointer" onClick={() => setIsOpen(false)}>
                <ConfirmButton label="Okay" />
            </button>   
          </div> 
      </>
    )
}

export default PriceStructureModal