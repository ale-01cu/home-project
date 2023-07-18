import { useEffect } from "react"
import { fetching } from '../services/fetching'
import { CATALOGUEURL } from '../utils/urls'
import {useDispatch, useSelector} from 'react-redux'
import {addContent} from '../redux/contentSlice'
import {useParams} from 'react-router-dom'
import {ContentList} from '../components/ContentList'
import { updateContent } from "../redux/contentSlice"

export const Catalogue = () => {
  const { category } = useParams()
  const dispatch = useDispatch()
  const content = useSelector(state => state.content)

  useEffect(() => {
    const url = category 
    ? CATALOGUEURL + '?category__name=' + category 
    : CATALOGUEURL

    fetching(url)
    .then(data => dispatch(addContent(data)))

  }, [dispatch, category])

  return <ContentList content={content} updateContent={updateContent}/>
}