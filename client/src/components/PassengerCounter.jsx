import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/context"
import Minus from "../assets/icons/Minus";
import Plus from "../assets/icons/Plus";

function PassengerCounter(props) {
    const { type, ticket, key, id } = props;
    const [count, setCount] = useState(0)
    const { passengersNum, setPassengersNum } = useContext(AppContext);
    const totalMax = 6

    const incrementCount = () => {
        if (count < totalMax) {
            updatePassengersNum(id, count + 1)
            setCount(count + 1)  
            //setPassengersNum(passengersNum + 1)         
        }
    }
    const decrementCount = () => {
        if (count > 0) {
            updatePassengersNum(id, count - 1)
            setCount(count - 1)
            //setPassengersNum(passengersNum - 1)            
        }
    }

    const updatePassengersNum = (index, updatedCount) => {
        setPassengersNum(orgArr => {
          const temp = [...orgArr];
          temp[index] = updatedCount;
          return temp;
        });
      };

    return (
        <>
            <div id={id} key={key} className="flex justify-between items-center w-full py-2">
                <div className="w-full">
                    <h1>{type}</h1>
                    <p className="text-xs">{ticket}</p>
                </div>   
                <div className="flex items-center justify-center">
                    <button onClick={decrementCount} className="p-2 hover:cursor-pointer">
                        <Minus size={22} />                        
                    </button>
                    <p className="">{passengersNum[id]}</p>
                    <button onClick={incrementCount} className="p-2 hover:cursor-pointer">
                        <Plus size={22} />                        
                    </button>
                </div>         
            </div>
        </>
    )
}

export default PassengerCounter