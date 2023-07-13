import { useEffect } from "react"
import { fetching } from '../services/fetching'
import { CATALOGUEURL } from '../utils/urls'
import {useSelector, useDispatch} from 'react-redux'
import {addContentDetail} from '../redux/contentDetailSlice.js'
import {useParams} from 'react-router-dom'

export const ContentDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const content = useSelector(state => state.contentDetail)

  useEffect(() => {
      fetching(CATALOGUEURL + id + '/')
      .then(data => dispatch(addContentDetail(data)))
  }, [dispatch, id])

  console.log(content);
  return <div>
    {content.name}
  </div>
}