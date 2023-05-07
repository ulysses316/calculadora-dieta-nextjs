import '@/styles/globals.css'
import { useEffect } from 'react'
import '../node_modules/normalizecss/normalize.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])
  return <Component {...pageProps} />
}
