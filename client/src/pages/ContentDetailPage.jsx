import { useEffect } from "react"
import { fetching } from '../services/fetching'
import { CATALOGUEURL } from '../utils/urls'
import {useSelector, useDispatch} from 'react-redux'
import {addContentDetail} from '../redux/contentDetailSlice.js'
import {useParams, Link} from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'
import PlayArrowIcon from '../assets/play_arrow_FILL0_wght700_GRAD0_opsz24.svg'

export const ContentDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const content = useSelector(state => state.contentDetail)

  useEffect(() => {
      fetching(CATALOGUEURL + id + '/')
      .then(data => {
        console.log(data);
        dispatch(addContentDetail(data))
      })
  }, [dispatch, id])


  return (
    <div className="flex flex-col md:flex-row p-2">
      <div className="flex flex-col min-h-screen space-y-5 sm:basis-4/5 p-3 sm:px-10">
        <div className="w-full">
          <VideoPlayer id={id}/>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col p-7 sm:p-2 basis-4/5 space-y-6 relative sm:col-start-1 sm:col-end-2 sm:row-start-2 sm:row-end-3">
            
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <p className="text-2xl font-bold">{content.name}</p>
              <span className="bg-yellow-300 p-2 px-3 rounded-full text-center h-max w-max justify-self-end">Precio: ${content.category.price}</span>
            </div>

            <div className="flex flex-wrap">
              <div className="flex flex-col space-y-1 w-1/2 pr-1">
                <span>Categoria: {content.category.name}</span>
                <span>Formato: {content.format}</span>
                <span>Tanaño: {content.size}</span>
              </div>
              
              <div className="flex flex-col space-y-1 w-1/2 pl-1">
                <span>
                  Subtitulada: <span className={`${content.subtitles ? 'text-green-500': 'text-red-500'}`}>{content.subtitles ? 'Si' : 'No'}</span>
                </span>
                <span>
                  En Español: <span className={`${content.spanish ? 'text-green-500': 'text-red-500'}`}>{content.spanish ? 'Si' : 'No'}</span>
                </span>
                <span>
                  Plataforma: <span className={`${content.platform ? 'text-green-500': 'text-red-500'}`}>{content.platform ? 'Si' : 'No'}</span>
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

            <div id="genders" className="text-slate-800 rounded-lg space-x-1">
              Generos: <br />
              {content.genders.map(gender => (
                <span key={gender.id} className="rounded-lg align-middle text-sm font-medium py-1 px-2 bg-slate-300 mb-1" id="genders-cards">{gender.name} </span>
              ))}
            </div>  
            <div id="actors" className="text-slate-800 rounded-lg space-x-1">
              Actores: <br />
              {content.actors.map(actor => (
                <span key={actor.id} className="rounded-lg align-middle text-sm font-medium py-1 px-2 bg-slate-300 mb-1" id="genders-cards">{actor.full_name} </span>
              ))}
            </div>
          </div>

          <ul className={`p-2 w-full grid gap-1 place-content-center sm:place-content-start sm:col-start-2 sm:col-end-3 sm:row-start-2 sm:row-end-3 ${content.images.length == 0 ? 'lg:grid-cols-1 sm:grid-cols-1 place-items-center' : 'grid-cols-2 lg:grid-cols-3'}`}>
            <li className="max-w-xs sm:max-w-max"><img src={content.photo} alt="" className="h-full object-cover"/></li>
            {content.images.map(i => (
              <li key={i.id} className="max-w-xs">
                <img src={i.image} alt="" className="h-full object-cover rounded-2xl"/>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="sm:basis-1/5 py-3">
        {
          content.seasons && (
            <ul className="space-y-5">
              {content.seasons.map(season => (

                <li key={season.id}>
                  <ul className="flex flex-col">
                    <h3 className="text-lg font-bold ml-2">Temporada: {season.number}</h3>
                    {season.chapters.map(chapter => (

                      <li key={chapter.id} className="hover:bg-slate-200 hover:text-slate-500 m-1 p-2 flex transition-all duration-200">
                        <Link to={`?v=${chapter.id}`} className="w-full flex space-x-2">
                          <img src={PlayArrowIcon} alt="" />
                          <span className="w-full">{chapter.name}</span>
                        </Link>
                      </li>

                    ))}
                  </ul>
                </li>

              ))}
            </ul>
          )
        }
      </div>
    </div>
  )
}