import NavBar from './components/Navbar.jsx'
import {Routes, Route} from "react-router-dom";
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
    <div className=' min-h-screen flex flex-col-reverse sm:flex-row' id='subRoot'>
      <NavBar/>
      <main className='min-h-screen sm:basis-full lg:basis-12/13 z-0 pb-14'>
        <Routes>
          <Route path='/' element={<Catalogue/>}/>
          <Route path='/:category' element={<Catalogue/>}/>
          <Route path='/detail/:id' element={<ContentDetail/>}/>
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
