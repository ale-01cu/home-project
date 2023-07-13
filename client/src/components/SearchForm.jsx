import {useSelector, useDispatch} from 'react-redux'
import {addSearch} from '../redux/searchSlice.js'
import LogoSearch from '../assets/search_FILL0_wght400_GRAD0_opsz24.svg'
import LogoCloseSearch from '../assets/close_FILL0_wght400_GRAD0_opsz24.svg'
import {fetching} from '../services/fetching.js'
import {CATALOGUEURL} from '../utils/urls.js'
import {addContent} from '../redux/contentSlice'

export const Search = () => {
  const dispatch = useDispatch()
  const search = useSelector(state => state.search)

  const handleChange = e => {
    dispatch(addSearch(e.target.value))
  }

  const handleClick = () => {
    dispatch(addSearch(''))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const url = CATALOGUEURL + '?search=' + search

    fetching(url)
      .then(data => dispatch(addContent(data)))
  }

  return (
    <form action="" className='sm:w-1/2' onSubmit={handleSubmit}>
      <div className='flex relative border-2 border-solid border-slate-800 w-full justify-between rounded-2xl'>
        <div className='rounded-2xl outline-none basis-5/6 lg:basis-11/12 min-w-0 relative flex justify-end items-center'>
          <input 
            type="text" 
            name="search" 
            id="search" 
            onChange={handleChange} 
            value={search} 
            className='rounded-2xl w-full outline-none min-w-0 py-2 pl-2'
            placeholder='Buscar'
          />
          {search && <button type='button' className='absolute z-10 bg-white' onClick={handleClick}>
            <img src={LogoCloseSearch} alt="" />
          </button>}
        </div>
        <button type='submit' className='basis-1/6 lg:basis-1/12 flex justify-center items-center py-2'>
          <img src={LogoSearch} alt="" />
        </button>
      </div>
    </form>
  )
}