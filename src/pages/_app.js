import '@/styles/globals.css'
import '@/styles/styles.css'

export default function App({ Component, pageProps }) {

  // const [isSSR, setIsSSR] = useState(true)
  
  // useEffect(() => {
  //   setIsSSR(false)
  // }, [])

  // if (isSSR) return null

  return ( 
     <Component {...pageProps} />
  )
}
