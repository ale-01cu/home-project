import {useEffect, useRef, useState, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { InfiniteScroll } from 'react-simple-infinite-scroll'
import COLORS from '../utils/colors.js'

export const ContentList = ({content, updateContent}) => {
    const dispatch = useDispatch()
    const refViewFinder = useRef()
    const [isViewFinder, setIsViewFinder] = useState(false)


    const loadMore = useCallback(() => {
      const url = content.next

      if (url) {
        fetch(url)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            dispatch(updateContent(data))
          })
          .catch(e => console.log(e))

      }

    }, [dispatch, content.next])


    const onChange = useCallback((entries, observer) => {
      const el = entries[0]
      if (el.isIntersecting) {
        const url = content.next
        fetch(url)
          .then(res => res.json())
          .then(data => {
            dispatch(updateContent(data))
          })
          .catch(e => console.log(e))
      } else{
        setIsViewFinder(true)
      }
      observer.disconnect()

    }, [dispatch, content.next])

    
    useEffect(() => {
      let observer
      const element = refViewFinder.current
      
      if (!isViewFinder && content.next) {
        Promise.resolve(
          typeof IntersectionObserver !== 'undefined'
            ? IntersectionObserver
            : import('intersection-observer')
    
        ).then(() => {
          observer = new IntersectionObserver(onChange, {
            rootMargin: '0px'
          })
      
          if (element) observer.observe(element)
        })
      }

    }, [content.next, isViewFinder, dispatch, onChange])

    const randomColor = () => {
      const randomIndex = Math.floor(Math.random() * COLORS.length);
      const randomElement = COLORS[randomIndex];
      return randomElement
    }

    return (
      <InfiniteScroll
        throttle={100}
        isLoading={false}
        threshold={100}
        hasMore={content.next ? true : false}
        onLoadMore={loadMore}
      >

        <ul className='
          relative w-full h-max grid gap-x-1 gap-y-5 sm:gap-y-5
          p-5 mn:px-10 sm:p-14 sm:pl-0 justify-center grid-cols-2
          sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
          2xl:grid-cols-6 3xl:grid-cols-7'
        >

          {content.results.map(content => {
            return <li key={content.id} className=''>
              <Link id='card' to={'/detail/' + content.id} className='flex flex-col justify-between h-full hover:bg-gray-200 transition-all duration-150 min-h-max'>
                <div id="poster" className="h-full overflow-hidden"><img src={content.photo} alt="" className='h-full object-cover transition-all duration-150'/></div>
                <div id="detail" className=" p-2">
                    <div className="flex justify-between">
                        {
                          content.release_year
                            ? <h3 id="release-year" className="text-slate-800">{content.release_year}</h3>
                            : <h3 id="release-year" className="text-slate-800">{content.release_date}</h3>
                        }
                        <h3 id="price" className="text-green-400">${content.category.price}</h3>
                    </div>
                    <h2 id="name" className="text-slate-800 rounded-lg font-medium w-full whitespace-nowrap text-ellipsis overflow-hidden">{content.name}</h2>

                    <div id="genders" className="text-slate-800 rounded-lg whitespace-nowrap text-ellipsis overflow-hidden space-x-1">
                        {content.genders.map(gender => (
                          <span key={gender.id} className={"rounded-lg align-middle text-sm font-medium px-2 text-center " + randomColor()} id="genders-cards">{gender.name} </span>
                        ))}
                    </div>
                </div>
              </Link>
            </li>
          })}
          <div id='viewfinder' ref={refViewFinder}></div>
        </ul>
      </InfiniteScroll>
      
    )
}