import {Search} from '../components/SearchForm'
import {ContentList} from '../components/ContentList'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react"
import { addSearch, updateSearchContent, addSearchContent, clearSearchContent } from '../redux/searchSlice' 
import SearchList from '../components/searchLists'
import { useLocation, useSearchParams } from 'react-router-dom';
import { fetching } from '../services/fetching'
import { CATALOGUEURL } from '../utils/urls'

export const SearchPage = () => {
  const dispatch = useDispatch()
  const searchContent = useSelector(state => state.search)
  const location = useLocation();
  const [params, setParams] = useSearchParams()
  const querySearch = new URLSearchParams(location.search).get("s") === null ? '' : new URLSearchParams(location.search).get("s")
  const queryGender = params.get("g") === null ? '' : params.get("g")
  const queryActor = params.get("a") === null ? '' : params.get("a")
  const queryCategory = params.get("c") === null ? '' : params.get("c")


  useEffect(() => {

    if ( querySearch || queryGender.length > 0 || queryActor || queryCategory ) {
      let url = CATALOGUEURL

      if (querySearch) {
        url += '?search=' + querySearch
        dispatch(addSearch(querySearch))
      
      }else if ( queryGender.length > 0 || queryActor || queryCategory ) {
        url += '?category='+ queryCategory

        if (queryGender) {
          const genders = queryGender.split(" ")
          for (let i in genders) {
            url += `&genders=${genders[i]}`
          }
        }
        if (queryActor) {
          const actors = queryActor.split(" ")
          for (let i in actors) {
            url += `&actors=${actors[i]}`
          }
        }
      }

      fetching(url)
      .then(data => {
        console.log(data);
        dispatch(addSearchContent(data))})
    
    }else {
      dispatch(clearSearchContent())
    }

  }, [dispatch, querySearch, queryGender, queryActor, queryCategory])


  return (
    <div className='flex flex-col items-center py-8 px-2 sm:px-0 space-y-10 pb-14 sm:items-start xl:flex-row'>
      <div className='sm:w-full flex flex-col items-center space-y-5 xl:basis-10/12'>
        <Search/>
        <ContentList 
          content={searchContent} 
          updateContent={updateSearchContent}
        />
      </div>
      <div className='sm:w-full flex flex-col items-center px-2 xl:basis-2/12 xl:mr-5'>
        <SearchList/>
      </div>
    </div>
  )
}