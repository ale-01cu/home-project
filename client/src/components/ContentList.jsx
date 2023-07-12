import {useEffect, useMemo} from 'react'
import {CATALOGUEURL} from '../utils/urls.js'
import {useSelector, useDispatch} from 'react-redux'
import {addContent} from '../redux/contentSlice.js'
import {useParams, Link} from 'react-router-dom'
import { InfiniteScroll } from 'react-simple-infinite-scroll'

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

    const loadMore = () => {
      console.log("pididendo mas datos");
      const url = content.next
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          dispatch(addContent(data))
        })
        .catch(e => console.log(e))
    }

    return (
      <ul className='min-h-screen'>
        <InfiniteScroll
          throttle={100}
          threshold={100}
          hasMore={content.next ? true : false}
          onLoadMore={loadMore}
        >
          {content.results.map(content => {
            console.log(content.name);
            return <li key={content.id} className=''>
              <Link to={CATALOGUEURL + content.id + '/'} className='px-10 py-20 border border-gray-500 border-solid block'>
                {content.name}
              </Link>
            </li>
          })}
        </InfiniteScroll>
      </ul>
    )
}