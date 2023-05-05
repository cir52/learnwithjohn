import Link from "next/link";
import { useRouter } from "next/router"
import React, { useState } from "react"
import clsx from "clsx"
import NavbarSearch from "./navbar/NavbarSearch";
import NavbarSocials from "./navbar/NavbarSocials";

//Submenus styles
const textStyle = (level) => {
   switch (level) {
      case 1:
         return "text-lg font-medium text-[#140eae]"
      case 2:
         return "text-base font-medium text-[#140eae]"
      case 3:
         return "text-sm font-normal text-[#140eae]"
      default:
         return "text-sm font-normal text-[#140eae]"
   }
}

/// Rotating Arrow Icon to toggle submenus
const ArrowIcon = ({ isOpen }) => (
   <div className={`hover:text-[#ed1b24] transition-all duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`}>
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

// when accesing the page from external sources check if submenu needs to be expanded
const isDescendantActive = (item, currentSlug) => {
   if (item.slug.current === currentSlug) return true
   if (item.children) {
      for (const child of item.children) {
         if (isDescendantActive(child, currentSlug)) {
            return true
         }
      }
   }
   return false
}

// Menu link with children
const LinkWithChild = ({ item, level = 1 }) => {

   const router = useRouter()

   // Function to check if the current submenu should be initially open
   const isInitiallyOpen = () => {
      const currentSlug = router.asPath.split("/").pop()

      const checkChildren = (children) => {
         for (const child of children) {
            if (child.slug.current === currentSlug) {
               return true
            }
            if (child.children && checkChildren(child.children)) {
               return true
            }
         }
         return false
      }

      if (item.children) {
         return checkChildren(item.children);
      }
      return false
   }

   // state for submenu toggle
   const [isOpen, setIsOpen] = useState(isInitiallyOpen())

   const isActive = () => {
      const currentSlug = router.asPath.split("/").pop()
      const itemSlug = item.slug.current
      return currentSlug === itemSlug
   }

   const handleClick = async (e) => {
      e.preventDefault()
      setIsOpen((prev) => !prev)
      await router.push(item.slug.current)
   }

   const handleArrowClick = (e) => {
      setIsOpen((prev) => !prev)
   }

   return (
      <li className="relative">
         <div className={clsx(
            textStyle(level),
            "flex justify-between gap-2 items-center",
            { "text-[#ed1b24]": isActive() }, // Apply color if the menu item is active
            "hover:text-[#ed1b24]",
         )}
         >
            <Link href={item.slug.current} onClick={handleClick} className={` transition-colors duration-200`}>
               {item.title}
            </Link>
            <div onClick={handleArrowClick} className="cursor-pointer">
               <ArrowIcon isOpen={isOpen} />
            </div>
         </div>
         <ul
            className={clsx(
               "relative m-0 list-none p-0 transition-all duration-300 ease-in-out space-y-2 pl-3 overflow-hidden",
               {
                  "max-h-0 opacity-0 pt-0": !isOpen,
                  "max-h-[1000px] opacity-100 pt-2": isOpen,
               }
            )}
         >
            {item.children.map((child) =>
               child.children && child.children.length > 0 ? (
                  <LinkWithChild item={child} key={child._id} level={level + 1} />
               ) : (
                  <LinkWithoutChild item={child} key={child._id} level={level + 1} />
               )
            )}
         </ul>
      </li>
   )
}

const LinkWithoutChild = ({ item, level = 1 }) => {

   const router = useRouter()
   const isActive = () => {
      const currentSlug = router.asPath.split("/").pop()
      const itemSlug = item.slug.current
      return currentSlug === itemSlug
   }

   return (
      <li className="relative">
         <Link href={item.slug.current}
            className={clsx(
               textStyle(level),
               { "text-[#ed1b24]": isActive() }, // Apply color if the menu item is active
               "hover:text-[#ed1b24]"
            )}
         >
            {item.title}
         </Link>
      </li>
   )
}

export default function Menu({ items }) {

   if (!items) {
      return <div className="loading">Loading...</div>
   }

   return (
      <div className="bg-white text-gray-800 shadow-lg rounded-md p-4 h-fit">
         <div className = 'block md:hidden mb-3.5'>
            <NavbarSearch  />
         </div>

         <nav>
            <ul className="relative m-0 list-none space-y-2">
               {items.map((item) =>
                  item.children ? (
                     <LinkWithChild item={item} key={item._id} />
                  ) : (
                     <LinkWithoutChild item={item} key={item._id} />
                  )
               )}
            </ul>
         </nav>
         <hr className='block lg:hidden text-[#140eae88] h-[2px] !my-5' />
         <div className = 'flex justify-center gap-6 lg:!hidden mb-2 text-blue-200'>
            <NavbarSocials />
         </div>
      </div>
   )
}