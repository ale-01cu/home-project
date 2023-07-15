import {useEffect, useRef, useState, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {updateContent} from '../redux/contentSlice.js'
import {Link} from 'react-router-dom'
import { InfiniteScroll } from 'react-simple-infinite-scroll'

export const ContentList = () => {
    // const { category } = useParams()
    const dispatch = useDispatch()
    const content = useSelector(state => state.content)
    const refViewFinder = useRef()
    const [isViewFinder, setIsViewFinder] = useState(false)

    // useEffect(() => {
    //   const url = category 
    //   ? CATALOGUEURL + '?category__name=' + category 
    //   : CATALOGUEURL

    //   fetch(url)
    //     .then(res => res.json())
    //     .then(data => {
    //       console.log(data);
    //       dispatch(addContent(data))
    //     })
    //     .catch(e => console.log(e))

    // }, [dispatch, category])

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

    
    useEffect(() => {
      let observer
      const element = refViewFinder.current
  
      const onChange = (entries, observer) => {
        const el = entries[0]
        if (el.isIntersecting) {
          console.log("Se esta viendo el visor");
          const url = content.next
          console.log("url de fetchhhhhh: " + url);
          fetch(url)
            .then(res => res.json())
            .then(data => {
              console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
              dispatch(updateContent(data))
            })
            .catch(e => console.log(e))
        } else{
          console.log("Ya no se esta viendo el visor");
          setIsViewFinder(true)
        }

        observer.disconnect()
      }

      let cont = 0
      
      if (!isViewFinder && content.next) {
        console.log("nexttttttt: " + content.next);
        console.log("Esta talla se ejecuta: " + cont++);
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

    }, [content.next, isViewFinder, dispatch])

    return (
      <InfiniteScroll
        throttle={100}
        isLoading={false}
        threshold={100}
        hasMore={content.next ? true : false}
        onLoadMore={loadMore}
      >

        <ul className='
          relative w-full h-max grid gap-x-2 gap-y-12 sm:gap-y-5
          p-5 mn:px-10 sm:p-14 sm:pl-0 justify-center grid-cols-2
          sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
          2xl:grid-cols-7 3xl:grid-cols-8'
        >

          {content.results.map(content => {
            console.log(content.name);
            return <li key={content.id} className=''>
              <Link to={'/detail/' + content.id} className='relative flex flex-col h-full'>
                <div id="poster" className="h-4/5"><img src={content.photo} alt="" className='h-full object-cover'/></div>
                <div id="detail" className="h-1/5 p-1">
                    <div className="flex justify-between">
                        <h3 id="release-year" className="text-slate-800">{content.release_year}</h3>
                        <h3 id="price" className="text-green-400">${content.category.price}</h3>
                    </div>
                    <h2 id="name" className="text-slate-800 rounded-lg font-medium w-full whitespace-nowrap text-ellipsis overflow-hidden">{content.name}</h2>

                    <div id="genders" className="text-slate-800 rounded-lg whitespace-nowrap text-ellipsis overflow-hidden space-x-1">
                        {content.genders.map(gender => (
                          <span key={gender.id} className="rounded-lg align-middle text-sm font-medium px-2 text-center bg-slate-300" id="genders-cards">{gender.name} </span>
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