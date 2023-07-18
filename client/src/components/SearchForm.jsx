import {useSelector, useDispatch} from 'react-redux'
import {addSearch} from '../redux/searchSlice.js'
import LogoSearch from '../assets/search_FILL0_wght400_GRAD0_opsz24.svg'
import LogoCloseSearch from '../assets/close_FILL0_wght400_GRAD0_opsz24.svg'
import {fetching} from '../services/fetching.js'
import {CATALOGUEURL} from '../utils/urls.js'
import { addSearchContent } from '../redux/searchSlice.js'
import {useNavigate} from 'react-router-dom'

export const Search = () => {
  const dispatch = useDispatch()
  const search = useSelector(state => state.search.search)
  const navegate = useNavigate()

  const handleChange = e => {
    dispatch(addSearch(e.target.value))
  }

  const handleClick = () => {
    dispatch(addSearch(''))
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (search) {
      const url = CATALOGUEURL + '?search=' + search

      fetching(url)
        .then(data => dispatch(addSearchContent(data)))
  
      navegate('/search?q=' + search)
    }
  }

  return (
    <form action="" className='sm:w-1/2 w-3/4' onSubmit={handleSubmit}>
      <div className='flex relative w-full justify-between rounded-2xl'>
        <div className='
          bg-slate-200 
          rounded-2xl 
          rounded-r-none 
          outline-none 
          basis-4/5 
          lg:basis-5/6 
          min-w-0 relative 
          flex 
          justify-end 
          items-center'>
          <input 
            type="text" 
            name="search" 
            id="search" 
            onChange={handleChange} 
            value={search} 
            className='rounded-2xl w-full outline-none min-w-0 py-2 pl-2 bg-inherit'
            placeholder='Buscar'
          />
          {search && <button type='button' className='absolute z-10 bg-inherit' onClick={handleClick}>
            <img src={LogoCloseSearch} alt="" />
          </button>}
        </div>
        <button type='submit' className='
          bg-slate-800 
          rounded-2xl 
          rounded-l-none 
          basis-1/5 
          lg:basis-1/6 
          flex 
          justify-center 
          items-center 
          py-2 px-2'
          >
          <img src={LogoSearch} alt="" className='invert'/>
        </button>
      </div>
    </form>
  )
}