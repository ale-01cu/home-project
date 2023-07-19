import { useEffect, useState } from "react"
import { SEARCHLISTURL, GENDERSLISTURL, ACTORSLISTURL } from "../utils/urls"
import {Link} from 'react-router-dom'

const SearchList = () => {
  const [trendingSearchsList, setTrendingSearchsList] = useState([])
  const [gendersList, setGenderList] = useState([])
  const [actorsList, setActorsList] = useState([])

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
    <div className="w-4/5 md:w-full gap-5 space-y-8 md:space-y-0 flex flex-col md:flex-row xl:flex-col">
      <div>
        <h1 className="border-b border-solid border-slate-700">Busquedas en Tendencia</h1>
        <ul className="p-2">
          {
            trendingSearchsList.map(e => (
              <li key={e.id}>
                <Link to={'/search?q=' + e.search_text} className="text-blue-700">{e.search_text}</Link>
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
                <Link to={'/search?q=' + e.name} className="bg-slate-200 px-2 py-1 rounded-xl hover:bg-inherit transition-all duration-200">{e.name}</Link>
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
                <Link to={'/search?q=' + e.full_name} className="bg-slate-200 px-2 py-1 rounded-xl hover:bg-inherit transition-all duration-200">{e.full_name}</Link>
              </li>
            ))
          }
        </ul>
      </div>

    </div>
  )
}

export default SearchList