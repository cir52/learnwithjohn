import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link' 
import GoogleLogin from '@react-oauth/google'
import { AiFillHome, AiOutlineMenu} from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import Menu from './Menu'

const Sidebar = () => {

  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <div>
      <div 
        className = 'block xl:hidden m-1 ml-4 mt-3 text-xl'
        onClick = {() => setShowSidebar((value) => !value)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu /> }
      </div>
      {
        showSidebar && (
          <div  className = 'xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
            <Menu />
          </div>
        )
      }
    </div>
  )
}

export default Sidebar