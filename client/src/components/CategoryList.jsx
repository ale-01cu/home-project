import {useSelector, useDispatch} from 'react-redux'
import {addCategorys} from '../redux/categorySlice.js'
import {useEffect} from 'react'
import {CATEGORYURL} from '../utils/urls.js'
import {fetching} from '../services/fetching.js'
import { HashLink as Link } from 'react-router-hash-link';

const CategorysList = () => {
  const dispatch = useDispatch()
  const categorys = useSelector(state => state.categorys)
  
  useEffect(() => {
    fetching(CATEGORYURL)
      .then(data => dispatch(addCategorys(data)))
    
  }, [dispatch])

  return (
    <div className='w-full'>
      {/* <h1 className='p-5 pl-0 text-3xl font-extrabold'>Categorias</h1> */}
      <ul className='gallery gap-y-3 gap-x-1'>
        {categorys.map(category => (
          <li key={category.id} className='max-w-lg'>
            <Link to={'/' + category.name + '#catalogue'} id='category-card-catalogue' className='rounded-lg w-full relative flex justify-center items-center transition-all'>
              <img src={category.photo} alt="" className='rounded-lg object-contain'/>
              <span className='backdrop-blur-sm absolute font-semibold text-lg text-white p-2 rounded-3xl'>{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategorysList