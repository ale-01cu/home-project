import { useEffect } from "react"
import { fetching } from '../services/fetching'
import { CATALOGUEURL } from '../utils/urls'
import {useSelector, useDispatch} from 'react-redux'
import {addContentDetail} from '../redux/contentDetailSlice.js'
import {useParams} from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'

export const ContentDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const content = useSelector(state => state.contentDetail)

  useEffect(() => {
      fetching(CATALOGUEURL + id + '/')
      .then(data => {
        dispatch(addContentDetail(data))
      })
  }, [dispatch, id])


  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex flex-col min-h-screen space-y-5 sm:basis-4/5">
        <div className="w-full p-2">
          <VideoPlayer id={id}/>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col p-7 basis-4/5 space-y-6 relative sm:col-start-2 sm:col-end-3 sm:row-start-2 sm:row-end-3">
            <span className="text-3xl font-semibold">{content.name}</span>
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

            <div className="absolute bg-yellow-300 p-2 rounded-full right-5">
              <span>${content.category.price}</span>
            </div>

            <div id="genders" className="text-slate-800 rounded-lg space-x-1">
                Generos: <br />
                {content.genders.map(gender => (
                  <span key={gender.id} className="rounded-lg align-middle text-sm font-medium py-1 px-2 bg-slate-300" id="genders-cards">{gender.name} </span>
                ))}
            </div>  
            <div className="">
              Actores: <br />
              {content.actors.map(actor => (
                <span key={actor.id} className="rounded-lg align-middle text-sm font-medium py-1 px-2 bg-slate-300" id="genders-cards">{actor.full_name} </span>
              ))}
            </div>
          </div>

          <ul className={`p-2 w-full grid grid-cols-2 lg:grid-cols-3 lg:gap-1 sm:col-start-1 sm:col-end-2 sm:row-start-2 sm:row-end-3 ${content.images.length < 3 ? 'lg:grid-cols-1 sm:grid-cols-1' : ''}`}>
            <li className="max-w-xs sm:max-w-max"><img src={content.photo} alt="" className="h-full object-cover"/></li>
            {content.images.map(i => (
              <li key={i.id} className="max-w-xs">
                <img src={i.image} alt="" className="h-full object-cover"/>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="sm:basis-1/5">
        <ul>
          <li><span>Hola buenos dias</span></li>
        </ul>
      </div>
    </div>
  )
}