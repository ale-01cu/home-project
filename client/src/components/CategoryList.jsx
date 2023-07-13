import {useSelector, useDispatch} from 'react-redux'
import {addCategorys} from '../redux/categorySlice.js'
import {useEffect} from 'react'
import {CATEGORYURL} from '../utils/urls.js'
import {Link} from 'react-router-dom'
import {fetching} from '../services/fetching.js'

export const CategorysList = () => {
  const dispatch = useDispatch()
  const categorys = useSelector(state => state.categorys)
  
  useEffect(() => {
    fetching(CATEGORYURL)
      .then(data => dispatch(addCategorys(data)))
    
  }, [dispatch])

  return (
    <ul className='grid grid-cols-1 p-5 gap-y-4 pb-16 justify-items-center'>
      {categorys.map(category => (
        <li key={category.id} className='max-w-lg'>
          <Link to={'/' + category.name} className='rounded-lg w-full relative flex justify-center items-center'>
            <img src={category.photo} alt="" className='rounded-lg object-contain'/>
            <span className='backdrop-blur-sm absolute font-semibold text-lg text-white p-2 rounded-3xl'>{category.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}