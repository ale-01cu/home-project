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
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTokens } from './redux/tokensSlice.js';
import {VERIFYTOKENURL, REFRESHTOKENURL} from './utils/urls.js'
import './assets/App.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const tokenAccess = localStorage.getItem('tkaccess')
    const tokenRefresh = localStorage.getItem('tkrefresh')

    const verifyTokens = async () => {
      const res = await fetch(VERIFYTOKENURL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({token: tokenAccess})
      })

      if (res.status === 200) {
        dispatch(addTokens({
          access: tokenAccess, 
          refresh: tokenRefresh
        }))
      }else {
        const resRefresh = await fetch(REFRESHTOKENURL, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({refresh: tokenRefresh})
        })
        const { access, refresh } = await resRefresh.json()

        if (res.status === 200) {
          localStorage.setItem('tkaccess', access)
          localStorage.setItem('tkrefresh', refresh)

          dispatch(addTokens({
            access, 
            refresh
          }))
        }else {
          localStorage.setItem('tkaccess', '')
          localStorage.setItem('tkrefresh', '')

          dispatch(addTokens({
            access: '', 
            refresh: ''
          }))
        }
      }
    }

    if (tokenAccess && tokenRefresh)
      verifyTokens()

  }, [dispatch])

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
