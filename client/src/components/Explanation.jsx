import { useState } from "react";
import LumoLogo from "/lumo-logo.webp"
import Bus1 from "../assets/icons/Bus1";
import Temperature from "./Temperature";
import Weather from "./Weather";

function Explanation(props) {
    const { factor, isDiscount, state, color, ticket_level, lumoTime, busTime, totalWalkingDistance, weather, weatherCondition, temperature, waitingTime, distance_threshold, temp_threshold, wait_threshold } = props;
    const [selectedTicketLevel, setSelectedTicketLevel] = useState(ticket_level);
    const ticketLevels = [
        { id: "p1", label: "Preisstufe 1", price: "2.40€", region: "Innerhalb von Bad Schwartau / Stockelsdorf" },
        { id: "p2", label: "Preisstufe 2", price: "3.40€", region: "Zwischen Bad Schwartau - Stockelsdorf" },
        { id: "p3", label: "Preisstufe 3", price: "4.20€", region: "In Lübeck oder zwischen Lübeck - Bad Schwartau / Stockelsdorf" },
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
              Du besitzt <span className="text-amber-500">{isDiscount ? "ein" : "kein"}</span> gültiges Ticket.
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
        subtitle = "lümo sorgt dafür, dass du mobil bleibst." 
        if (isDiscount) {
            rule =  "Wenn du mit dem Bus wesentlich länger brauchst, wird dein Preis reduziert, weil es kein vergleichbares Angebot gibt."    
            state_desc = (
                <>
                  Der Bus braucht <span className="text-pink-500">{(busTime-lumoTime).toFixed() < 0 ? (busTime-lumoTime).toFixed() * (-1) : (busTime-lumoTime).toFixed()} Minuten</span> länger.
                </>
              );
        } else {
            rule = "Wenn der Bus dich genauso schnell ans Ziel bringen kann, enthält der Preis einen Zuschlag, weil es ein vergleichbares Angebot gibt."
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
        state_desc = (
            <>
              Die Haltestellen sind insgesamt <span className="text-indigo-500">{totalWalkingDistance}m</span> entfernt.
            </>
          );
        if (isDiscount) {
            rule =  "Wenn du zum Ein- oder Ausstieg einen weiten Weg zurücklegen musst, reduziert dein Sicherheitsbedürfnis den Preis."    
        } else {
            rule = "Wenn du zum Ein- oder Ausstieg keinen weiten Weg zurücklegen musst und zeitnah vom lümo eingesammelt wirst, bleibt ein Servicezuschlag."
        }
    } else {
        title = "Physischer Komfort"
        subtitle = "lümo ermöglicht angeneme Fahrten."
        if (isDiscount) {
            rule =  "Wenn du länger als XX Minuten warten musst und die Umstände nicht so angenehm sind, reduziert sich dein Preis."  
            state_desc = (
                <>
                  Du musst <span className="text-sky-500">{waitingTime} Minuten</span> warten!
                </>
              ); 
        } else {
            rule = "Wenn du länger als XX Minuten warten musst und die Umstände nicht so angenehm sind, reduziert sich dein Preis."   
            state_desc = (
                <>
                  Du musst nur <span className="text-sky-500">{waitingTime} Minuten</span> warten!
                </>
              );  
        }
    }

    return (
        <div lang="de" className={`hyphens-auto px-2.5 pb-2 rounded-b-md ${color}`}>
            <h2 className={`pt-2 inter-500`}>{factor == "ticket" && !isDiscount ? "Grundpreis: " : isDiscount ? "Reduzierung: " : "Komfortzuschlag: "}{title}</h2>
            <h3>{subtitle}</h3>
            <p className="text-zinc-800 pt-1">{rule}</p>
            <div className={`w-full h-0.5 rounded-full my-2 border-b-2 border-dashed ${color}`}></div>
            <p className="text-zinc-800 inter-400 text-center">{state_desc}</p>

            {factor == "ticket" ? (
                <div className="flex flex-col items-center justify-between">
                    <div className="flex justify-between w-full">
                        {ticketLevels.map(({ id, label }) => (
                            <button key={id} className={`my-2 mr-1 px-2 py-1 rounded-full border ${selectedTicketLevel === id ? "bg-amber-500 text-white" : "border-amber-500 text-zinc-700"}`} onClick={() => setSelectedTicketLevel(id)}>
                                <p className="text-xs">{label}</p>
                            </button>
                        ))}
                    </div>
                    {selectedDetails && (
                        <div className="w-full flex flex-col justify-center text-left rounded-lg rounded-tl-none text-zinc-700 text-xs hyphens-auto" lang="de">
                        <p className="text-center inter-500">{selectedDetails.label}: {selectedDetails.price} - <span className="inter-300">{selectedDetails.region}</span></p>
                        </div>
                    )}
                </div>
            ) : 
            factor == "alternative" ? (
                <div className="w-full flex items-center justify-center text-zinc-700">
                    <div className="flex items-center justify-center py-1.5">
                        <img src={LumoLogo} className="mr-1 w-6 h-6"></img>
                        <p className="pl-1">{lumoTime.toFixed()} min</p>
                    </div>
                    <div className="w-[1px] mx-2 h-6 bg-pink-500"></div>
                    <div className="flex items-center justify-center py-1.5">
                        <Bus1 size={24} color={"#ec4899"} />
                        <p className="pl-1">{busTime.toFixed()} min</p>
                    </div>
                </div>
            ) :
            factor == "safety" ? (
                "test"
            ): (
                <>
                {isDiscount && (
                <div className="flex flex-col h-20 w-full items-center justify-center">
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

// - 2.40€ {showP1Details && ("- Innerhalb Bad Schwartau / Stockelsdorf")}