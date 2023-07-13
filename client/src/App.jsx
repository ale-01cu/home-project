import NavBar from './components/Navbar.jsx'
import {
  Routes,
  Route
} from "react-router-dom";
import {ContentList} from './components/ContentList'
import {CategorysList} from './components/CategoryList'
import './assets/App.css'

function App() {
  return (
    <div className='min-h-screen flex flex-col sm:flex-row' id='subRoot'>
      <NavBar/>
      <main className='min-h-screen sm:basis-11/12 z-0'>
        <Routes>
          <Route path='/' element={<ContentList/>}/>
          <Route path='/:category' element={<ContentList/>}/>
          <Route path='/categorias' element={<CategorysList/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
