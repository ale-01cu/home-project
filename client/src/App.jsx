import NavBar from './components/Navbar.jsx'
import {Routes, Route} from "react-router-dom";
import {CategorysList} from './components/CategoryList'
import Logout from './components/logout.jsx'
import {ContentDetail} from './pages/ContentDetailPage.jsx'
import {SearchPage} from './pages/SearchPage.jsx'
import {Catalogue} from './pages/CataloguePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AcountOptionsPage from './pages/AcountOptions.jsx'
import useVerifyToken from './hooks/verifyTokens.js'
import './assets/App.css'

function App() {
  useVerifyToken()

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
          <Route path='/acounts' element={<AcountOptionsPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/logout' element={<Logout/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
