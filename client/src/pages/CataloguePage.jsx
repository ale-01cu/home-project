import { useEffect } from "react"
import { fetching } from '../services/fetching'
import { CATALOGUEURL } from '../utils/urls'
import {useDispatch, useSelector} from 'react-redux'
import {addContent} from '../redux/contentSlice'
import {useParams} from 'react-router-dom'
import {ContentList} from '../components/ContentList'
import { updateContent } from "../redux/contentSlice"
import CatalogueLists from '../components/CatalogueLists'
import CategoryList from '../components/CategoryList'

export const Catalogue = () => {
  const { category } = useParams()
  const dispatch = useDispatch()
  const content = useSelector(state => state.content)

  useEffect(() => {
    const url = category 
    ? CATALOGUEURL + '?category=' + category 
    : CATALOGUEURL

    fetching(url)
    .then(data => dispatch(addContent(data)))

  }, [dispatch, category])

  return (
    <div className="px-1 md:px-24 space-y-36 lg:space-y-10">
      <section className="flex gap-y-16 lg:gap-x-10 flex-col-reverse lg:flex-row py-5">
        <CatalogueLists/>
      </section>
      <section>
        <div className="">
          <CategoryList/>
        </div>
      </section>
      <section id="catalogue">
        {/* <h1 className="hidden lg:block p-5 pl-0 sm:p-10 sm:pl-0 text-3xl font-extrabold">{category ? category : 'Catalogo'}</h1> */}
        <div className="">
          <h1 className="p-5 pl-0 sm:p-10 sm:pl-0 text-3xl font-extrabold">{category ? category : 'Catalogo'}</h1>
          <ContentList content={content} updateContent={updateContent}/>
        </div>
      </section>
    </div>
  )
}