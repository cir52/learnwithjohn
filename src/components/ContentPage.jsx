import React, { useState, useEffect, useContext } from 'react'
import { getContentPage } from '@/sanity/sanity-utils'
import MyPortableText from './MyPortableText'
import { useRouter } from 'next/router'
import { SanityContext } from '@/sanity/SanityContextProvider'
import Breadcrumb from './Breadcrumbs'
import { BsDiamondFill } from 'react-icons/bs'

//load smoot scrolling effect on client side only
if (typeof window !== 'undefined') {
   const smoothscroll = require('smoothscroll-polyfill')
   smoothscroll.polyfill()
 }

// get all h1 for the right navigation
const createValidId = (text) => {
   return text
     .toLowerCase()
     .replace(/&/g, 'and') // Replace & with 'and'
     .replace(/[^a-z0-9]+/g, '-') // Replace any other special characters with hyphens
     .replace(/^-|-$/g, '') // Remove any leading or trailing hyphens
 }

 const extractHeadings = (blocks) => {
   const headings = []
   blocks.forEach(block => {
     if (block._type === 'block' && block.style === 'h1') {
       const text = block.children[0]?.text
       if (typeof text === 'string') {
         headings.push(text)
       }
     }
   })
   return headings
 }
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

   //scroll effect
   const scrollToHeading = (e, heading) => {
      e.preventDefault()
      const targetId = `#${createValidId(heading)}`
      const targetElement = document.querySelector(targetId)
    
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
   }

   if (loading) {
      return <div className='loading'>Loading...</div>
   }

   if (!pageData) {
      return <div className='error'>Error: Content not found - please try reloading the page</div>
   }

   const headings = extractHeadings(pageData.content)

   return (
      <>       
         <main className = 'flex flex-row'>
            <div className = 'mx-5 md:mx-10'>
               <Breadcrumb currentUrl={path} />
               <MyPortableText blocks={pageData.content} />
            </div>
         
            {(headings.length > 4) &&  
               <aside className='right-menu sticky hidden h-fit lg:block max-w-[20vw] w-full shadow-md bg-white rounded-md font-[400]'>
                  <ul className='!py-[0.8rem] !px-[1.5rem] m-0 text-center text-sm'>
                     {headings.map((heading, index) => (
                        <li   className='mb-[0.5rem]'
                              key={index}
                        >
                           <a 
                              href = {`#${createValidId(heading)}`}
                              onClick={(e) => scrollToHeading(e, heading)}
                           >
                              {heading}
                           </a>
                           { (index < headings.length-1) &&
                              <BsDiamondFill className='w-full text-blue-200 text-[0.4rem] mt-[0.4rem]' /> }
                        </li>
                     ))}
                  </ul>
               </aside>
            }
         </main>
      </>
   )
}

export default ContentPage