import { getNavbarMenu } from '@/sanity/sanity-utils';
import Link from 'next/link';
import React, { useContext } from 'react'
import Image from 'next/image';
import Logo from '../../../public/assets/images/Logo.jpg'
import { SanityContext } from '@/sanity/SanityContextProvider';

const NavbarMenu = () => {

   const client = useContext(SanityContext)
   const [items, setItems] = React.useState(null);

   // useEffect to check if menu is fetched and ready for rendering
   React.useEffect(() => {
      const fetchData = async () => {
         const data = await getNavbarMenu(client)
         setItems(data);
      };
      fetchData();
   }, []);


   if (!items) {
      return <></>;
   }

   return (
      <div className='navbar-menu flex justify-between items-center'>
         <Link href='/'>
            <Image
               className='cursor-pointer ml-4 w-[70px]'
               src={Logo}
               alt='Home'
            />
         </Link>
         <div className='flex justify-between gap-6 ml-6 items-center font-semibold'>
            {items.map((item) => (
               <Link className='hover:text-[#ed1b24]' key={item._id} href={item.slug.current}>{item.title}</Link>
            ))
            }
         </div>
      </div>
   )
}


export default NavbarMenu