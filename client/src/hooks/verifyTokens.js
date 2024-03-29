import { useEffect } from 'react';
import { VERIFYTOKENURL, REFRESHTOKENURL } from "../utils/urls"
import { useDispatch } from "react-redux"
import { addTokens } from "../redux/tokensSlice"

const VerifyTokens = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const tokenAccess = localStorage.getItem('tkaccess')
    const tokenRefresh = localStorage.getItem('tkrefresh')

    const verify = async () => {
      if (tokenAccess && tokenRefresh) {
        const res = await fetch(VERIFYTOKENURL, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({token: tokenAccess})
        })

        if (res.status === 200) {
          dispatch(addTokens({
            access: tokenAccess, 
            refresh: tokenRefresh
          }))
        } else {
          const resRefresh = await fetch(REFRESHTOKENURL, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({refresh: tokenRefresh})
          })
          const { access, refresh } = await resRefresh.json()

          if (res.status === 200) {
            localStorage.setItem('tkaccess', access)
            localStorage.setItem('tkrefresh', refresh)

            dispatch(addTokens({
              access, 
              refresh
            }))
          } else {
            localStorage.setItem('tkaccess', '')
            localStorage.setItem('tkrefresh', '')

            dispatch(addTokens({
              access: '', 
              refresh: ''
            }))
          }
        }
      }
    }

    verify();
  }, [dispatch])

  return null;
}

export default VerifyTokens;