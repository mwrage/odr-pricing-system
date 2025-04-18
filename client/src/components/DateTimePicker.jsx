import { useState, useContext, useEffect  } from "react"
import { AppContext } from "../context/context"
import { formatRequestedTime } from "../utils/formatRequestTime";
import { getTimePeriod } from "../utils/getTimePeriod";

function DateTimePicker ({ subLabel }) {

    const { setTripTime, setIsPreebooked, tripTimeLabels, setTripTimeLabels } = useContext(AppContext);
  
    const generateTimes = (startHour, startMinute, endHour, endMinute) => {
      const times = []
      const start = new Date()
      start.setHours(startHour, startMinute, 0, 0)
  
      const end = new Date()
      if (endHour < startHour) end.setDate(end.getDate() + 1)
      end.setHours(endHour, endMinute, 0, 0)
  
      while (start <= end) {
        const hh = String(start.getHours()).padStart(2, '0')
        const mm = String(start.getMinutes()).padStart(2, '0')
        times.push(`${hh}:${mm}`)
        start.setMinutes(start.getMinutes() + 10)
      }
  
      return times;
    }

    const days = getTimePeriod()
    const [selected, setSelected] = useState(tripTimeLabels[0])
    const initialWeekday = days[0].weekday
    const initialTimes = (initialWeekday === 'Sa' || initialWeekday === 'So')
    ? generateTimes(20, 0, 3, 40)
    : generateTimes(20, 0, 0, 40)

    const [times, setTimes] = useState(initialTimes)
    const [selectedTime, setSelectedTime] = useState(tripTimeLabels[1])
  
    const handleDateChange = (e) => {
      const selectedValue = e.target.value
      setSelected(selectedValue)
      const selectedDay = days.find(d => d.value === selectedValue)
  
      const weekday = selectedDay?.weekday
  
      const isWeekend = weekday === 'Sa' || weekday === 'So'
      const newTimes = isWeekend
        ? generateTimes(20, 0, 3, 40)
        : generateTimes(20, 0, 0, 40)
  
      setTimes(newTimes)
    }


    useEffect(() => {
      const formattedTime = formatRequestedTime([selected, selectedTime])
      const chosenDate = new Date(formattedTime);
      const dateNow = new Date();
      const isSameDay = chosenDate.getFullYear() === dateNow.getFullYear() && chosenDate.getMonth() === dateNow.getMonth() && chosenDate.getDate() === dateNow.getDate();
      if (isSameDay) {
        setIsPreebooked(false)
      } else {
        setIsPreebooked(true)
      }
      setTripTime(formattedTime)
      setTripTimeLabels([selected, selectedTime])
    }, [selected, selectedTime]);

    return (
        <>
            <div className='my-4'>
                <p className='text-lg font-semibold'>{selected}, {selectedTime}</p>
                <div className="w-full h-0.5 bg-zinc-100 rounded-full my-3"></div>
                <p className='text-sm'>{subLabel ? "Abohlzeit ändern" : "Ausstiegszeit ändern"}</p>
                <select id="days" value={selected} onChange={handleDateChange} className='w-1/2 text-center border border-white border-b-zinc-200 focus:outline-none focus:ring-0 py-2 pr-2 hover:cursor-pointer'>
                    {days.map((tag, index) => (
                    <option key={index} value={tag.label}>
                        {tag.label}
                    </option>
                    ))}
                </select>


                {times.length > 0 && (
                    <>
                        <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className='pl-0.5 w-1/2 text-center border border-white border-b-zinc-200 focus:outline-none focus:ring-0 py-2 pr-2 hover:cursor-pointer'>
                            {times.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                            ))}
                        </select>
                    </>
                )}



            </div>
        </>
    )
}
export default DateTimePicker;