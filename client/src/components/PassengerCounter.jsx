import { useContext } from "react";
import { AppContext } from "../context/context"
import Minus from "../assets/icons/Minus";
import Plus from "../assets/icons/Plus";
import { calculateArrayTotal } from "../utils/calculateArrayTotal";

function PassengerCounter(props) {
    const { type, ticket, key, id } = props;
    const { passengersNum, setPassengersNum, hasTicket } = useContext(AppContext);
    const totalMax = 5

    const incrementCount = () => {
        if (calculateArrayTotal(passengersNum) < totalMax) {
            updatePassengersNum(id, passengersNum[id] + 1)       
        }
    }
    const decrementCount = () => {
        if (hasTicket) {
            if ((id != 0 && passengersNum[id] > 0) || (passengersNum[id] > 1)) {
                updatePassengersNum(id, passengersNum[id] - 1) 
            }            
        } else {
            if ((id != 1 && passengersNum[id] > 0) || (passengersNum[id] > 1)) {
                updatePassengersNum(id, passengersNum[id] - 1)
            }   
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
                    <button onClick={decrementCount} className="p-2.5 hover:cursor-pointer">
                        <Minus size={22} />                        
                    </button>
                    <p className="">{passengersNum[id]}</p>
                    <button onClick={incrementCount} className="p-2.5 hover:cursor-pointer">
                        <Plus size={22} />                        
                    </button>
                </div>         
            </div>
        </>
    )
}

export default PassengerCounter