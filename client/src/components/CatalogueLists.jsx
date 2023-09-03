import { useEffect, useState } from "react"
import {CATALOGUECUSTOMLISTSURL, CATALOGUENEWCONTENTLISTSURL} from '../utils/urls'
import CatalogueCard from './CatalogueCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar } from 'swiper/modules';
import ListsIcon from '../assets/lists_FILL0_wght100_GRAD0_opsz24.svg'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';


const ButtonShowMore = ({list, isVisibleList, setIsVisibleList, id = null}) => {
  let classNameButtonShowMore = 'text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-2 py-1 text-center'

  if (list.length > 0 && list.length <= 5) {
    classNameButtonShowMore = classNameButtonShowMore.concat(' hidden')
  
  }else if (list.length > 5 && list.length <= 6) {
    classNameButtonShowMore = classNameButtonShowMore.concat(' lg:hidden')

  }else if (list.length > 6 && list.length <= 7) {
    classNameButtonShowMore = classNameButtonShowMore.concat(' xl:hidden')

  }else if (list.length > 7 && list.length <= 8) {
    classNameButtonShowMore = classNameButtonShowMore.concat(' 2xl:hidden')
    
  }else {
    classNameButtonShowMore = classNameButtonShowMore.concat('')
  }

  return (
    <button 
      onClick={() => {
        if (id) {
          const isVisibleListUpdated = {...isVisibleList}
          isVisibleListUpdated[id] = !isVisibleList[id]
          setIsVisibleList(isVisibleListUpdated)
        
        }else {
          setIsVisibleList(!isVisibleList)
        }
      }} 
      type="button" 
      className={classNameButtonShowMore}
      >
        {
          isVisibleList[id] 
          ? 'Ver Menos'
          : 'Ver Mas'
        }
          
    </button>
    )
}


const CatalogueLists = () => {
  const [customLists, setCustomLists] = useState([])
  const [newContentList, setNewContentList] = useState([])
  const [isVisibleList, setIsVisibleList] = useState({})
  const [isVisibleNewContentList, setIsVisibleNewContentList] = useState(false)

  useEffect(() => {
    fetch(CATALOGUENEWCONTENTLISTSURL)
    .then(res => res.json())
    .then(data => {
      setNewContentList(data)
    })
    .catch(e => console.error(e))
  }, [])

  useEffect(() => {
    fetch(CATALOGUECUSTOMLISTSURL)
    .then(res => res.json())
    .then(data => {
      const aux = {}
      
      data.forEach(e => {
        aux[e.id] = false
      })

      setCustomLists(data)
      setIsVisibleList(aux)
    })
    .catch(e => console.error(e))

  }, [])

  const breakpoints = {
    0: {
      slidesPerView: 1.2,
      spaceBetween: 5,
    },
    420: {
      slidesPerView: 2.2,
      spaceBetween: 5,
    },
    640: {
      slidesPerView: 2.2,
      spaceBetween: 10,
    },
    715: {
      slidesPerView: 3.2,
      spaceBetween: 10,
    },
    1280: {
      slidesPerView: 3.2,
      spaceBetween: 10,
    },
    1536: {
      slidesPerView: 4.2,
      spaceBetween: 10,
    },
  }

  return (
    (customLists.length > 0 || newContentList.length > 0)  &&
    <div className="">
      <h1 className="p-2 pl-0 sm:p-10 sm:pl-0 text-3xl font-extrabold text-center">Listas</h1>

      {/* Estos son las listas para resolucion movile */}

      {/* <h1 className="p-5 pl-0 text-3xl font-extrabold">Listas</h1> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-10 lg:hidden">
        {
          customLists.length > 0 &&
            customLists.map(list => (
              <div key={list.id} className="w-full">
                <div className="p-5 pl-0 flex justify-end items-center max-w-max gap-x-2">
                  <img src={ListsIcon} alt="" />
                  <h1 className="text-xl font-medium max-w-max">{list.name}</h1>
                </div>
                <ul>
                  <Swiper
                    spaceBetween={10}
                    freeMode={true}
                    scrollbar={{
                      hide: true,
                      draggable: true,
                    }}
                    mousewheel={{
                      invert: false,
                      sensitivity: 0.3,
                    }}
                    modules={[FreeMode, Scrollbar]}
                    breakpoints={breakpoints}
                    className="mySwiper max-w-full"
                  >
                    {
                      list.custom_list_items.map(content => (
                        <SwiperSlide key={content.content.id} className="">
                          <li>
                            <CatalogueCard content={content.content}/>
                          </li>
                        </SwiperSlide>
                      ))
                    }
                  </Swiper>
                </ul>
              </div>
            ))
        }
        {
          newContentList.length > 0 &&
          <div>
            <div className="p-5 pl-0 flex justify-end items-center max-w-max gap-x-2 lg:hidden">
              <img src={ListsIcon} alt="" />
              <h1 className="text-xl font-medium max-w-max">Nuevo contenido de la semana</h1>
            </div>
            <Swiper
              spaceBetween={10}
              freeMode={true}
              scrollbar={{
                hide: true,
                draggable: true,
              }}
              mousewheel={{
                invert: false,
                sensitivity: 0.3,
              }}
              modules={[FreeMode, Scrollbar]}
              breakpoints={breakpoints}
              className="mySwiper max-w-full"
              >
              {
                newContentList.map(content => (
                  <SwiperSlide key={content.id} className="">
                    <li>
                      <CatalogueCard content={content}/>
                    </li>
                  </SwiperSlide>
                ))
              }

            </Swiper>
          </div>
        }

      </div>

      {/* Estas son las listas para resoluciones grandes */}
      <div className="hidden lg:flex lg:flex-col">
        {
          customLists.length > 0 &&
            customLists.map(list => {
              return <div key={list.id} className="w-full border-t-2 border-solid border-slate-300">
                <div className="p-5 pl-0 flex items-center gap-x-2">
                  <img src={ListsIcon} alt="" />
                  <h1 className="text-xl font-medium">{list.name}</h1>
                  <ButtonShowMore
                    list={list.custom_list_items}
                    isVisibleList={isVisibleList}
                    setIsVisibleList={setIsVisibleList}
                    id={list.id}  
                  />
                </div>
                <ul className="grid grid-flow-row lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9 grid-rows-1 gap-x-1">
                  {
                    list.custom_list_items.map((content, i) => {
                      if (i >= 0 && i <= 5 ) {
                        return <li key={content.id} className="">
                          <CatalogueCard content={content.content}/>
                        </li>
                        
                      }else if (i > 5 && i < 7) {
                        return <li key={content.id} className={`${!isVisibleList[list.id] && 'hidden'} xl:block`}>
                          <CatalogueCard content={content.content}/>
                        </li>

                      }else if(i >= 7 && i <= 8) {
                        return <li key={content.id} className={`${!isVisibleList[list.id] && 'hidden'} 2xl:block`}>
                          <CatalogueCard content={content.content}/>
                        </li>
                      
                      }else {
                        return <li key={content.id} className={`${!isVisibleList[list.id] && 'hidden'}`}>
                          <CatalogueCard content={content.content}/>
                        </li>
                      }
                    })
                  }
                </ul>
              </div>
            })
          }
          {
            newContentList.length > 0 &&
            <div className="hidden lg:flex lg:flex-col border-y-2 border-solid border-slate-300">
              <div className="p-5 pl-0 flex items-center gap-x-2">
                <img src={ListsIcon} alt="" />
                <h1 className="text-xl font-medium">Nuevo contenido de la semana</h1>
                <ButtonShowMore
                  list={newContentList}
                  isVisibleList={isVisibleNewContentList}
                  setIsVisibleList={setIsVisibleNewContentList}
                />
              </div>
                <ul className="grid lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9 gap-x-1">
                  {
                    newContentList.map((content, i) => {
                      if (i >= 0 && i <= 5 ) {
                        return <li key={content.id} className="">
                          <CatalogueCard content={content}/>
                        </li>
                        
                      }else if (i > 5 && i < 7) {
                        return <li key={content.id} className={`${!isVisibleNewContentList && 'hidden'} xl:block`}>
                          <CatalogueCard content={content}/>
                        </li>

                      }else if(i >= 7 && i <= 8) {
                        return <li key={content.id} className={`${!isVisibleNewContentList && 'hidden'} 2xl:block`}>
                          <CatalogueCard content={content}/>
                        </li>
                      
                      }else {
                        return <li key={content.id} className={`${!isVisibleNewContentList && 'hidden'}`}>
                          <CatalogueCard content={content}/>
                        </li>
                      }

                    })
                  }
                </ul>
            </div>
        
           }
      </div>

    </div>
    
  )
}

export default CatalogueLists