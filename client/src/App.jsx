import NavBar from './components/Navbar.jsx'
import {
  Routes,
  Route
} from "react-router-dom";
import {ContentList} from './components/ContentList.jsx'

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<ContentList/>}/>
        <Route path='/:category' element={<ContentList/>}/>
      </Routes>
    </>
  )
}

export default App
