import { useContext  } from "react"
import { AppContext } from "../context/context"
import Map from "./Map"
import BookingArea from "./BookingArea"
import RequestResults from "./RequestResults"

function BookingScreen() {

  const { tripRequested, setTripRequested } = useContext(AppContext);

  return (
    <>
      <div className="flex flex-col w-full h-full text-zinc-800 bg-gray-100 rounded-3xl inter-300">
        <Map />
        {!tripRequested ? <BookingArea /> : <RequestResults />}
      </div>
    </>
  )
}

export default BookingScreen
