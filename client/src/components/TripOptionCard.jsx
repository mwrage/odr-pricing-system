import { useState } from "react"
import TripOptionShort from "./TripOptionShort";
import PriceDetails from "./PriceDetails";
import ChevronDown from "../assets/icons/ChevronDown";
import PriceStructureModal from "./PriceStructureModal";
import QuestionMarkCircle from "../assets/icons/QuestionMarkCircle";


function TripOptionCard(props) {
    const { index, selected, onClick, type, walk_to, walk_from, prebooking, departure, stop, arrival, price, discount, regular_price, ticket_share, alternative_share, safety_share, comfort_share } = props
    const [showDetails, setShowDetails] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    return (
            <div key={index} className={`flex flex-col w-full h-fit bg-white border ${selected ? "border-black" : "border-zinc-200"} rounded-lg pt-3 mb-4 text-sm`} onClick={onClick}>
                {showDetails ? (
                    <>
                    <div className="w-full flex items-center justify-between px-2">
                        <button onClick={() => setShowDetails(false)} className="hover:cursor-pointer w-1/4 pr-2">
                            <ChevronDown size={20} style={"rotate-90"} />
                        </button>
                        <h1 className="text-base font-semibold w-2/3">Dein Fahrtpreis</h1>
                        
                        <button className="hover:cursor-pointer" onClick={() => setIsOpen(true)}>
                            <QuestionMarkCircle size={28} />
                        </button>
                        {isOpen && (<PriceStructureModal setIsOpen={setIsOpen} />)}

                    </div>
                    <div className="w-11/12 place-self-center h-0.5 bg-zinc-100 rounded-full my-2"></div>
                    <PriceDetails walk_to={walk_to} walk_from={walk_from} prebooking={prebooking} departure={departure} stop={stop} arrival={arrival} price={price} discount={discount} regular_price={regular_price}/>
                    </>
                ) : (
                    <>
                    <TripOptionShort selected={selected} walk_to={walk_to} walk_from={walk_from} prebooking={prebooking} departure={departure} stop={stop} arrival={arrival} price={price} discount={discount} regular_price={regular_price} ticket_share={ticket_share} alternative_share={alternative_share} safety_share={safety_share} comfort_share={comfort_share}/>
                    <button className="w-11/12 self-center text-sm text-center bg-zinc-800 text-white mt-2 mb-3 rounded-lg py-2" onClick={() => setShowDetails(true)}>Mehr zu meinem Preis</button>
                    </>
                )}
            </div>
    )
}

export default TripOptionCard