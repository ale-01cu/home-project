import {Search} from '../components/SearchForm'
import {ContentList} from '../components/ContentList'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useMemo } from "react"
import { addSearch, updateSearchContent, addSearchContent, clearSearchContent } from '../redux/searchSlice' 
import SearchList from '../components/SearchLists'
import { useSearchParams } from 'react-router-dom';
import { fetching } from '../services/fetching'
import { CATALOGUEURL } from '../utils/urls'

export const SearchPage = () => {
  const dispatch = useDispatch()
  const searchContent = useSelector(state => state.search.searchResult)
  const [params] = useSearchParams()

  const querySearch = params.get("s") === null ? '' : params.get("s")
  const queryGender = useMemo(() => params.get("g") === null ? [] : params.getAll("g"), [params]) 
  const queryActor = useMemo(() => params.get("a") === null ? [] : params.getAll("a"), [params]) 
  const queryCategory = params.get("c") === null ? '' : params.get("c")

  useEffect(() => {

    if ( querySearch || queryGender.length > 0 || queryActor.length > 0 || queryCategory ) {
      let url = CATALOGUEURL

      if (querySearch) {
        url += '?search=' + querySearch
        dispatch(addSearch(querySearch))
      
      }else if ( queryGender.length > 0 || queryActor || queryCategory ) {
        url += '?category='+ queryCategory
        dispatch(addSearch(""))

        if (queryGender) {
          const genders = queryGender.join(",")
          url += `&genders=${genders}`
        }
        if (queryActor) {
          const actors = queryActor.join(",")
          url += `&actors=${actors}`

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
    <div className='flex flex-col items-center py-8 md:px-24 lg:px-20 gap-y-20 sm:items-start xl:flex-row'>
      <div className='sm:w-full flex flex-col items-center space-y-5 w-full xl:basis-9/12 2xl:basis-10/12 sm:pr-8'>
        <Search/>
        <div className='pt-10'>
          <ContentList 
            content={searchContent} 
            updateContent={updateSearchContent}
          />
        </div>
      </div>
      <div className='sm:w-full flex flex-col items-center p-2 w-full xl:basis-3/12 2xl:basis-2/12 xl:mr-5'>
        <SearchList/>
      </div>
    </div>
  )
}