import {useEffect} from 'react'
import {CATALOGUEURL} from '../utils/urls.js'
import {useSelector, useDispatch} from 'react-redux'
import {addContent} from '../redux/contentSlice.js'
import {useParams, Link} from 'react-router-dom'

export const ContentList = () => {
    const { category } = useParams()
    const dispatch = useDispatch()
    const content = useSelector(state => state.content)

    useEffect(() => {
        const url = category 
        ? CATALOGUEURL + '?category__name=' + category 
        : CATALOGUEURL

        fetch(url)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            dispatch(addContent(data))
          })
          .catch(e => console.log(e))

    }, [category])

    return (
      <ul>
        {content.results.map(content => (
          <li key={content.id}>
            <Link to={CATALOGUEURL + content.id + '/'}>
              {content.name}
            </Link>
          </li>
        ))}
        
      </ul>
    )
}