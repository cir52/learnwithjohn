import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoLogIn } from "react-icons/io5"
import LoginPage from '../LoginPage'

const NavbarLogin = ({ onToggleLoginPage }) => {
  
  const { data: session } = useSession()

  //TODO:  Loading
  
  // if (loading) {
  //   return <div>Loading...</div>
  // }

  const handleLoginClick = () => {
    onToggleLoginPage(true)
  }

  const handleCloseLoginPage = () => {
    onToggleLoginPage(false)
  }

  return (
    <>
      {!session && (
          <div 
              className = 'flex cursor-pointer hover:text-[#ed1b24] items-center gap-1 text-[2.0rem]' 
              onClick = {handleLoginClick}
          >
            <IoLogIn className='pt-[1px]' />
            <div className='hidden md:block text-base'>
              Login
            </div>
          </div>
      )}

      {session && (
        <div className="navbar-user-menu">
          <img
            src={session.user.image}
            alt={session.user.name}
            className="navbar-user-image"
          />
          <button onClick={() => signOut()}>Logout</button>
        </div>
      )}
    </>
  )
}

export default NavbarLogin