import React from 'react'
import { useRouter } from 'next/router';
import HomePage from './HomePage';
import ContentPage from './ContentPage';

const MainContent = () => {  

   const router = useRouter();
   const path = router.asPath;

   if (path === '/') {
      return <HomePage />
   }
   else {
      return <ContentPage />
   }
}

export default MainContent