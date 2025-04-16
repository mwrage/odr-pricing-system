
function Explanation(props) {
    const { isTicket, factor, isDiscount, state, color } = props;
    let title = ""
    let subtitle = ""
    let rule = ""

    if (factor === "ticket") {
        title = "ÖPNV-Tarif" 
        subtitle = "lümo unterstützt den ÖPNV."      
        if (isDiscount) {
            rule =  "Wenn du ein gültiges ÖPNV-Ticket besitzt, entfällt dein Grundpreis, weil das lümo ein Teil des ÖPNV-Angebots ist."    
        } else {
            rule = "Wenn du kein gültiges ÖPNV-Ticket besitzt, entspricht dein Grundpreis dem Einzelfahr-schein der geltenden Preisstufe."
        }
    }
    else if (factor === "alternative") {
        title = "Alternativangebot"
        subtitle = "SUBTITEL für Alternativangebot"
        if (isDiscount) {
            rule =  "Wenn du mit dem Bus wesentlich länger zu deinem Ziel brauchst, wird dein Preis reduziert, weil es kein vergleichbares Angebot gibt."    
        } else {
            rule = "Wenn der Bus dich genauso schnell ans Ziel bringen kann, enthält der Preis einen Zuschlag, weil es ein vergleichbares Angebot gibt."
        }
    }
    else if (factor === "safety") {
        title = "Sicherheit"
        subtitle = "SUBTITEL für Sicherheit"
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
        <p className="text-zinc-800 inter-500 text-center">{state}</p>
        <p className="text-zinc-800 text-center pt-1">{subtitle} {subtitle}</p>
    </div>
    )
}

export default Explanation