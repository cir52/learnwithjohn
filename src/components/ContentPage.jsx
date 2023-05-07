import React, { useState, useEffect, useContext } from 'react'
import { getContentPage } from '@/sanity/sanity-utils'
import MyPortableText from './MyPortableText'
import { useRouter } from 'next/router'
import { SanityContext } from '@/sanity/SanityContextProvider'
import Breadcrumb from './Breadcrumbs'

const ContentPage = () => {

   const client = useContext(SanityContext)
   const [pageData, setPageData] = useState(null)

   const router = useRouter()

   let path = router.asPath
   let slug = ''

   //wait for router to be ready to get current slug and fetch data 
   useEffect(() => {
      if (router.isReady) {

         slug = router.query.index.pop()

         if (slug) {
            const fetchData = async () => {
               const data = await getContentPage({ client, slug })
               setPageData(data)
            }
            fetchData()
         }
      }
   }, [router, slug])

   if (!pageData) {
      return <div className='loading'>Loading...</div>
   }

   return (
      <>
         <nav>
            <Breadcrumb currentUrl={path} />
         </nav>
         <main className='main-content'>
            <MyPortableText blocks={pageData.content} />
         </main>
      </>
   );
};

export default ContentPage