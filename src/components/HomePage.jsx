
import React from 'react'
import { getHome } from '@/sanity/sanity-utils';
import MyPortableText from './MyPortableText';

const HomePage = () => {

   const [home, setHome] = React.useState(null);

   React.useEffect(() => {
      const fetchData = async () => {
         const data = await getHome()
         setHome(data);
      };
      fetchData();
   }, []);

   if (!home) {
      return <div className='loading'>Loading...</div>;
   }

   return (
      <>
         HOMEEEEEE <MyPortableText blocks={home[0].content} />
      </>
   )
}

export default HomePage