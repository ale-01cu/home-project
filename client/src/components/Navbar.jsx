import {useEffect, useState} from 'react'
import {CATEGORYURL, GETUSERURL} from '../utils/urls.js'
import COLORS from '../utils/colors.js'
import {addCategorys} from '../redux/categorySlice.js'
import {useSelector, useDispatch} from 'react-redux'
import LogoContent from '../assets/live_tv_FILL0_wght400_GRAD0_opsz24.svg'
import LogoSearch from '../assets/search_FILL0_wght400_GRAD0_opsz24.svg'
import {fetching} from '../services/fetching.js'
import {BtnMenu} from './BtnMenu.jsx'
import LogoLoggedOut from '../assets/account_circle_FILL0_wght400_GRAD0_opsz24.svg'
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

export default function NavBar(){
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const categorys = useSelector(state => state.categorys)
  const tokenAccess = useSelector(state => state.tokens.access)
  const tokenRefresh = useSelector(state => state.tokens.refresh)
  const menuItemClassNameList = ({ hover }) => hover 
    ? 'bg-slate-200' 
    : 'text-slate-900 bg-white transition-all duration-150';
  const menuItemClassName = ({ hover }) => hover 
    ? 'text-slate-900 bg-white' 
    : 'text-slate-900 bg-white transition-all duration-150';

  useEffect(() => {
      fetching(CATEGORYURL)
        .then(data => dispatch(addCategorys(data)))

      const getUsername = async () => {
        if (tokenAccess) {
          const res = await fetch(GETUSERURL, {
            method: 'GET',
            headers: {
              "Authorization": "Bearer " + tokenAccess
            }
          })
          const data = await res.json()
          setUsername(data.username)

        }else {
          setUsername('')
        }
      }
      
      getUsername()
      
      
  }, [dispatch, tokenAccess])

  const randomColor = () => {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    const randomElement = COLORS[randomIndex];
    return randomElement
  }

  const color = randomColor()

  return (
    <nav className="sm:w-20 px-2 flex justify-center relative">
      <div 
        id='nav-fix'
        className='
          bg-white
          items-center 
          space-x-3 
          fixed 
          w-full 
          h-max 
          bottom-0 
          py-2 
          justify-center 
          z-50 
          px-3
          flex 
          sm:flex-col 
          sm:items-start 
          sm:space-x-0 
          sm:py-0 
          sm:w-max 
          sm:min-h-screen 
          sm:space-y-3 
          '
        >      
        
        {/* <BtnMenu 
          logo={LogoHome} 
          path='/' 
          menuItemClassName={menuItemClassName} 
          text='Home'
          BtnClassName='hover:scale-110 transition-transform duration-200'
        /> */}

        
        <BtnMenu 
          logo={LogoContent} 
          path='/' 
          menuItemClassName={menuItemClassName} 
          BtnClassName='hover:scale-110 transition-transform duration-200 hidden sm:block'
          isList={true}
          list={categorys}
          menuItemClassNameList={menuItemClassNameList}
          titleList='Contenido:'
        />

        <BtnMenu 
          logo={LogoSearch} 
          path='/search' 
          menuItemClassName={menuItemClassName} 
          text='Buscador'
          BtnClassName='hover:scale-110 transition-transform duration-200'
        />
        
        <BtnMenu 
          logo={LogoContent} 
          path='/categorys' 
          menuItemClassName={menuItemClassName} 
          text='Buscador'
          BtnClassName='hover:scale-110 transition-transform duration-200 sm:hidden'
        />

        {
          tokenRefresh
          ? <>
              <BtnMenu 
                img={
                  <span className="flex justify-center items-center max-h-max max-w-max">
                    {username.charAt(0).toUpperCase()}
                  </span>
                } 
                path='#' 
                menuItemClassName={menuItemClassName} W
                BtnClassName={`hover:scale-110 transition-transform duration-200 hidden sm:block flex justify-center items-center text-3xl font-semibold text-center px-2 rounded-full ${color}`}
                isList={true}
                list={[
                  // {
                  //   id: 1,
                  //   name: 'Ver Perfil',
                  //   url: '#'
                  // },
                  {
                    id:2,
                    name: 'Cerrar Sesion',
                    url: '/logout'
                  }
                ]}
                menuItemClassNameList={menuItemClassNameList}
                titleList='Cuenta: '
              />

              <BtnMenu 
                img={
                  <span className="flex justify-center items-center max-h-max max-w-max">
                    {username.charAt(0).toUpperCase()}
                  </span>
                } 
                path='/acounts' 
                menuItemClassName={menuItemClassName} 
                BtnClassName={`hover:scale-110 transition-transform duration-200 sm:hidden flex justify-center items-center text-3xl font-semibold text-center px-2 rounded-full ${color}`}
              />
            </>

          : <>
              <BtnMenu 
                logo={LogoLoggedOut}
                path='#' 
                menuItemClassName={menuItemClassName} W
                BtnClassName='hover:scale-110 transition-transform duration-200 hidden sm:block'
                isList={true}
                list={[
                  {
                    id: 1,
                    name: 'Loguearme',
                    url: '/login'
                  },
                  {
                    id:2,
                    name: 'Registrarme',
                    url: '/register'
                  }
                ]}
                menuItemClassNameList={menuItemClassNameList}
                titleList='Cuenta: '
              />

              <BtnMenu 
                logo={LogoLoggedOut}
                path='/acounts' 
                menuItemClassName={menuItemClassName} 
                BtnClassName='hover:scale-110 transition-transform duration-200 sm:hidden'
              />
            </>
        }

      </div>
    </nav>
    )
}

