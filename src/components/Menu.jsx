
import React from 'react'

export default function Menu( {items} ) {
  
   if (!items) {
      return <div className='loading'>Loading...</div>;
   }
  
   return (
         <nav>
            <ul>
            {items.map((item) => (
               <li key={item._id}>
                  <a href={item.slug}>{item.title}</a>
                  {item.children && (
                  <ul>
                     {item.children.map((child) => (
                        <li key={child._id}>
                        <a href={child.slug}>{child.title}</a>
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


