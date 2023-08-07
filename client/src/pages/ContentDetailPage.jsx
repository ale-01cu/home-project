import { useEffect, useState } from "react"
import { fetching } from '../services/fetching'
import { CATALOGUEURL } from '../utils/urls'
import {useSelector, useDispatch} from 'react-redux'
import {addContentDetail} from '../redux/contentDetailSlice.js'
import {useParams, useSearchParams, Link, useNavigate} from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'
import PlayArrowIcon from '../assets/play_arrow_FILL0_wght100_GRAD0_opsz40.svg'
import PlayArrowIconBegin from '../assets/play_arrow_FILL0_wght700_GRAD0_opsz24.svg'
import randomColor from '../services/generateColor'

export const ContentDetail = () => {
  const { id } = useParams()
  const [params] = useSearchParams()
  const videoQuery = params.get("v")
  const dispatch = useDispatch()
  const content = useSelector(state => state.contentDetail)
  const navegate = useNavigate()
  const [subtitle, setSubtitle] = useState(null)


  useEffect(() => {
      fetching(CATALOGUEURL + id + '/')
      .then(data => {
        console.log(data.subtitle);
        console.log(data);
        setSubtitle(data.subtitle)
        dispatch(addContentDetail(data))
      })
  }, [dispatch, id, navegate, videoQuery])


  return (
    <div className={`flex flex-col md:flex-row py-5 lg:px-18 xl:px-24 ${!content.seasons.length > 0 ? 'justify-center items-center' : ''}`}>
      <div className={`flex flex-col min-h-screen space-y-5 sm:basis-9/12 sm:pr-10 ${!content.seasons.length > 0 ? 'w-11/12 sm:pr-0' : ''}`}>
        {content.seasons.length > 0 && !videoQuery 
        ? (
            <div className="w-full h-full flex justify-center items-center">
              <Link to={'?v=' + content.seasons[0].chapters[0].id} className="p-5 text-2xl flex justify-center items-center gap-2 hover:scale-105 transition-all">
                <img src={PlayArrowIconBegin} alt="" width={35} height={35}/>
                <span>Ver</span>
              </Link>
            </div>
          )
        : (
            <div className="w-full">
              <VideoPlayer id={id} subtitle={subtitle}/>
            </div>
          )
        }

        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col p-7 sm:p-2 basis-4/5 space-y-6 relative sm:col-start-1 sm:col-end-2 sm:row-start-2 sm:row-end-3">
            
            <div className="flex flex-wrap gap-2 justify-between">
              <p className="text-2xl font-bold">{content.name}</p>
              <span className="bg-yellow-300 p-2 px-3 rounded-full text-center h-max w-max">Precio: ${content.category.price}</span>
            </div>

            <div className="flex flex-wrap">
              <div className="flex flex-col space-y-1 w-1/2 pr-1">
                <span>Categoria: {content.category.name}</span>
                <span>Formato: {content.format}</span>
                <span>Tanaño: {content.size}</span>
              </div>
              
              <div className="flex flex-col space-y-1 w-1/2 pl-1">
                <span>
                  Subtitulada: <span className={`${content.is_subtitled ? 'text-green-500': 'text-red-500'}`}>{content.is_subtitled ? 'Si' : 'No'}</span>
                </span>
                <span>
                  En Español: <span className={`${content.is_spanish ? 'text-green-500': 'text-red-500'}`}>{content.is_spanish ? 'Si' : 'No'}</span>
                </span>
                <span>
                  Plataforma: <span className={`${content.platform ? 'text-green-500': 'text-red-500'}`}>{content.platform ? content.platform : 'No'}</span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span>Pais: {content.countrie}</span>
              {
                content.release_date 
                  ? <span>Fecha de Estreno: {content.release_date}</span>
                  : <span>Año de Estreno: {content.release_year}</span>
              }
              
              <div>
                <span>Descripcion:</span>
                <br />
                <p className="p-2">{content.description}</p>
              </div>
            </div>

            <div id="genders" className="flex flex-col text-slate-800 rounded-lg">
              Generos:
              <div className="flex flex-wrap gap-1">
                {content.genders.map(gender => (
                  <span key={gender.id} className={"rounded-lg align-middle text-sm font-medium py-1 px-2 " + randomColor()} id="genders-cards">{gender.name} </span>
                ))}
              </div>
            </div>  
            <div id="actors" className="flex flex-col text-slate-800 rounded-lg">
              Actores:
                <div className="flex flex-wrap gap-1">
                  {content.actors.map(actor => (
                    <span key={actor.id} className={"rounded-lg align-middle text-sm font-medium py-1 px-2 " + randomColor()} id="genders-cards">{actor.full_name} </span>
                  ))}
                </div>
            </div>
          </div>

          <ul className={`p-2 w-full grid gap-1 place-content-center sm:place-content-start sm:place-items-end sm:col-start-2 sm:col-end-3 sm:row-start-2 sm:row-end-3 ${content.images.length == 0 ? 'lg:grid-cols-1 sm:grid-cols-1 place-items-center' : 'grid-cols-2 lg:grid-cols-3'}`}>
            <li className="max-w-xs sm:max-w-max"><img src={content.photo} alt="" className="h-full object-cover"/></li>
            {content.images.map(i => (
              <li key={i.id} className="max-w-xs">
                <img src={i.image} alt="" className="h-full object-cover rounded-2xl"/>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {
        content.seasons.length > 0 && (
          <div className="sm:basis-3/12 py-3">
            
              <ul className="space-y-5">
                {content.seasons.map(season => (

                  <li key={season.id}>
                    <ul className="flex flex-col">
                      <h3 className="text-lg font-bold">Temporada: {season.number}</h3>
                      {season.chapters.map(chapter => (

                        <li key={chapter.id} className={`hover:bg-slate-200 hover:text-slate-500 m-1 p-2 flex transition-all duration-200 ${videoQuery == chapter.id ? 'bg-slate-200 text-slate-500' : ''}`}>
                          <Link to={`?v=${chapter.id}`} className="w-full flex space-x-2 items-center">
                            <img src={PlayArrowIcon} width={30} height={30} alt="" />
                            <span className="w-full">{chapter.name}</span>
                          </Link>
                        </li>

                      ))}
                    </ul>
                  </li>

                ))}
              </ul>
          </div>
        )
      }
    </div>
  )
}