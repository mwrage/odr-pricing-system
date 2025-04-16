
import Bus1 from "../assets/icons/Bus1"
import Car2 from "../assets/icons/Car2"
import Bike from "../assets/icons/Bike"

function LoadingScreen() {

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
        <div className="flex gap-2">
            <div className="w-10 h-10 flex justify-center items-center rounded-full animate-pulse bg-zinc-500">
                <Bike size={20} color={"#FFFFFF"} />
            </div>            
            <div className="w-10 h-10 flex justify-center items-center rounded-full animate-pulse bg-zinc-500 delay-75">
                <Bus1 size={20} color={"#FFFFFF"} />
            </div>
            <div className="w-10 h-10 flex justify-center items-center rounded-full animate-pulse bg-zinc-500 delay-150">
                <Car2 size={20} color={"#FFFFFF"} />
            </div>
        </div>
        <p className="text-center py-3 inter-500">Wir suchen nach der perfekten Fahrt für dich!</p>
    </div>
  )
}

export default LoadingScreen