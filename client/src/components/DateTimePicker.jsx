import { useState } from 'react';
import { getDay } from 'date-fns';

function DateTimePicker (props) {

    const { subLabel } = props
     
    const getTimePeriod = () => {
      const days = []
  
      for (let i = 0; i < 7; i++) {
        const date = new Date()
        date.setDate(date.getDate() + i)
  
        const weekday = date.toLocaleDateString('de-DE', { weekday: 'short' })
        const dateString = date.toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })
  
        days.push({
          value: date.toISOString().split('T')[0],
          label: `${weekday}., ${dateString}`,
          weekday: weekday
        })
      }
      return days
    }
  
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
    const [selected, setSelected] = useState(days[0].label)
    const initialWeekday = days[0].weekday
    const initialTimes = (initialWeekday === 'Sa' || initialWeekday === 'So')
    ? generateTimes(20, 0, 3, 40)
    : generateTimes(20, 0, 0, 40)

    const [times, setTimes] = useState(initialTimes)
    const [selectedTime, setSelectedTime] = useState(initialTimes[0])
  
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
      setSelectedTime('')
    }

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