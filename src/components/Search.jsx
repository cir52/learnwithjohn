import React, { useState, useEffect, useContext } from 'react'
import { getContentPage } from '@/sanity/sanity-utils'
import MyPortableText from './MyPortableText'
import { useRouter } from 'next/router'
import { SanityContext } from '@/sanity/SanityContextProvider'

const Search = ({query}) => {

   const client = useContext(SanityContext)
   const queryArray = query.split('/')
   const [searchResults, setSearchResults] = useState(null)


   useEffect(() => {
      const fetchData = async () => {
         const data = await getSearchResults(client)
         setSearchResults(data);
      }
      fetchData()
   }, [])
 
 
   if (!searchResults) {
      return <div className='loading'>{query} Loading...</div>
   }

   return (
      <>
         <MyPortableText blocks={pageData.content} />
      </>
   );
};

export default Search