import {Search} from '../components/SearchForm'
import {ContentList} from '../components/ContentList'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react"
import {addContent} from '../redux/contentSlice'
import {CATALOGUEURL} from '../utils/urls.js'
import {fetching} from '../services/fetching.js'

export const SearchPage = () => {
    const dispatch = useDispatch()
    const search = useSelector(state => state.search)

    useEffect(() => {
      const url = CATALOGUEURL + '?search=' + search

      fetching(url)
        .then(data => dispatch(addContent(data)))


        // return () => {
        //   dispatch(addSearch(''))
        // };
    
      }, [dispatch, search])


    return (
        <div className='flex flex-col items-center py-8'>
            <Search/>
            {search && <ContentList/>}
        </div>
    )
}