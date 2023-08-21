import { useEffect, useState, useMemo } from "react"
import { SEARCHLISTURL, GENDERSLISTURL, ACTORSLISTURL } from "../utils/urls"
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux"
import { useSearchParams, useLocation } from 'react-router-dom';
import LogoSearch from '../assets/search_FILL0_wght400_GRAD0_opsz24.svg'
import CategoryList from './CategoryList'

const SearchList = () => {
  const categorys = useSelector(state => state.categorys)
  const [trendingSearchsList, setTrendingSearchsList] = useState([])
  const [gendersList, setGenderList] = useState([])
  const [actorsList, setActorsList] = useState([])
  const [categoryHover, setCategoryHover] = useState({
    name: '',
    state: false
  })
  const [params] = useSearchParams()
  const location = useLocation()
  const queryGender = useMemo(() => params.get("g") === null ? [] : params.getAll("g"), [params]) 
  const queryActor = useMemo(() => params.get("a") === null ? [] : params.getAll("a"), [params]) 
  const queryCategory = params.get("c") === null ? "" : params.get("c")

  useEffect(() => {
    const getLists = async () => {
      const resTrendingSearchsList = await fetch(SEARCHLISTURL)
      const dataTrendingSearchsList = await resTrendingSearchsList.json()
      setTrendingSearchsList(dataTrendingSearchsList)
    }
    getLists()

  }, [])
  useEffect(() => {
    const getLists = async () => {
      const resGendersList = await fetch(GENDERSLISTURL)
      const dataGendersList = await resGendersList.json()
      setGenderList(dataGendersList)
    }
    getLists()

  }, [])
  useEffect(() => {
    const getLists = async () => {
      const resActorsList = await fetch(ACTORSLISTURL)
      const dataresActorsList = await resActorsList.json()
      setActorsList(dataresActorsList)
    }
    getLists()

  }, [])



  function buildURL(queryParams, text, query) {
    const params = new URLSearchParams(location.search);
    params.delete('s');

    if (text in queryParams) {
      params.delete(query, text);
    } else {
      if (!params.getAll(query).includes(text)) {
        params.append(query, text);
      } else {
        const newLocation = decodeURIComponent(location.search).replace(/\+/g, " ")
        const regex = new RegExp(`${query}=${text}(?:&|$)`, 'g');
        const newSearch = newLocation.replace(regex, '').replace(/ /g, '+');
        
        if (newSearch === '') {
          return `${location.pathname}`;
        } else {
          return `${location.pathname}${newSearch}`;
        }
      }
    }
  
    return `${location.pathname}?${params.toString()}`;
  }

  const buildURLCategorys = (name) => {
    const params = new URLSearchParams(location.search);
    params.delete('s');

    if (queryCategory) {
      if (queryCategory == name) {
        params.delete("c", name)
        return `${location.pathname}?${params.toString()}`;

      }else {
        return location.search.replace(`c=${queryCategory}`, `c=${name}`)

      }
    }else{
      if (location.search) {
        return location.search + `&c=${name}`

      }else{
        return `?c=${name}`

      }
    }
  }

  return (
    <div id="container-lists-search" className="w-4/5 md:w-full gap-5 xl:space-y-8 md:space-y-0 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1">
      {
        trendingSearchsList.length > 0 && (
        <div>
          <h1 className="text-lg text-slate-950 font-medium">Busquedas en Tendencia</h1>
          <ul className="">
            {
              trendingSearchsList.map(e => (
                <li key={e.id}>
                  <Link to={'/search?s=' + e.search_text} className="text-blue-700 hover:text-slate-900 max-w-max py-2 pr-2 transition-all duration-200 text-lg flex justify-start items-center gap-x-2">
                    <img src={LogoSearch} alt="" />
                    {e.search_text}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      
      )}

      {
        gendersList.length > 0 && (
        <div>
          <h1 className="text-lg text-slate-950 font-medium">Generos</h1>
          <ul className=" py-4 flex gap-x-2 gap-y-3 flex-wrap">
            {
              gendersList.map(e => (
                <li key={e.id} className="min-w-max">
                  <Link 
                    to={buildURL(queryGender, e.name, "g")}
                    className={`bg-slate-200 px-2 py-1 rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-200 ${queryGender.includes(e.name) ? "bg-slate-900 text-white" : " "}`}>
                      {e.name}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      )}

      {
        actorsList.length > 0 && (
        <div>
          <h1 className="text-lg text-slate-950 font-medium">Actores</h1>
          <ul className=" py-4 flex gap-x-2 gap-y-3 flex-wrap">
            {
              actorsList.map(e => (
                <li key={e.id} className="min-w-max">
                  <Link 
                    to={buildURL(queryActor, e.full_name, "a")} 
                    className={`bg-slate-200 px-2 py-1 rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-200 ${queryActor.includes(e.full_name) ? "bg-slate-900 text-white" : " "}`}>
                      {e.full_name}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      )}

      {
        categorys.length > 0 && (
        <div>
          <h1 className='text-lg text-slate-950 font-medium'>Categorias</h1>
          <ul className=' xl:p-0 grid grid-cols-2 gap-2 xl:gap-1 xl:py-2'>
            {categorys.map(category => (
              <li key={category.id} className='max-w-lg'>
                <Link 
                  onMouseOver={() => setCategoryHover({
                    name: category.name,
                    state: true
                  })}
                  onMouseLeave={() => setCategoryHover({
                    name: category.name,
                    state: false
                  })}
                  to={buildURLCategorys(category.name)} 
                  className="rounded-lg w-full relative flex justify-center items-center">
                    <img src={category.photo} alt="" className={`rounded-lg object-contain transition-all duration-100 ${queryCategory == category.name && 'blur-sm'} ${categoryHover.name === category.name && categoryHover.state ? 'blur-sm': '' }`}/>
                    <span className='w-full text-center backdrop-blur-sm absolute font-semibold text-lg text-white p-2 rounded-3xl whitespace-nowrap text-ellipsis overflow-hidden'>{category.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  )
}

export default SearchList