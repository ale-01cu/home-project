import {useEffect, useRef, useState, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import { InfiniteScroll } from 'react-simple-infinite-scroll'
import Card from './CatalogueCard'

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



    return (
      <InfiniteScroll
        throttle={100}
        isLoading={false}
        threshold={100}
        hasMore={content.next ? true : false}
        onLoadMore={loadMore}
      >

        <ul className='
          relative 
          w-full 
          h-max 
          grid 
          gap-x-1 
          gap-y-5 
          justify-center 
          grid-cols-2
          sm:gap-y-5
          sm:grid-cols-2
          md:grid-cols-3 
          md:px-0
          lg:grid-cols-3 
          xl:grid-cols-4
          2xl:grid-cols-5 
          3xl:grid-cols-6
          '
        >

          {content.results.map(content => {
            return (
              <li key={content.id} className=''>
                <Card content={content}/>
              </li>
            )
          })}
          <div id='viewfinder' ref={refViewFinder}></div>
        </ul>
      </InfiniteScroll>
      
    )
}