import { useState, useContext } from "react";
import { AppContext } from "../context/context";
import LumoLogo from "/lumo-logo.webp"
import Bus1 from "../assets/icons/Bus1";
import Temperature from "./Temperature";
import Weather from "./Weather";
import Route1 from "../assets/icons/Route1"
import { calculateArrayTotal } from "../utils/calculateArrayTotal";

function Explanation(props) {
    const { factor, isDiscount, state, color, ticket_level, lumoTime, busTime, totalWalkingDistance, weather, weatherCondition, temperature, waitingTime, distance_threshold, temp_threshold, wait_threshold,  walk_to, walk_from } = props;
    const { passengersNum } = useContext(AppContext);
    const totalPassengers = calculateArrayTotal(passengersNum)
    const totalPassengersWithTicket = calculateArrayTotal([passengersNum[0], passengersNum[2], passengersNum[4]])
    const singleShare = (factor === "alternative" ? 2.25 : factor === "safety" ? 1.70 : 1.05)
    const individualShare = (isDiscount ? singleShare * (-1) : singleShare)
    const [selectedTicketLevel, setSelectedTicketLevel] = useState(ticket_level);
    const ticketLevels = [
        { id: "p1", label: "Preisstufe 1", price: "1.50€/2.40€", region: "Innerhalb von Bad Schwartau / Stockelsdorf" },
        { id: "p2", label: "Preisstufe 2", price: "2.00€/3.40€", region: "Zwischen Bad Schwartau - Stockelsdorf" },
        { id: "p3", label: "Preisstufe 3", price: "2.50€/4.20€", region: "Lübeck / Lübeck - Bad Schwartau / Stockelsdorf" },
    ];
    const selectedDetails = ticketLevels.find(t => t.id === selectedTicketLevel);

    let title = ""
    let subtitle = ""
    let rule = ""
    let state_desc = ""

    if (factor === "ticket") {
        title = "ÖPNV-Tarif" 
        subtitle = "lümo unterstützt den ÖPNV."     
        state_desc = (
            <>
              {totalPassengers > 1 ? `${totalPassengersWithTicket} von ${totalPassengers} ${totalPassengersWithTicket == 1 ? "besitzt ": "besitzen "}`  : "Du besitzt "}<span className="text-amber-500">{(isDiscount || totalPassengers > 1) ? "ein" : "kein"}</span> gültiges Ticket.
            </>
          );
        if (isDiscount) {
            rule =  "Wenn du ein gültiges ÖPNV-Ticket besitzt, entfällt dein Grundpreis, weil das lümo ein Teil des ÖPNV-Angebots ist."    
        } else {
            rule = "Wenn du kein gültiges ÖPNV-Ticket besitzt, entspricht dein Grundpreis dem Einzelfahr-schein der geltenden Preisstufe."
        }
    }
    else if (factor === "alternative") {
        title = "Alternativangebot"
        subtitle = "lümo sorgt für deine Mobilität." 
        rule =  "Wenn du mit dem Bus wesentlich länger brauchst, wird dein Preis reduziert, weil es kein vergleichbares Angebot gibt." 
        if (isDiscount) {
            state_desc = (
                <>
                    Der Bus braucht <span className="text-pink-500">{(busTime-lumoTime).toFixed() < 0 ? (busTime-lumoTime).toFixed() * (-1) : (busTime-lumoTime).toFixed()} Minuten</span> länger.
                </>
              );
        } else {
            state_desc = (
                <>
                    Der Bus ist <span className="text-pink-500">{(lumoTime-busTime).toFixed() < 0 ? (lumoTime-busTime).toFixed() * (-1) : (lumoTime-busTime).toFixed()} Minuten</span> schneller.
                </>
              );
        }
    }
    else if (factor === "safety") {
        title = "Sicherheit"
        subtitle = "lümo bringt dich sicher ans Ziel."
        rule =  "Kürzere Strecken können mehr Sicherheit bieten. Wenn du weiter als XXXm laufen musst, reduziert sich dein Preis." 
        state_desc = (
            <>
                Insgesamt {totalPassengers > 1 ? "müsst ihr " : "musst du "}<span className="text-indigo-500">{totalWalkingDistance}m</span> weit laufen.
            </>
          );
    } else {
        title = "Physischer Komfort"
        subtitle = "lümo sorgt für angeneme Fahrten."
        rule =  "Wenn du länger als XX Minuten warten musst und die Umstände nicht so angenehm sind, reduziert sich dein Preis."  
        state_desc = (
            <>
                {totalPassengers > 1 ? "Ihr müsst " : "Du musst "}{isDiscount ? "" : "nur "}<span className="text-sky-500">{waitingTime.toFixed()} Minuten</span> warten!
            </>
          ); 
    }

    return (
        <div lang="de" className={`hyphens-auto px-1 pb-2 rounded-b-md ${color}`}>
            <div className="flex justify-between items-center pt-2">
                <div className="flex flex-col">
                    <h2 className={`inter-500`}>{factor == "ticket" && !isDiscount ? "Grundpreis: " : isDiscount ? "Reduzierung: " : "Zuschlag: "}{title}</h2>  
                    <h3>{subtitle}</h3>                                
                </div>
                {factor != "ticket" && totalPassengers > 1 && ( <p className={`w-fit h-fit text-center border-l text-xs ml-auto px-2 ${factor === "alternative" ? "text-pink-500 border-pink-300" : factor === "safety" ? "text-indigo-500 border-indigo-300" : "text-sky-500 border-sky-300"}`}>{individualShare.toFixed(2)}€ /<br></br>Person</p>)}  
            </div>
            <p className="text-zinc-800 pt-1">{rule}</p>
            <div className={`w-full h-0.5 rounded-full my-2 border-b-2 border-dashed ${color}`}></div>
            <p className="text-zinc-800 inter-400 text-center">{state_desc}</p>

            {factor == "ticket" ? (
                <div className="flex flex-col items-center justify-between h-16">
                    <div className="flex justify-between w-full">
                        {ticketLevels.map(({ id, label }) => (
                            <button key={id} className={`my-1 mr-1 px-2 py-1 rounded-full border ${selectedTicketLevel === id ? "bg-amber-500 text-white" : "border-amber-500 text-zinc-700"}`} onClick={() => setSelectedTicketLevel(id)}>
                                <p className="text-xs">{label}</p>
                            </button>
                        ))}
                    </div>
                    {selectedDetails && (
                        <div className="w-full flex flex-col justify-center text-left rounded-lg rounded-tl-none text-zinc-700 text-xs hyphens-auto" lang="de">
                            <p className="text-center inter-500">Wo? <span className="inter-300">{selectedDetails.region}</span></p>
                            <p className="text-center inter-500">Wie viel? <span className="inter-300">{selectedDetails.price} Kinder/Erwachsene</span></p>
                        </div>
                    )}
                </div>
            ) : 
            factor == "alternative" ? (
                <div className="w-full flex items-center justify-center text-zinc-700 h-16 py-2">                
                    <div className="flex items-center justify-center">
                        <img src={LumoLogo} className="mr-1 w-7 h-7"></img>
                        <p className="pl-1">{lumoTime.toFixed()} min</p>
                    </div>
                    <div className="w-[1px] mx-2 h-6 bg-pink-500"></div>
                    <div className="flex items-center justify-center">
                        <Bus1 size={28} color={"#ec4899"} />
                        <p className="pl-1">{busTime.toFixed()} min</p>
                    </div>
                </div>
            ) :
            factor == "safety" ? (
                <>
                <div className="w-full flex items-center justify-center text-zinc-700 h-16">
                    <div className="flex flex-col items-start justify-start py-1.5">
                        <p className="inter-500">Einstieg</p>
                        <p className="">{walk_to.toFixed()}m</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="mx-2 w-6 h-0.5 border-2 border-transparent border-b-indigo-500 border-dashed "></div>
                        <Route1 size={24} color={"#6366f1"} />
                        <div className="mx-2 w-6 h-0.5 border-2 border-transparent border-b-indigo-500 border-dashed "></div>
                    </div>
                    <div className="flex flex-col items-end justify-end py-1.5">
                        <p className="inter-500">Ausstieg</p>
                        <p className="">{walk_from.toFixed()}m</p>
                    </div>
                </div>
                </>
            ): (
                <>
                {(
                <div className="flex flex-col w-full items-center justify-start h-16">
                    <Weather condition={weatherCondition} temp={temperature} />
                    <Temperature temp={temperature} threshold={temp_threshold} />
                </div>
                )}
                </>
            )}
        </div>
    )
}

export default Explanation 