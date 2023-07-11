import NavBar from './components/Navbar.jsx'
import {
  Routes,
  Route
} from "react-router-dom";
import {Catalogue} from './pages/Catalogue.jsx'
import './assets/App.css'

function App() {
  return (
    <div className='min-h-screen' id='subRoot'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Catalogue/>}/>
        <Route path='/:category' element={<Catalogue/>}/>
      </Routes>
    </div>
  )
}

export default App
