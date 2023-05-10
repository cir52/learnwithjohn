import { SanityContextProvider } from '@/sanity/SanityContextProvider'
import '@/styles/globals.css'
import '@/styles/styles.css'
import { SessionProvider } from "next-auth/react"
import { Open_Sans } from 'next/font/google'

const openS = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export default function App({ session, Component, pageProps }) {

  return ( 
    <SessionProvider session={session}>
      <SanityContextProvider>
        <div className={openS.className} >
            <Component  {...pageProps} />
        </div>
      </SanityContextProvider>
    </SessionProvider>
  )
}
