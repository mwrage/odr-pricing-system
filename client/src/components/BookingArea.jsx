import TextInput from "./TextInput"
function BookingArea() {

    return (
      <>
        <div className="w-full h-[40%] bg-white rounded-b-3xl self-end p-8">
          <TextInput id={"targetLocation"} placeholder={"Wohin?"} />
        </div>
      </>
    )
  }
  
  export default BookingArea
  