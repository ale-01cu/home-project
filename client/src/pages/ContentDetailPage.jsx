import { useEffect } from "react"
import { fetching } from '../services/fetching'
import { CATALOGUEURL } from '../utils/urls'
import {useSelector, useDispatch} from 'react-redux'
import {addContentDetail} from '../redux/contentDetailSlice.js'
import {useParams} from 'react-router-dom'
import COLORS from '../utils/colors'

export const ContentDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const content = useSelector(state => state.contentDetail)

  useEffect(() => {
      fetching(CATALOGUEURL + id + '/')
      .then(data => dispatch(addContentDetail(data)))
  }, [dispatch, id])

  const randomColor = () => {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    const randomElement = COLORS[randomIndex];
    return randomElement
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col sm:flex-row p-5 sm:p-10 w-4/5 justify-between items-center sm:items-start">
        <div className="lg:basis-1/5 grid ">
          <img src={content.photo} alt="" className="rounded-lg object-fill lg:max-w-sm"/>
        </div>
        <div className="flex flex-col p-5 basis-4/5">
          <span className="text-3xl font-semibold">{content.name}</span>
          <span>Categoria: {content.category.name}</span>
          <span>Formato: {content.format}</span>
          <span>Tanaño: {content.size}</span>
          <span>Pais: {content.countrie}</span>
          <span>Subtitulada: {content.subtitles ? 'Si' : 'No'}</span>
          <span>En Español: {content.spanish ? 'Si' : 'No'}</span>
          <span>Plataforma: {content.platform ? 'Si' : 'No'}</span>
          {
            content.release_date 
              ? <span>Fecha de Estreno: {content.release_date}</span>
              : <span>Año de Estreno: {content.release_year}</span>
          }
          
          <span>Descripcion: <br />{content.description}</span>
          <span>${content.category.price}</span>
          <div className="text-slate-800 rounded-lg space-x-1">
            Actores: <br />
            {content.actors.map(actor => (
              <span key={actor.id} className={"rounded-lg align-middle text-sm font-medium py-1 px-2 " + randomColor()} id="genders-cards">{actor.full_name} </span>
            ))}
          </div>
          <div id="genders" className="text-slate-800 rounded-lg space-x-1">
              Generos: <br />
              {content.genders.map(gender => (
                <span key={gender.id} className={"rounded-lg align-middle text-sm font-medium py-1 px-2 " + randomColor()} id="genders-cards">{gender.name} </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}