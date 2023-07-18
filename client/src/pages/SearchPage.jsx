import {Search} from '../components/SearchForm'
import {ContentList} from '../components/ContentList'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react"
import {addContent, clearContent} from '../redux/contentSlice'
import {CATALOGUEURL} from '../utils/urls.js'
import {fetching} from '../services/fetching.js'

export const SearchPage = () => {
    const dispatch = useDispatch()
    const search = useSelector(state => state.search)

    useEffect(() => {
      dispatch(clearContent())

      if (search) {
        const url = CATALOGUEURL + '?search=' + search

        fetching(url)
          .then(data => {
            console.log(data);
            const uniqueResults = data.results.filter((result, index, self) =>
              index === self.findIndex(r => r.id === result.id)
            );
            dispatch(addContent({
              count: data.count,
              next: data.next,
              previous: data.previous,
              results: uniqueResults
            }))
          })
      }
    }, [dispatch, search])


    return (
        <div className='flex flex-col items-center py-8'>
            <Search/>
            {search && <ContentList/>}
        </div>
    )
}