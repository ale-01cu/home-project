import { useEffect, useState } from "react"
import {CATALOGUECUSTOMLISTSURL, CATALOGUENEWCONTENTLISTSURL} from '../utils/urls'
import CatalogueCard from './CatalogueCard'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

// import required modules
import { FreeMode, Mousewheel, Scrollbar } from 'swiper/modules';

const CatalogueLists = () => {
  const [customLists, setCustomLists] = useState([])
  const [newContentList, setNewContentList] = useState([])

  useEffect(() => {
    fetch(CATALOGUENEWCONTENTLISTSURL)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setNewContentList(data)
    })
    .catch(e => console.error(e))
  }, [])

  useEffect(() => {
    fetch(CATALOGUECUSTOMLISTSURL)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setCustomLists(data)
    })
    .catch(e => console.error(e))

  }, [])

  return (
    (customLists.length > 0 || newContentList.length > 0)  &&
    <div className="">
      <h1 className="p-5 pl-0 text-3xl font-extrabold">Listas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10">
        {
          customLists.map(list => (
            <div key={list.id} className="w-full">
              <div className="p-5 pl-0">
                <h1 className="text-lg max-w-max  border-b border-solid border-slate-500">{list.name}</h1>
              </div>
              <ul>
                <Swiper
                  slidesPerView={4}
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
                  modules={[FreeMode, Scrollbar, Mousewheel]}
                  breakpoints={{
                    0: {
                      slidesPerView: 1.5,
                      spaceBetween: 5,
                    },
                    640: {
                      slidesPerView: 1.5,
                      spaceBetween: 10,
                    },
                    1280: {
                      slidesPerView: 3.5,
                      spaceBetween: 10,
                    },
                    1536: {
                      slidesPerView: 3.5,
                      spaceBetween: 10,
                    },
                  }}
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
        <div>
          <div className="p-5 pl-0">
            <h1 className="text-lg max-w-max  border-b border-solid border-slate-500">Nuevo Contenido de la semana</h1>
          </div>
          <Swiper
            slidesPerView={4}
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
            modules={[FreeMode, Scrollbar, Mousewheel]}
            breakpoints={{
              0: {
                slidesPerView: 1.5,
                spaceBetween: 5,
              },
              640: {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 3.5,
                spaceBetween: 10,
              },
              1536: {
                slidesPerView: 3.5,
                spaceBetween: 10,
              },
            }}
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

      </div>
    </div>
    
  )
}

export default CatalogueLists