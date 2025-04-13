import BookingArea from "./BookingArea"
import Map from "./Map"

function BookingScreen() {

  return (
    <>
      <div className="flex flex-col w-full h-full bg-gray-100 rounded-3xl">
        <Map />
        <BookingArea />
      </div>
    </>
  )
}

export default BookingScreen
