import {useEffect,useRef} from 'react'
import {CATEGORYURL} from '../utils/urls.js'
import {addCategorys} from '../redux/categorySlice.js'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { ControlledMenu, MenuItem, useHover, useMenuState } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import LogoHome from '../assets/home_FILL0_wght400_GRAD0_opsz24.svg'
import LogoContent from '../assets/live_tv_FILL0_wght400_GRAD0_opsz24.svg'
import {fetching} from '../services/fetching.js'

export default function NavBar(){
  const dispatch = useDispatch()
  const categorys = useSelector(state => state.categorys)
  const ref = useRef(null);
  const [menuState, toggle] = useMenuState({ transition: true, transitionTimeout: '0.1s' });
  const { anchorProps, hoverProps } = useHover(menuState.state, toggle);
  const menuItemClassNameList = ({ hover }) => hover ? 'bg-slate-700 text-white' : 'text-white bg-slate-800';
  const menuItemClassName = ({ hover }) => hover ? 'bg-slate-800 text-white' : 'text-white bg-slate-800';

  useEffect(() => {
      fetching(CATEGORYURL)
        .then(data => dispatch(addCategorys(data)))
  }, [dispatch])


  return (
    <nav className="basis-1/12 flex justify-center relative">
      <div id='nav-fix' className='bg-slate-300 sm:bg-white items-center sm:items-start space-x-2 sm:space-x-0 fixed w-full h-max bottom-0 py-2 sm:py-0 sm:w-max sm:min-h-screen flex sm:flex-col sm:space-y-2 justify-center z-50'>      
        
        <Link to="/" className='hover:scale-105 transition-transform duration-200'>
          <img src={LogoHome} alt="" width={35} height={35}/>
        </Link>
        <Link ref={ref} {...anchorProps} to="/" className='hover:scale-105 transition-transform duration-200 hidden sm:block'>
          <img src={LogoContent} alt="" width={35} height={35}/>
        </Link>
        <Link to="/categorias" className='hover:scale-105 transition-transform duration-200 sm:hidden'>
          <img src={LogoContent} alt="" width={35} height={35}/>
        </Link>

        <ControlledMenu
          {...hoverProps}
          {...menuState}
          anchorRef={ref}
          onClose={() => toggle(false)}
          direction='right'
        >
          <MenuItem className={menuItemClassName}>Contenido: </MenuItem>
          {categorys.map(category => (
            <MenuItem key={category.id} className={menuItemClassNameList}>
              <Link to={'/' + category.name} className='w-full'>
                {category.name}
              </Link>
            </MenuItem>
          ))}
        </ControlledMenu>
      </div>
    </nav>
    )
}

