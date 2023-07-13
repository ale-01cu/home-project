import {Search} from '../components/SearchForm'
import {ContentList} from '../components/ContentList'
import {useDispatch} from 'react-redux'
import { useEffect } from "react"
import {addContent} from '../redux/contentSlice'
import { addSearch } from '../redux/searchSlice'

export const SearchPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addContent({
            count: 0,
            next: '',
            previous: '',
            results: []
        }))

        return () => {
          dispatch(addSearch(''))
        };
    
      }, [dispatch])


    return (
        <div className='flex flex-col items-center py-8'>
            <Search/>
            <ContentList/>
        </div>
    )
}