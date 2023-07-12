import {useEffect,useRef, useState} from 'react'
import {CATEGORYURL} from '../utils/urls.js'
import {addCategorys} from '../redux/categorySlice.js'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { ControlledMenu, MenuItem, useHover, useMenuState } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import LogoHome from '../assets/home_FILL0_wght400_GRAD0_opsz24.svg'
import LogoContent from '../assets/live_tv_FILL0_wght400_GRAD0_opsz24.svg'

export default function NavBar(){
    const dispatch = useDispatch()
    const categorys = useSelector(state => state.categorys)

    const ref = useRef(null);
    const [menuState, toggle] = useMenuState({ transition: true, transitionTimeout: '0.1s' });
    const { anchorProps, hoverProps } = useHover(menuState.state, toggle);

    useEffect(() => {
        fetch(CATEGORYURL)
          .then(res => res.json())
          .then(data => dispatch(addCategorys(data)))
          .catch(e => console.log(e))
    }, [])

    const menuItemClassName = ({ hover }) => hover ? 'bg-slate-700 text-white' : 'text-white bg-slate-800';

    return (
      <nav className="basis-1/12 flex justify-center relative">
        <div id='nav-fix' className='fixed min-h-screen flex flex-col space-y-2 justify-center z-50'>      
          <Link to="/" className=''>
            <img src={LogoHome} alt="" width={35} height={35}/>
          </Link>
          <Link ref={ref} {...anchorProps} to="/" className=''>
            <img src={LogoContent} alt="" width={35} height={35}/>
          </Link>

          <ControlledMenu
            {...hoverProps}
            {...menuState}
            anchorRef={ref}
            onClose={() => toggle(false)}
            direction='right'
          >
            {categorys.map(category => (
              <MenuItem key={category.id} className={menuItemClassName}>
                <Link to={'/' + category.name} className='w-full'>{category.name}</Link>
              </MenuItem>
            ))}
          </ControlledMenu>
        </div>
      </nav>
      )
}

