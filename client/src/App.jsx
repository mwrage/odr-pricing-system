import './App.css'
import { ContextProvider } from './context/context';
import MobileDevice from './components/MobileDevice'
import BookingScreen from './components/BookingScreen';

function App() {

  return (
    <ContextProvider>
      <MobileDevice content={<BookingScreen />}/>
    </ContextProvider>
  )
}

export default App
