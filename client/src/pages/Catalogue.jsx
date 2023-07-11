import {useRef, useCallback, useEffect} from 'react'
import {ContentList} from '../components/ContentList'
import useNearScreen from '../hooks/useNearScreen.js'
import debounce from 'just-debounce-it'

export const Catalogue = () => {
    const externalRef = useRef()
    const {isNearScreen} = useNearScreen({ distance: '100px', externalRef, once: false })
    console.log(isNearScreen);

    const debounceHandleNextPage = useCallback(debounce(
        () => console.log('next page'), 200
    ), [])

    useEffect(() => {
        if (isNearScreen) debounceHandleNextPage()
    }, [debounceHandleNextPage, isNearScreen])
    
    return (
      <main className='min-h-screen'>
          <ContentList/>
          <div className='bg-red-900' id='visor' ref={externalRef}>Visor</div>
      </main>
    )
}