
import React from 'react'
import Link from 'next/link'

const NavbarMenu = ({ navbarMenuData }) => {

   return (
      <div className='flex justify-between gap-3 sm:gap-4 text-[0.75rem] font-[500] sm:text-base md:gap-6 md:ml-6 items-center sm:font-semibold'>
         {navbarMenuData.map((item) => (
            <Link className='hover:text-[#ed1b24]' key={item._id} href={item.slug.current}>{item.title}</Link>
         ))
         }
      </div>
   )
}

export default NavbarMenu