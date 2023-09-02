import { Link } from "react-router-dom"
import randomColor from '../services/generateColor'
import Gender from './GenderCard'

const Card = ({content}) => {
  return (
    <Link 
      id='card' 
      to={'/detail/' + content.id} 
      className='flex flex-col justify-between h-full hover:bg-gray-200 transition-all duration-150 min-h-max rounded-3xl'>
        
      <div 
        id="poster" 
        className="h-full overflow-hidden">
        <img 
          src={content.photo} 
          alt="" 
          className='h-full object-cover transition-all duration-150 rounded-3xl'/>
      </div>

      <div id="detail" className=" p-2">
        <div className="flex justify-between">
          {
            content.release_year
              ? <h3 id="release-year" className="text-slate-800">{content.release_year}</h3>
              : <h3 id="release-year" className="text-slate-800">{content.release_date}</h3>
          }
          <h3 
            id="price" 
            className="text-green-400">
              ${content.category.price}
          </h3>
        </div>
          
        <h2 
          id="name" 
          className="text-slate-800 rounded-lg font-medium w-full whitespace-nowrap text-ellipsis overflow-hidden">
            {content.name}
          </h2>

        <div 
          id="genders" 
          className="text-slate-800 rounded-lg whitespace-nowrap text-ellipsis overflow-hidden space-x-1">
            {content.genders.map(gender => (
              <Gender key={gender.id} gender={gender} className={`rounded-lg align-middle text-sm font-medium px-2 text-center `}/>
            ))}
        </div>
      </div>
    </Link>
  )
}


export default Card