import Link from 'next/link'
import React from 'react'
import { IoLogIn } from "react-icons/io5"

const NavbarLogin = () => {
  return (

    <Link href='/'>
      <div className='flex cursor-pointer hover:text-[#ed1b24] items-center gap-2 text-[2.0rem]'>
        <IoLogIn className='pt-[1px] ' />
        <div className='hidden md:block text-base'>
          Login
        </div>
      </div>
    </Link >

  )
}

export default NavbarLogin