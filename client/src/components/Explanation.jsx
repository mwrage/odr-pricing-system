import { useState } from "react";

function Explanation(props) {
    const { isTicket, factor, isDiscount, state, color, ticket_level = "p1", minutes = 666, totalWalkingDistance = 666 } = props;
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
        if (isDiscount) {
            rule =  "Wenn du ein gültiges ÖPNV-Ticket besitzt, entfällt dein Grundpreis, weil das lümo ein Teil des ÖPNV-Angebots ist."    
            state_desc = "Du besitzt ein gültiges Ticket."
        } else {
            rule = "Wenn du kein gültiges ÖPNV-Ticket besitzt, entspricht dein Grundpreis dem Einzelfahr-schein der geltenden Preisstufe."
            state_desc = "Du besitzt kein gültiges Ticket."
        }
    }
    else if (factor === "alternative") {
        title = "Alternativangebot"
        subtitle = "SUBTITEL für Alternativangebot"
        if (isDiscount) {
            rule =  "Wenn du mit dem Bus wesentlich länger zu deinem Ziel brauchst, wird dein Preis reduziert, weil es kein vergleichbares Angebot gibt."    
            state_desc = `Der Bus braucht ${minutes} Minuten länger.`
        } else {
            rule = "Wenn der Bus dich genauso schnell ans Ziel bringen kann, enthält der Preis einen Zuschlag, weil es ein vergleichbares Angebot gibt."
            state_desc = `Der Bus ist ${minutes} Minuten schneller.`
        }
    }
    else if (factor === "safety") {
        title = "Sicherheit"
        subtitle = "lümo bringt dich sicher und verlässlich ans Ziel."
        state_desc = `Die Haltestellen sind insgesamt ${totalWalkingDistance}m entfernt.`
        if (isDiscount) {
            rule =  "Wenn du zum Ein- oder Ausstieg einen weiten Weg zurücklegen musst, reduziert dein Sicherheitsbedürfnis den Preis."    
        } else {
            rule = "Wenn du zum Ein- oder Ausstieg keinen weiten Weg zurücklegen musst und zeitnah vom lümo eingesammelt wirst, bleibt ein Servicezuschlag."
        }
    } else {
        title = "Physischer Komfort"
        subtitle = "SUBTITEL für Physischer Komfort"
        if (isDiscount) {
            rule =  "ToDo: Reduzierung bei schlechtem Wetter / Temperatur / ...."    
        } else {
            rule = "ToDo: Aufschlag bei gutem Wetter / Temperatur / ...."
        }
    }

    return (
        <div lang="de" className={`hyphens-auto px-2.5 pb-2 rounded-b-md ${color}`}>
            <h2 className={`pt-2 inter-500`}>{isTicket && !isDiscount ? "Grundpreis: " : isDiscount ? "Reduzierung: " : "Komfortzuschlag: "}{title}</h2>
            <h3>{subtitle}</h3>
            <p className="text-zinc-800 pt-1">{rule}</p>
            <div className={`w-full h-0.5 rounded-full my-2 border-b-2 border-dashed ${color}`}></div>
            <p className="text-zinc-800 inter-500 text-center">{state_desc}</p>
            {/* <p className="text-zinc-800 text-center pt-1">{subtitle} {subtitle}</p> */}
            {isTicket && (
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
            )}
        </div>
    )
}

export default Explanation 

// - 2.40€ {showP1Details && ("- Innerhalb Bad Schwartau / Stockelsdorf")}