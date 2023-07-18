import { ControlledMenu, MenuItem, useHover, useMenuState } from '@szhsin/react-menu';
import {Link} from 'react-router-dom'
import {useRef} from 'react'
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';


export const BtnMenu = ({ 
  logo, 
  img, 
  path='', 
  menuItemClassName='', 
  text='', 
  isList=false, 
  list=[], 
  titleList='', 
  BtnClassName='', 
  menuItemClassNameList='' }) => {
    
  const ref = useRef(null);
  const [menuState, toggle] = useMenuState({ transition: true, transitionTimeout: '0.1s' });
  const { anchorProps, hoverProps } = useHover(menuState.state, toggle);


  return (
    <>
      <Link ref={ref} {...anchorProps} to={path} className={BtnClassName}>
        {
          img 
          ? img
          : <img src={logo} alt="" width={35} height={35}/>
        }
      </Link>

      <ControlledMenu
        {...hoverProps}
        {...menuState}
        anchorRef={ref}
        onClose={() => toggle(false)}
        direction='right'
        className={'hidden sm:block'}
      >
        {
          isList
          ? <>
              <MenuItem className={menuItemClassName}>{titleList}</MenuItem>
              {list.map(e => (
                <MenuItem key={e.id} className={menuItemClassNameList}>
                  <Link to={e.url ? e.url :  '/' + e.name} className='w-full'>
                    {e.name}
                  </Link>
                </MenuItem>
              ))}
            </>
          : <MenuItem className={menuItemClassName}>
              {text}
            </MenuItem>
        }

      </ControlledMenu>
    </>
    
  )
}