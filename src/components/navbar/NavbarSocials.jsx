import { SanityContext } from '@/sanity/SanityContextProvider';
import { getNavbarSocials } from '@/sanity/sanity-utils';
import Link from 'next/link';
import React, { useState, useContext, useEffect } from 'react'
import * as FaIcons from 'react-icons/fa'

const NavbarSocials = () => {

  const client = useContext(SanityContext)
  const [items, setItems] = useState(null)

  // useEffect to check if socials ar fetched and ready for rendering
  useEffect(() => {
     const fetchData = async () => {
        const data = await getNavbarSocials(client)
        setItems(data);
     };
     fetchData();
  }, []);


  if (!items) {
     return <></>;
  } 

  return ( 
      <>
        {items.map((item) => {
                const CurrentIcon = FaIcons[ item.icon ]     
                return (
                  item.link.blank ? 
                    <Link key={item._id} href={item.link.href} target="_blank" rel="noopener">
                        <CurrentIcon className = 'text-xl hover:text-[#ed1b24]'/>
                    </Link> : 
                    <Link key={item._id} href={item.link.href}>
                        <CurrentIcon />
                    </Link>
                )
        })}
      </>
  )
}

export default NavbarSocials