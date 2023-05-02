import { SanityContextProvider } from '@/sanity/SanityContextProvider'
import '@/styles/globals.css'
import '@/styles/styles.css'
import "tw-elements/dist/css/tw-elements.min.css";

import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }) {

  return ( 
    <SanityContextProvider>
        <style jsx global>
          {` html {
            font-family: ${roboto.style.fontFamily};
          }`}
        </style>
      <Component {...pageProps} />
    </SanityContextProvider>
  )
}
