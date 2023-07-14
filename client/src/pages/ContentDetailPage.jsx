import { useEffect } from "react"
import { fetching } from '../services/fetching'
import { CATALOGUEURL } from '../utils/urls'
import {useSelector, useDispatch} from 'react-redux'
import {addContentDetail} from '../redux/contentDetailSlice.js'
import {useParams} from 'react-router-dom'

export const ContentDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const content = useSelector(state => state.contentDetail)

  useEffect(() => {
      fetching(CATALOGUEURL + id + '/')
      .then(data => dispatch(addContentDetail(data)))
  }, [dispatch, id])

  console.log(content);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col sm:flex-row p-10">
        <div className=""><img src={content.photo} alt="" className="lg:h-5/6 rounded-lg object-fill"/></div>
        <div className="flex flex-col p-5 space-y-3">
          <span>{content.name}</span>
          <span>Categoria: {content.category}</span>
          <span>Formato: {content.format}</span>
          <span>Tanaño: {content.size}</span>
          <span>Pais: {content.countrie}</span>
          <span>Subtitulada: {content.subtitles ? 'Si' : 'No'}</span>
          <span>En Español: {content.spanish ? 'Si' : 'No'}</span>
          {
            content.release_date 
              ? <span>Fecha de Estreno: {content.release_date}</span>
              : <span>Año de Estreno: {content.release_year}</span>
          }
          
          <span>Descripcion: <br />{content.description}</span>
          <span>${content.price}</span>
          <div>
            Actores: <br />
            {content.actors.map(actor => (
              <span key={actor.id} className="rounded-lg align-middle text-sm font-medium py-1 px-2 bg-slate-300" id="genders-cards">{actor.name} </span>
            ))}
          </div>
          <div id="genders" className="text-slate-800 rounded-lg whitespace-nowrap text-ellipsis overflow-hidden space-x-1">
              Generos: <br />
              {content.genders.map(gender => (
                <span key={gender.id} className="rounded-lg align-middle text-sm font-medium py-1 px-2 bg-slate-300" id="genders-cards">{gender.name} </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}