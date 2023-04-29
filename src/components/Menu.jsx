
import Link from 'next/link';
import React from 'react'

export default function Menu( {items} ) {
  
   if (!items) {
      return <div className='loading'>Loading...</div>;
   }
  
   return (
         <nav className='nav-container'>
            <ul>
            {items.map((item) => (
               <li key={item._id}>
                  <Link href={item.slug.current}>{item.title}</Link>
                  {item.children && (
                  <ul>
                     {item.children.map((child) => (
                        <li key={child._id}>
                        <Link href={child.slug.current}>{child.title}</Link>
                        {child.children && <Menu items={child.children} />}
                        </li>
                     ))}
                  </ul>
                  )}
               </li>            
            ))}
            </ul>
         </nav>      
      )
}


