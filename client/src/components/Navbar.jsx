import {useEffect} from 'react'
import {CATEGORYURL} from '../utils/urls.js'
import {addCategorys} from '../redux/categorySlice.js'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

export default function NavBar(){
    const dispatch = useDispatch()
    const categorys = useSelector(state => state.categorys)

    useEffect(() => {
        fetch(CATEGORYURL)
          .then(res => res.json())
          .then(data => dispatch(addCategorys(data)))
          .catch(e => console.log(e))
    }, [])

    return (
      <nav className="">
        <svg className="icon lg:fill-white transition-all duration-300 ease-out" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M106.999 837.479V731.478h746.002v106.001H106.999Zm0-208.478V522.999h746.002v106.002H106.999Zm0-208.479V314.521h746.002v106.001H106.999Z"/></svg>
        <ul>
          <li><Link to="/">Home</Link></li>
          {categorys.map(category => (
            <li key={category.id}><Link to={'/' + category.name}>{category.name}</Link></li>
          ))}
        </ul>
      </nav>
      )
}

