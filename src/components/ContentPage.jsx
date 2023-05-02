import React, { useState, useEffect, useContext } from 'react';
import { getContentPage } from '@/sanity/sanity-utils';
import MyPortableText from './MyPortableText';
import { useRouter } from 'next/router';
import { SanityContext } from '@/sanity/SanityContextProvider';

const ContentPage = () => {

   const client = useContext(SanityContext);
   const [pageData, setPageData] = useState(null);
   const [slug, setSlug] = useState(null);
   const router = useRouter();

   useEffect(() => {
      if (router.query.index) {
         setSlug(router.query.index[0]);
      }
   }, [router.query.index]);

   useEffect(() => {
      if (slug) {
         const fetchData = async () => {
            const data = await getContentPage({client, slug});
            setPageData(data);
         };
         fetchData();
      }
   }, [slug]);

   if (!pageData) {
      return <div className='loading'>Loading...</div>;
   }

   return (
      <>
         <MyPortableText blocks={pageData.content} />
      </>
   );
};

export default ContentPage;