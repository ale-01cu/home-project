import { useEffect, useState } from "react"
import {CATALOGUECUSTOMLISTSURL, CATALOGUENEWCONTENTLISTSURL} from '../utils/urls'
import CatalogueCard from './CatalogueCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Scrollbar } from 'swiper/modules';
import ListsIcon from '../assets/lists_FILL0_wght100_GRAD0_opsz24.svg'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';


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
      {/* <h1 className="p-5 pl-0 text-3xl font-extrabold">Listas</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10">
        {
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
        <div>
          <div className="p-5 pl-0 flex justify-end items-center max-w-max gap-x-2">
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

      </div>
    </div>
    
  )
}

export default CatalogueLists