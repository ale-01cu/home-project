import {Search} from '../components/SearchForm'
import {ContentList} from '../components/ContentList'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react"
import { addSearch, updateSearchContent, addSearchContent } from '../redux/searchSlice' 
import SearchList from '../components/searchLists'
import { useLocation } from 'react-router-dom';
import { fetching } from '../services/fetching'
import { CATALOGUEURL } from '../utils/urls'
import {Link} from 'react-router-dom'

export const SearchPage = () => {
  const dispatch = useDispatch()
  const searchContent = useSelector(state => state.search)
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const search = searchContent.search
  const categorys = useSelector(state => state.categorys)

  useEffect(() => {
    if (query) {
      dispatch(addSearch(query))
      const url = CATALOGUEURL + '?search=' + query

      fetching(url)
        .then(data => dispatch(addSearchContent(data)))

    }

    // if (search) {
    //   const url = CATALOGUEURL + '?search=' + search

    //   fetching(url)
    //     .then(data => {
    //       console.log(data);
    //       const uniqueResults = data.results.filter((result, index, self) =>
    //         index === self.findIndex(r => r.id === result.id)
    //       );
    //       dispatch(addContent({
    //         count: data.count,
    //         next: data.next,
    //         previous: data.previous,
    //         results: uniqueResults
    //       }))
    //     })


    // return () => {
    //   if (!search) {
    //     dispatch(clearSearchContent())
    //   }
    // };

  
    }, [dispatch, query])


  return (
    <div className='flex flex-col items-center py-8 px-2 sm:px-0 space-y-10 pb-14 sm:items-start xl:flex-row'>
      <div className='sm:w-full flex flex-col items-center space-y-5 xl:basis-10/12'>
        <Search/>
        {
        !query && searchContent.results.length === 0 
        ? (
          <div className='p-5 py-10'>
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              {categorys.map(category => (
                <li key={category.id} className='max-w-lg'>
                  <Link to={'/' + category.name} className='rounded-lg w-full relative flex justify-center items-center'>
                    <img src={category.photo} alt="" className='rounded-lg object-contain'/>
                    <span className='backdrop-blur-sm absolute font-semibold text-lg text-white p-2 rounded-3xl'>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
        : <ContentList 
          content={searchContent} 
          updateContent={updateSearchContent}
        />
        }
      </div>
      <div className='sm:w-full flex flex-col items-center px-2 xl:basis-2/12 xl:mr-5'>
        <SearchList/>
      </div>
    </div>
  )
}