
import React, { useContext } from 'react'
import { getHome } from '@/sanity/sanity-utils';
import MyPortableText from './MyPortableText';
import { SanityContext } from '@/sanity/SanityContextProvider';

const HomePage = () => {

   const client = useContext(SanityContext);
   const [home, setHome] = React.useState(null);

   React.useEffect(() => {
      const fetchData = async () => {
         const data = await getHome(client)
         setHome(data);
      };
      fetchData();
   }, []);

   if (!home) {
      return <div className='loading'>Loading...</div>;
   }

   return (
      <>
         <MyPortableText blocks={home[0].content} />
      </>
   )
}

export default HomePage