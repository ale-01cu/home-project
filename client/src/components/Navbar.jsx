import {useEffect} from 'react'
import {CATEGORYURL} from '../utils/urls.js'
import {addCategorys} from '../redux/categorySlice.js'
import {useSelector, useDispatch} from 'react-redux'
import LogoHome from '../assets/home_FILL0_wght400_GRAD0_opsz24.svg'
import LogoContent from '../assets/live_tv_FILL0_wght400_GRAD0_opsz24.svg'
import LogoSearch from '../assets/search_FILL0_wght400_GRAD0_opsz24.svg'
import {fetching} from '../services/fetching.js'
import {BtnMenu} from './btnMenu.jsx'
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

export default function NavBar(){
  const dispatch = useDispatch()
  const categorys = useSelector(state => state.categorys)
  const menuItemClassNameList = ({ hover }) => hover ? 'bg-slate-700 text-white' : 'text-white bg-slate-800';
  const menuItemClassName = ({ hover }) => hover ? 'bg-slate-800 text-white' : 'text-white bg-slate-800';

  useEffect(() => {
      fetching(CATEGORYURL)
        .then(data => dispatch(addCategorys(data)))
  }, [dispatch])


  return (
    <nav className="basis-1/12 flex justify-center relative">
      <div 
        id='nav-fix'
        className='
          bg-white sm:bg-white items-center 
          sm:items-start space-x-2 sm:space-x-0 
          fixed w-full h-max bottom-0 py-2 sm:py-0 
          sm:w-max sm:min-h-screen flex sm:flex-col 
          sm:space-y-3 justify-center z-50'
        >      
        
        <BtnMenu 
          logo={LogoHome} 
          path='/' 
          menuItemClassName={menuItemClassName} 
          text='Home'
          BtnClassName='hover:scale-110 transition-transform duration-200'
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
          path='/' 
          menuItemClassName={menuItemClassName} 
          text='Buscador'
          BtnClassName='hover:scale-110 transition-transform duration-200 hidden sm:block'
          isList={true}
          list={categorys}
          menuItemClassNameList={menuItemClassNameList}
          titleList='Contenido:'
        />
        
        <BtnMenu 
          logo={LogoContent} 
          path='/categorys' 
          menuItemClassName={menuItemClassName} 
          text='Buscador'
          BtnClassName='hover:scale-110 transition-transform duration-200 sm:hidden'
        />

      </div>
    </nav>
    )
}

