import { useContext  } from "react"
import { AppContext } from "../context/context"
import Map from "./Map"
import BookingArea from "./BookingArea"
import LoadingScreen from "./LoadingScreen"
import RequestResults from "./RequestResults"

function BookingScreen() {

  const { tripRequested, waitingForResponse } = useContext(AppContext);

  return (
      <div className="flex flex-col w-full max-md:pb-8 h-full text-zinc-800 bg-gray-100 rounded-3xl inter-300">
        <Map />
        {tripRequested ? <RequestResults /> : waitingForResponse ? <LoadingScreen /> : <BookingArea />}
      </div>
  )
}

export default BookingScreen
