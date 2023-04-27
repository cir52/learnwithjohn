import { getMenuStructure } from '@/sanity/sanity-utils'
import React from 'react'



export default function Menu() {

   const [items, setItems] = React.useState(null);

   // useEffect to check if menu is fetched and ready for rendering
   React.useEffect(() => {
      const fetchData = async () => {
         const data = await getMenuStructure()
         setItems(data);
      };
      fetchData();
   }, []);

   const Navigation = ( {items} ) => {

      return (
         <ul>
           {items.map((item) => (
             <li key={item._id}>
               <a href={item.url}>{item.title}</a>
               {item.children && (
                 <ul>
                   {item.children.map((child) => (
                     <li key={child._id}>
                       <a href={child.url}>{child.title}</a>
                       {child.children && <Navigation items={child.children} />}
                     </li>
                   ))}
                 </ul>
               )}
             </li>            
           ))}
         </ul>     
      )
   }

   if (!items) {
      return <div>Loading...</div>;
    }
  
   return (
      <nav>
         <Navigation items={items} />
      </nav>     
  )
}


