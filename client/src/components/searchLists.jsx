import { useEffect, useState } from "react"
import { SEARCHLISTURL, GENDERSLISTURL, ACTORSLISTURL } from "../utils/urls"
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux"
import { useSearchParams } from 'react-router-dom';

const SearchList = () => {
  const categorys = useSelector(state => state.categorys)
  const [trendingSearchsList, setTrendingSearchsList] = useState([])
  const [gendersList, setGenderList] = useState([])
  const [actorsList, setActorsList] = useState([])
  const [params, setParams] = useSearchParams()
  const querySearch = new URLSearchParams(location.search).get("s")
  const queryGender = params.get("g") ? params.get("g").split(" ") : []
  const queryActor = params.get("a") ? params.get("a").split(" ") : []
  const queryCategory = new URLSearchParams(location.search).get("c")

  useEffect(() => {
    const getLists = async () => {
      const resTrendingSearchsList = await fetch(SEARCHLISTURL)
      const dataTrendingSearchsList = await resTrendingSearchsList.json()
      setTrendingSearchsList(dataTrendingSearchsList)

      const resGendersList = await fetch(GENDERSLISTURL)
      const dataGendersList = await resGendersList.json()
      setGenderList(dataGendersList)

      const resActorsList = await fetch(ACTORSLISTURL)
      const dataresActorsList = await resActorsList.json()
      setActorsList(dataresActorsList)

    }

    getLists()

  }, [])


  return (
    <div className="w-4/5 md:w-full gap-5 xl:space-y-8 md:space-y-0 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1">
      <div>
        <h1 className="border-b border-solid border-slate-700">Busquedas en Tendencia</h1>
        <ul className="p-2">
          {
            trendingSearchsList.map(e => (
              <li key={e.id}>
                <Link to={'/search?s=' + e.search_text} className="text-blue-700">{e.search_text}</Link>
              </li>
            ))
          }
        </ul>
      </div>

      <div>
        <h1 className="border-b border-solid border-slate-700">Generos</h1>
        <ul className="p-2 py-4 flex gap-2 flex-wrap">
          {
            gendersList.map(e => (
              <li key={e.id} className="min-w-max">
                <Link 
                  to={
                    !queryGender.includes(e.id.toString())
                    ? queryGender.length > 0
                      ? `/search?g=${queryGender.join("+")}+${e.id}` 
                      : `/search?g=${e.id}`
                    : queryGender.includes(e.id.toString())
                      ? queryGender.length > 1
                        ? `/search?g=${queryGender.filter(item => item != e.id).join("+")}`
                        : `/search`
                      : `/search?g=${queryGender.toString()}`
                  } 
                  className={`bg-slate-200 px-2 py-1 rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-200 ${queryGender.includes(e.id.toString()) ? "bg-slate-900 text-white" : " "}`}>
                    {e.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>

      <div>
        <h1 className="border-b border-solid border-slate-700">Actores</h1>
        <ul className="p-2 py-4 flex gap-2 flex-wrap">
          {
            actorsList.map(e => (
              <li key={e.id} className="min-w-max">
                <Link 
                  to={
                    !queryActor.includes(e.id.toString())
                    ? queryActor.length > 0
                      ? `/search?a=${queryActor.join("+")}+${e.id}` 
                      : `/search?a=${e.id}`
                    : queryActor.includes(e.id.toString())
                      ? queryActor.length > 1
                        ? `/search?a=${queryActor.filter(item => item != e.id).join("+")}`
                        : `/search`
                      : `/search?a=${queryActor.toString()}`
                    } 
                  className={`bg-slate-200 px-2 py-1 rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-200 ${queryActor.includes(e.id.toString()) ? "bg-slate-900 text-white" : " "}`}>
                    {e.full_name}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>

      <div>
        <h1 className='border-b border-solid border-slate-700'>Categorias</h1>
        <ul className='p-5 xl:p-0 grid grid-cols-2 gap-2 xl:gap-1 xl:py-2'>
          {categorys.map(category => (
            <li key={category.id} className='max-w-lg'>
              <Link to={'/search?c=' + category.id} className='rounded-lg w-full relative flex justify-center items-center'>
                <img src={category.photo} alt="" className='rounded-lg object-contain'/>
                <span className='backdrop-blur-sm absolute font-semibold text-lg text-white p-2 rounded-3xl'>{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SearchList