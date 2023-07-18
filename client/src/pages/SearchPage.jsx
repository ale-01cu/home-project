import {Search} from '../components/SearchForm'
import {ContentList} from '../components/ContentList'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react"
import { addSearch, updateSearchContent, addSearchContent } from '../redux/searchSlice' 
import SearchList from '../components/searchLists'
import { useLocation } from 'react-router-dom';
import { fetching } from '../services/fetching'
import { CATALOGUEURL } from '../utils/urls'

export const SearchPage = () => {
  const dispatch = useDispatch()
  const searchContent = useSelector(state => state.search)
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const search = searchContent.search

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
    <div className='flex flex-col items-center py-8 px-2 sm-px-0 space-y-10 pb-14 sm:items-start xl:flex-row'>
      <div className='sm:w-full flex flex-col items-center space-y-5 xl:basis-10/12'>
        <Search/>
        <ContentList 
          content={searchContent} 
          updateContent={updateSearchContent}
        />
      </div>
      <div className='sm:w-full px-2 xl:basis-2/12'>
        <SearchList/>
      </div>
    </div>
  )
}