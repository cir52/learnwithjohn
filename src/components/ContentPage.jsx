import React, { useState, useEffect, useContext } from 'react'
import { getContentPage } from '@/sanity/sanity-utils'
import MyPortableText from './MyPortableText'
import { useRouter } from 'next/router'
import { SanityContext } from '@/sanity/SanityContextProvider'
import Breadcrumb from './Breadcrumbs'

const ContentPage = () => {

   const client = useContext(SanityContext)
   const [pageData, setPageData] = useState(null)
   const [loading, setLoading] = useState(true)
   const [currentSlug, setCurrentSlug] = useState('')

   const router = useRouter()
   let path = router.asPath

   //wait for router to be ready to get current slug  
   useEffect(() => {
      if (router.isReady) {
         const indexCopy = [...router.query.index];
         const slug = indexCopy.pop();
         setCurrentSlug(slug)
         if (!slug) {
            setLoading(false)
         }
      }
   }, [router])

   //when current slug is ready, set fetch the data 
   useEffect(() => {
      if (currentSlug) {
         const fetchData = async () => {
            const data = await getContentPage({ client, slug: currentSlug })
            setPageData(data)
            setLoading(false)
         }
         fetchData()
      }
   }, [currentSlug])

   if (loading) {
      return <div className='loading'>Loading...</div>
   }

   if (!pageData) {
      return <div className='error'>Error: Content not found - please try reloading the page</div>
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
   )
}

export default ContentPage