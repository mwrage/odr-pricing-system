import PassengerCounter from "./PassengerCounter";

function PassengersInput() {

  return (
    <>
        <PassengerCounter type={"Erwachsene"} ticket={"ÖPNV-Ticket vorhanden"} key={"adults-with-ticket"} id={0}/>
        <div className="w-full h-0.5 bg-zinc-100 rounded-full my-0.5"></div>
        <PassengerCounter type={"Erwachsene"} ticket={"kein ÖPNV-Ticket vorhanden"} key={"adults-no-ticket"} id={1}/>
        <div className="w-full h-0.5 bg-zinc-100 rounded-full my-0.5"></div>
        <PassengerCounter type={"Kinder ab 6 J."} ticket={"ÖPNV-Ticket vorhanden"} key={"children-with-ticket"} id={2}/>
        <div className="w-full h-0.5 bg-zinc-100 rounded-full my-0.5"></div>
        <PassengerCounter type={"Kinder ab 6 J."} ticket={"kein ÖPNV-Ticket vorhanden"} key={"children-no-ticket"} id={3}/>
        <div className="w-full h-0.5 bg-zinc-100 rounded-full my-0.5"></div>
        <PassengerCounter type={"Kinder unter 6 J."} ticket={""} key={"children-below-6"} id={4}/>
      </>
  )
}

export default PassengersInput