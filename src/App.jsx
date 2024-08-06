import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './Components/Dashboard'
import Favourites from './Components/Favourites'
import Keypad from './Components/Keypad'
import Recent from './Components/Recent'
import Voicemail from './Components/Voicemail'
import Contacts from './Components/Contacts'
import Save from './Components/Save'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard/>}>
          <Route path='/favourite' element={<Favourites/>}/>
          <Route path='/recent' element={<Recent/>}/>
          <Route path='/contact' element={<Contacts/>}/>
          <Route path='/keypad' element={<Keypad/>}/>
          <Route path='/voice' element={<Voicemail/>}/>
        </Route>
        <Route path='/save' element={<Save/>} />
      </Routes>
    </>
  )
}

export default App
