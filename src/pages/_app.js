import { SanityContextProvider } from '@/sanity/SanityContextProvider'
import '@/styles/globals.css'
import '@/styles/styles.css'

import { Roboto } from "next/font/google";
// import { useEffect } from 'react';

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  // useEffect(() => {
  //   const use = async () => {
  //     (await import('tw-elements')).default;
  //   };
  //   use();
  // }, []);
  
  return ( 
    <SanityContextProvider>
        {/* <style jsx global>
          {` html {
            font-family: ${roboto.style.fontFamily};
          }`}
        </style> */}
        
      <Component {...pageProps} />
    </SanityContextProvider>
  )
}
