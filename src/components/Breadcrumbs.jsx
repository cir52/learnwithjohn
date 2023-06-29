import React from 'react'
import Link from 'next/link'
import { IoHome } from "react-icons/io5"

const Breadcrumb = ({ currentUrl }) => {
   const urlParts = currentUrl.split('/').filter((part) => part)

   const breadcrumbItems = urlParts.map((part, index) => {

      const breadcrumbPath = '/' + urlParts.slice(0, index + 1).join('/')
      const breadcrumbName = part
         .split('-')
         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
         .join(' ')

      return (
         <React.Fragment key={breadcrumbPath}>
            <Link
               className='hover:text-[#ed1b24]'
               href={breadcrumbPath}
            >
               {breadcrumbName}
            </Link>
            {index < urlParts.length - 1 && '/'}
         </React.Fragment >
      )
   }) 

   return (
      <nav className='breadcrumbs flex items-center gap-[6px] mt-[1.25rem] text-[#0e0b67] text-sm'>
         <a
            className='hover:text-[#ed1b24]'
            href="/"
         >
            <IoHome />
         </a>
         {breadcrumbItems.length > 0 && '/'}
         {breadcrumbItems}
      </nav>
   )
}

export default Breadcrumb