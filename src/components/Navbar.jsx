import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, GoogleLogout } from '@react-oauth/google'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import Logo from '../assets/images/Logo.jpg'




const Navbar = () => {
    return (
        <div className='navbar w-full flex justify-between item-center py-2 px-4'>
            <Link href='/'>
                <div className='w-[70px]'>
                    <Image 
                        className = 'cursor-pointer'
                        src = {Logo}
                        alt = 'Home'
                        Layout = 'responsive'             
                    />
                </div>            
            </Link>          
        </div> 
    )
}

export default Navbar
