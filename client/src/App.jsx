import './App.css'
import { useEffect, useState } from 'react'
import { ContextProvider } from './context/context';
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
    <ContextProvider>
      <MobileDevice content={<BookingScreen />}/>
    </ContextProvider>
  )
}

export default App
