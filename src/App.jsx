import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './Components/Dashboard'
import Favourites from './Components/Favourites'
import Keypad from './Components/Keypad'
import Recent from './Components/Recent'
import Voicemail from './Components/Voicemail'
import Contacts from './Components/Contacts'
import Save from './Components/Save'
import ContactsList from './Components/ContactsList'
import AuthSign from './Components/Authentication/AuthSign'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AuthSign />} />
        <Route path='/dash' element={<Dashboard />}>
          {/* Child routes are relative, so remove the leading slash */}
          <Route path='favourite' element={<Favourites />} />
          <Route path='recent' element={<Recent />} />
          <Route path='contact' element={<Contacts />} />
          <Route path='keypad' element={<Keypad />} />
          <Route path='voice' element={<Voicemail />} />
        </Route>
        <Route path='/save' element={<Save />} />
        <Route path='/numberPage' element={<ContactsList />} />
      </Routes>
    </>
  )
}

export default App;
