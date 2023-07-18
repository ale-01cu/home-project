import {Search} from '../components/SearchForm'
import {ContentList} from '../components/ContentList'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react"
import { updateSearchContent } from '../redux/searchSlice' 
import SearchList from '../components/searchLists'

export const SearchPage = () => {
  const dispatch = useDispatch()
  const searchContent = useSelector(state => state.search)
  const search = searchContent.search

  useEffect(() => {

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

  
    }, [dispatch, search])


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