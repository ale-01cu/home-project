import { useEffect } from "react"
import { fetching } from '../services/fetching'
import { CATALOGUEURL } from '../utils/urls'
import {useDispatch} from 'react-redux'
import {addContent} from '../redux/contentSlice'
import {useParams} from 'react-router-dom'
import {ContentList} from '../components/ContentList'

export const Catalogue = () => {
  const { category } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const url = category 
    ? CATALOGUEURL + '?category__name=' + category 
    : CATALOGUEURL

    fetching(url)
    .then(data => dispatch(addContent(data)))

  }, [dispatch, category])

  return (
    <div className="md:px-24">
      <ContentList/>
    </div>
  )
}