import { getNavbarMenu } from '@/sanity/sanity-utils';
import Link from 'next/link';
import React from 'react'

const NavbarMenu = () => {

   const [items, setItems] = React.useState(null);

   // useEffect to check if menu is fetched and ready for rendering
   React.useEffect(() => {
      const fetchData = async () => {
         const data = await getNavbarMenu()
         setItems(data);
      };
      fetchData();
   }, []);


   if (!items) {
      return <></>;
   }

   return (
      <div className='navbar-menu'>
         {  items.map((item) => (
               <Link key={item._id} href={item.slug.current}>{item.title}</Link>
            ))
         }
      </div>  
   )
}


export default NavbarMenu