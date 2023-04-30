import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '../../public/assets/images/Logo.jpg'
import NavbarMenu from './navbar/NavbarMenu';
import NavbarSearch from './navbar/NavbarSearch';
import NavbarLogin from './navbar/NavbarLogin';
import NavbarSocials from './navbar/NavbarSocials';




const Navbar = () => {
    return (
        <div className='navbar backdrop-blur-md w-full flex justify-between item-center py-2 px-4'>
            <Link href='/'>
                <div className='w-[70px]'>
                    <Image 
                        className = 'cursor-pointer'
                        src = {Logo}
                        alt = 'Home'           
                    />
                </div>            
            </Link>
            <NavbarMenu />
            <NavbarSearch />
            <NavbarSocials />
            <NavbarLogin />         
        </div> 
    )
}

export default Navbar
