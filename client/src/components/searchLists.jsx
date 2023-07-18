import { useEffect, useState } from "react"
import { SEARCHLISTURL } from "../utils/urls"
import {Link} from 'react-router-dom'

const SearchList = () => {
  const [searchList, setSearchList] = useState([])

  useEffect(() => {
    fetch(SEARCHLISTURL)
    .then(res => res.json())
    .then(data => setSearchList(data))
  }, [])

  console.log(searchList);
  return (
    <div className="w-5/6 sm:max-w-max">
      <h1 className="border-b border-solid border-slate-700">Busquedas en Tendencia</h1>
      <ul className="p-2 list-disc">
        {
          searchList.map(e => (
            <li key={e.id}>
              <Link to={'/search?q=' + e.search_text} className="text-blue-600">{e.search_text}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default SearchList