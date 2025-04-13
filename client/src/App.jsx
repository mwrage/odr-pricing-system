import './App.css'
import { useEffect, useState } from 'react'
import MobileDevice from './components/MobileDevice'
import BookingScreen from './components/BookingScreen';

function App() {
  const [objs, setObjs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/test")
    .then(response => response.json()
    .then(data => {
      console.log(data);
      setObjs(data.testobjs);
    })
  )}, []);

  return (
    <>
      <MobileDevice content={<BookingScreen />}/>
    </>
  )
}

export default App
