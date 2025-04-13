import PassengerCounter from "./PassengerCounter";

function PassengersInput() {

  return (
    <>
        <PassengerCounter type={"Erwachsene"} ticket={"ÖPNV-Ticket vorhanden"} id={"adults-with-ticket"}/>
        <div className="w-full h-0.5 bg-zinc-100 rounded-full my-0.5"></div>
        <PassengerCounter type={"Erwachsene"} ticket={"kein ÖPNV-Ticket vorhanden"} id={"adults-no-ticket"}/>
        <div className="w-full h-0.5 bg-zinc-100 rounded-full my-0.5"></div>
        <PassengerCounter type={"Kinder ab 6 J."} ticket={"ÖPNV-Ticket vorhanden"} id={"children-with-ticket"}/>
        <div className="w-full h-0.5 bg-zinc-100 rounded-full my-0.5"></div>
        <PassengerCounter type={"Kinder ab 6 J."} ticket={"kein ÖPNV-Ticket vorhanden"} id={"children-no-ticket"}/>
        <div className="w-full h-0.5 bg-zinc-100 rounded-full my-0.5"></div>
        <PassengerCounter type={"Kinder unter 6 J."} ticket={""} id={"children-below-6"}/>
      </>
  )
}

export default PassengersInput