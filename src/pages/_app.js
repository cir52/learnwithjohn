
import '@/styles/globals.css'
import '@/styles/styles.css'
//import { SessionProvider } from "next-auth/react"
import { Open_Sans } from 'next/font/google'

const openS = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

// export default function App({ session, Component, pageProps }) {
export default function App({ Component, pageProps }) {
  return ( 
    // <SessionProvider session={session}>

        <div className={openS.className} >
            <Component  {...pageProps} />
        </div>

    // </SessionProvider>
  )
}
