import { useState } from "react";
import Minus from "../assets/icons/Minus";
import Plus from "../assets/icons/Plus";

function PassengerCounter(props) {
    const { type, ticket, id } = props;
    const [count, setCount] = useState(0)
    const totalMax = 6

    const incrementCount = () => {
        if (count < totalMax) {
            setCount(count + 1)            
        }
    }
    const decrementCount = () => {
        if (count > 0) {
            setCount(count - 1)            
        }
    }

    return (
        <>
            <div id={id} className="flex justify-between items-center w-full py-2">
                <div className="w-full">
                    <h1>{type}</h1>
                    <p className="text-xs">{ticket}</p>
                </div>   
                <div className="flex items-center justify-center">
                    <button onClick={decrementCount} className="p-2 hover:cursor-pointer">
                        <Minus size={22} />                        
                    </button>
                    <p className="">{count}</p>
                    <button onClick={incrementCount} className="p-2 hover:cursor-pointer">
                        <Plus size={22} />                        
                    </button>
                </div>         
            </div>
        </>
    )
}

export default PassengerCounter