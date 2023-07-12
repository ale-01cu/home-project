import {useEffect, useMemo} from 'react'
import {CATALOGUEURL} from '../utils/urls.js'
import {useSelector, useDispatch} from 'react-redux'
import {addContent, updateContent} from '../redux/contentSlice.js'
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
          dispatch(updateContent(data))
        })
        .catch(e => console.log(e))
    }

    return (
      <InfiniteScroll
        throttle={100}
        isLoading={false}
        threshold={100}
        hasMore={content.next ? true : false}
        onLoadMore={loadMore}
        className='bg-red-700'
      >
        <ul className='
              relative
              w-full
              h-full
              grid
              gap-x-1
              gap-y-3
              p-8
              mn:px-10
              sm:p-5
              lg:p-8
              justify-center
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-5
              3xl:grid-cols-6'
          >

          {content.results.map(content => {
              console.log(content.name);
              return <li key={content.id} className=''>
                <Link to={CATALOGUEURL + content.id + '/'} className='px-10 py-20 border border-gray-500 border-solid block'>
                  {content.name}
                </Link>
              </li>
          })}
        </ul>
    </InfiniteScroll>
      
    )
}