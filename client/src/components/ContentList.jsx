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
              gap-x-2
              gap-y-3
              p-8
              mn:px-10
              sm:py-8
              sm:pl-0
              justify-center
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              xl:grid-cols-6
              2xl:grid-cols-7
              3xl:grid-cols-8'
          >

          {content.results.map(content => {
              console.log(content.name);
              return <li key={content.id} className=''>
                <Link to={CATALOGUEURL + content.id + '/'} className='relative flex flex-col h-full'>
                  <div id="poster" className="h-4/5"><img src={content.photo} alt="" className='h-full object-cover'/></div>
                  <div id="detail" className="h-1/5 relative p-1">
                      <div className="flex justify-between">
                          <h3 id="release-year" className="text-slate-800">{content.release_year}</h3>
                          <h3 id="price" className="text-green-400">${content.category.price}</h3>
                      </div>
                      <h2 id="name" className="text-slate-800 rounded-lg font-medium w-full whitespace-nowrap text-ellipsis overflow-hidden">{content.name}</h2>

                      <div id="genders" className="text-slate-800 rounded-lg whitespace-nowrap text-ellipsis overflow-hidden space-x-1">
                          {content.genders.map(gender => (
                            <span key={gender.id} className="rounded-lg align-middle text-sm font-medium px-1 bg-slate-300" id="genders-cards">{gender.name} </span>
                          ))}
                      </div>
                  </div>
                </Link>
              </li>
          })}
        </ul>
    </InfiniteScroll>
      
    )
}