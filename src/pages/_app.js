import { SanityContextProvider } from '@/sanity/SanityContextProvider'
import '@/styles/globals.css'
import '@/styles/styles.css'

import { Open_Sans } from 'next/font/google'

const openS = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export default function App({ Component, pageProps }) {

  return ( 
    <SanityContextProvider>
      <div className={openS.className} >
          <Component  {...pageProps} />
      </div>
    </SanityContextProvider>
  )
}
