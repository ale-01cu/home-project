import { useEffect, useState } from "react"
import {CATALOGUECUSTOMLISTSURL} from '../utils/urls'
import { Link } from "react-router-dom"
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
    <div className="p-16 grid grid-cols-1 sm:grid-cols-2 gap-10">
      {
        customLists.map(list => (
          <div key={list.id} className="w-full">
            <h1>{list.name}</h1>
            <ul>
              <Swiper
                slidesPerView={4}
                spaceBetween={10}
                freeMode={true}
                scrollbar={{
                  hide: false,
                  draggable: true,
                }}
                mousewheel={{
                  invert: false,
                  sensitivity: 0.3,
                }}
                modules={[FreeMode, Scrollbar, Mousewheel]}
                breakpoints={{
                  0: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  1280: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  1536: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                }}
                className="mySwiper max-w-full"
              >
                {
                  list.custom_list_items.map(content => (
                    <SwiperSlide key={content.content.id} className="">
                      <li>
                        <Link 
                          id='card' 
                          to={'/detail/' + content.content.id} 
                          className='flex flex-col justify-between h-full hover:bg-gray-200 transition-all duration-150 min-h-max'>
                            
                          <div 
                            id="poster" 
                            className="h-full overflow-hidden">
                              <img 
                                src={content.content.photo} 
                                alt="" 
                                className='h-full object-cover transition-all duration-150'/>
                          </div>

                          <div id="detail" className=" p-2">
                              <div className="flex justify-between">
                                  {
                                    content.content.release_year
                                      ? <h3 id="release-year" className="text-slate-800">{content.content.release_year}</h3>
                                      : <h3 id="release-year" className="text-slate-800">{content.content.release_date}</h3>
                                  }
                                  <h3 
                                    id="price" 
                                    className="text-green-400">
                                      ${content.content.category.price}
                                  </h3>
                              </div>
                              
                              <h2 
                                id="name" 
                                className="text-slate-800 rounded-lg font-medium w-full whitespace-nowrap text-ellipsis overflow-hidden">
                                  {content.content.name}
                                </h2>

                              <div 
                                id="genders" 
                                className="text-slate-800 rounded-lg whitespace-nowrap text-ellipsis overflow-hidden space-x-1">
                                  {content.content.genders.map(gender => (
                                    <span key={gender.id} className={"rounded-lg align-middle text-sm font-medium px-2 text-center "} id="genders-cards">{gender.name} </span>
                                  ))}
                              </div>
                          </div>
                        </Link>
                      </li>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </ul>
          </div>
        ))
      }
    </div>
  )
}

export default CatalogueLists