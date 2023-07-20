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
  const querySearch = new URLSearchParams(location.search).get("s")
  const queryGender = new URLSearchParams(location.search).get("g")
  const queryActor = new URLSearchParams(location.search).get("a")
  const queryCategory = new URLSearchParams(location.search).get("c")

  useEffect(() => {
    const qs = querySearch === null ? '' : querySearch
    const qg = queryGender === null ? '' : queryGender
    const qa = queryActor === null ? '' : queryActor
    const qc = queryCategory === null ? '' : queryCategory

    console.log("adasdasdasda");
    if ( qs || qg || qa || qc ) {
      let url = CATALOGUEURL

      if (qs) {
        url += '?search=' + qs
        dispatch(addSearch(qs))
      
      }else if ( qg || qa || qc ) {
        url += '?category__name='+ qc +
        '&genders__name=' + qg +
        '&actors__full_name=' + qa
      }

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