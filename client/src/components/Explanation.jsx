
function Explanation(props) {
    const { isTicket, factor, isDiscount, state, color } = props;
    let title = ""
    let subtitle = ""
    const rule = "Wenn du kein gültiges ÖPNV-Ticket besitzt, entspricht dein Grundpreis dem Einzelfahrschein der geltenden Preisstufe."

    if (factor === "ticket") {
        title = "ÖPNV-Tarif" 
        subtitle = "ÖPNV-Tarif"        
    }
    else if (factor === "alternative") {
        title = "Alternativangebot"
        subtitle = "Alternativangebot"
    }
    else if (factor === "safety") {
        title = "Sicherheit"
        subtitle = "Sicherheit"
    } else {
        title = "Physischer Komfort"
        subtitle = "Physischer Komfort"
    }

    return (
        <div lang="de" className={`hyphens-auto px-2.5 pb-2 rounded-b-md ${color}`}>
        <h2 className={`pt-2 inter-500`}>{isTicket ? "Grundpreis: " : isDiscount ? "Reduzierung: " : "Komfortzuschlag: "}{title}</h2>
        <h3>{subtitle}</h3>
        <p className="text-zinc-800 pt-1">{rule}</p>
        <div className={`w-full h-0.5 rounded-full my-2 border-b-2 border-dashed ${color}`}></div>
        <p className="text-zinc-800 inter-500 text-center">{state}</p>
        <p className="text-zinc-800 text-center pt-1">{subtitle} {subtitle}</p>
    </div>
    )
}

export default Explanation