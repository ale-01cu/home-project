import NavBar from './components/Navbar.jsx'
import {
  Routes,
  Route
} from "react-router-dom";
import {ContentList} from './components/ContentList'
import {CategorysList} from './components/CategoryList'
import {ContentDetail} from './pages/ContentDetailPage.jsx'
import {SearchPage} from './pages/SearchPage.jsx'
import {Catalogue} from './pages/CataloguePage.jsx'
import './assets/App.css'

function App() {
  return (
    <div className='min-h-screen flex flex-col sm:flex-row' id='subRoot'>
      <NavBar/>
      <main className='min-h-screen sm:basis-11/12 z-0'>
        <Routes>
          <Route path='/' element={<Catalogue/>}/>
          <Route path='/:category' element={<Catalogue/>}/>
          <Route path='/detail/:id' element={<ContentDetail/>}/>
          <Route path='/categorys' element={<CategorysList/>}/>
          <Route path='/search' element={<SearchPage/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
