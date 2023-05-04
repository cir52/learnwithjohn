import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react"

const ArrowIcon = ({ isOpen }) => (
   <div className={`transition-all duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`}>
      <svg
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 20 20"
         fill="currentColor"
         className='h-5 w-5'
      >
         <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
         />
      </svg>
   </div>
)

const LinkWithChild = ({ item }) => {

   const router = useRouter()
   const [isOpen, setIsOpen] = useState(false)

   const handleClick = async (e) => {
      e.preventDefault()
      setIsOpen((prev) => !prev);
      await router.push(item.slug.current);
   }

   const handleArrowClick = (e) => {
      setIsOpen((prev) => !prev)
   }

   return (
      <li className="relative">
         <div className="flex justify-between gap-2 items-center">
            <Link href={item.slug.current} onClick={handleClick}>
               {item.title}
            </Link>
            <div onClick={handleArrowClick}>
               <ArrowIcon isOpen={isOpen} />
            </div>
         </div>
         <ul className={`relative m-0 list-none p-0`}>
            {item.children.map((child) =>
               child.children && child.children.length > 0 ? (
                  <LinkWithChild item={child} key={child._id} />
               ) : (
                  <LinkWithoutChild item={child} key={child._id} />
               )
            )}
         </ul>
      </li>
   )
}

const LinkWithoutChild = ({ item }) => {
   return (
      <li className="relative">
         <Link href={item.slug.current}>{item.title}</Link>
      </li>
   )
}

export default function Menu({ items }) {

   if (!items) {
      return <div className="loading">Loading...</div>
   }

   return (
      <div>
         <nav>
            <ul className="relative m-0 list-none px-[0.2rem]">
               {items.map((item) =>
                  item.children ? (
                     <LinkWithChild item={item} key={item._id} />
                  ) : (
                     <LinkWithoutChild item={item} key={item._id} />
                  )
               )}
            </ul>
         </nav>
      </div>
   )
}

// NEWEST WORKING

// import Link from "next/link";
// import React, { useState } from "react";

// const ArrowIcon = ({ isOpen, onClick }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//     className="h-5 w-5"
//     onClick={onClick}
//     style={{
//       transition: "transform 300ms ease-in-out",
//       transformOrigin: "center",
//       transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
//     }}
//   >
//         <path
//           fillRule="evenodd"
//           d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
//           clipRule="evenodd"
//         />
//   </svg>
// );

// export default function Menu({ items }) {
 



//   const LinkWithoutChild = ({ item }) => {
//    return (
//       <li className="relative">
//          <Link href={item.slug.current}>
//             {item.title}
//          </Link>

//       </li>
//    );
// };

// const LinkWithChild = ({ item }) => {
//    const [isOpen, setIsOpen] = useState(false);

//    const handleClick = () => {
//       setIsOpen((prevIsOpen) => !prevIsOpen);
//     };
 
//    return (<>

//      <li className="relative">
          
//        <div className="flex justify-between gap-2 items-center">
//          <Link href={item.slug.current} onClick={handleClick}>
//             {item.title}
//          </Link>
//          <ArrowIcon isOpen={isOpen} onClick={handleClick} />
//        </div>
//        <ul className={`relative m-0 list-none p-0 ${isOpen ? '' : 'hidden'}`}>
//              {item.children.map((child) =>
//                child.children && child.children.length > 0 ? (
//                   <LinkWithChild item={child} key={child._id} />
//                ) : (
//                   <LinkWithoutChild item={child} key={child._id} />
//                )
//             )}
//          </ul>
//      </li>
//      </>
//    );
//  };


//   if (!items) {
//    return <div className='loading'>Loading...</div>;
// }

//   return (
//     <div>
//        <nav>
         
//        <ul className="relative m-0 list-none px-[0.2rem]">
     
//             {items.map((item) =>
//                item.children ? (
//                   <LinkWithChild item={item} key={item._id} />
//                ) : (
//                   <LinkWithoutChild item={item} key={item._id} />
//                )
//             )}
//          </ul>
//       </nav>
//     </div>
//   );
// }


/*

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Menu({ items }) {
   const [openMenuIds, setOpenMenuIds] = useState([]);

   const [arrowClassNames, setArrowClassNames] = useState({});

   if (!items) {
      return <div className='loading'>Loading...</div>;
   }

   const ArrowIcon = ({ isOpen, onClick, className }) => (
      <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`h-5 w-5  ${isOpen ? "rotate-180" : ""} transform duration-300 ease-in-out`}
      onClick={onClick}
      style={{
        transition: "transform 300ms ease-in-out",
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    );

   const toggleMenu = (id) => {
      setOpenMenuIds((prevOpenMenuIds) =>
         prevOpenMenuIds.includes(id)
            ? prevOpenMenuIds.filter((openMenuId) => openMenuId !== id)
            : [...prevOpenMenuIds, id]
      );
   };

   const LinkWithoutChild = ({ item }) => {
      return (
         <li className="relative">
            <Link href={item.slug.current}>
               {item.title}
            </Link>
         </li>
      );
   };

   const LinkWithChild = ({ item }) => {
      const isOpen = openMenuIds.includes(item._id);
    
      const handleClick = (e, id) => {
         e.stopPropagation();
         setArrowClassNames((prevArrowClassNames) => ({
           ...prevArrowClassNames,
           [id]: prevArrowClassNames[id] === "rotate-180" ? "" : "rotate-180",
         }));
         toggleMenu(id);
       };
    
      return (
        <li className="relative">
          <div className="flex justify-between gap-2 items-center">
            <Link href={item.slug.current} onClick={handleClick}>
               {item.title}
            </Link>
            <span
              className="cursor-pointer ml-auto mr-[0.8rem] text-gray-600"
              
            >
               <ArrowIcon
                  isOpen={isOpen}
                  onClick={(e) => handleClick(e, item._id)}
                  className={arrowClassNames[item._id] || ""}
                  />
            </span>
          </div>
          <ul className={`relative m-0 list-none p-0 ${isOpen ? '' : 'hidden'}`}>
                {item.children.map((child) =>
                  child.children && child.children.length > 0 ? (
                     <LinkWithChild item={child} key={child._id} />
                  ) : (
                     <LinkWithoutChild item={child} key={child._id} />
                  )
               )}
            </ul>
        </li>
      );
    };

   return (
      <nav>
         <ul className="relative m-0 list-none px-[0.2rem]">
            {items.map((item) =>
               item.children ? (
                  <LinkWithChild item={item} key={item._id} />
               ) : (
                  <LinkWithoutChild item={item} key={item._id} />
               )
            )}
         </ul>
      </nav>
   );
}

*/

/// ---->>>> WORKING <<<<---------

// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';

// export default function Menu({ items }) {
//    const [openMenuIds, setOpenMenuIds] = useState([]);

//    if (!items) {
//       return <div className='loading'>Loading...</div>;
//    }

//    const toggleMenu = (id) => {
//       setOpenMenuIds((prevOpenMenuIds) =>
//          prevOpenMenuIds.includes(id)
//             ? prevOpenMenuIds.filter((openMenuId) => openMenuId !== id)
//             : [...prevOpenMenuIds, id]
//       );
//    };

//    const LinkWithoutChild = ({ item }) => {
//       return (
//          <li className="relative">
//             <Link href={item.slug.current}>
//                {item.title}
//             </Link>
//          </li>
//       );
//    };

//    const LinkWithChild = ({ item }) => {
//       const isOpen = openMenuIds.includes(item._id);

//       const handleClick = (e) => {
//          e.stopPropagation();
//          toggleMenu(item._id);
//       };

//       return (
//          <li className="relative">
//            <div className="flex justify-between gap-2 items-center">
//                <Link href={item.slug.current} onClick={handleClick}>
//                   {item.title}
//                </Link>
//                <span
//                   className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
//                   onClick={handleClick}
//                >
//                   <svg
//                      xmlns="http://www.w3.org/2000/svg"
//                      viewBox="0 0 20 20"
//                      fill="currentColor"
//                      className={`h-5 w-5 ${isOpen ? 'rotate-180' : ''}`}
//                   >
//                      <path
//                         fillRule="evenodd"
//                         d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
//                         clipRule="evenodd"
//                      />
//                   </svg>
//                </span>
//             </div>
//             <ul className={`relative m-0 list-none p-0 ${isOpen ? '' : 'hidden'}`}>
//                {item.children.map((child) =>
//                   child.children && child.children.length > 0 ? (
//                      <LinkWithChild item={child} key={child._id} />
//                   ) : (
//                      <LinkWithoutChild item={child} key={child._id} />
//                   )
//                )}
//             </ul>
//          </li>
//       );
//    };

//    return (
//       <nav>
//          <ul className="relative m-0 list-none px-[0.2rem]">
//             {items.map((item) =>
//                item.children ? (
//                   <LinkWithChild item={item} key={item._id} />
//                ) : (
//                   <LinkWithoutChild item={item} key={item._id} />
//                )
//             )}
//          </ul>
//       </nav>
//    );
// }