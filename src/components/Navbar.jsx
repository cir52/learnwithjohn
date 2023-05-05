import React, { useState } from 'react';
import NavbarMenu from './navbar/NavbarMenu';
import NavbarSearch from './navbar/NavbarSearch';
import NavbarLogin from './navbar/NavbarLogin';
import NavbarSocials from './navbar/NavbarSocials';
import Hamburger from 'react-hamburger-menu'
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/assets/images/Logo.jpg'

const Navbar = ({ onToggleSidebar }) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
      setIsOpen(!isOpen)
      onToggleSidebar(!isOpen)
    }

    return (
        <div className='navbar h-[4.5rem] w-full fixed top-0 flex gap-4 justify-between items-center py-2 px-4 xl:pr-8 cursor-pointer'> 
            <div className='navbar-menu flex justify-between text-center items-center text-sm md:text-base'>
                <Link href='/'>
                    <Image
                    className='cursor-pointer w-[60px] md:w-[70px]'
                    src={Logo}
                    alt='Home'
                    />
                </Link>        
                <NavbarMenu />
            </div>
            <div className='hidden md:block'>
                <NavbarSearch />
            </div>

            <div className='navbar-socials hidden lg:flex xl:gap-10 2xl:gap-16 gap-6 justify-around mx-5 items-center'>
                <NavbarSocials />
            </div>
            <div className='flex items-center gap-5'>
                <div className='navbar-socials flex gap-2'>
                    <NavbarLogin />
                </div>

                <div className="block md:hidden">
                    <Hamburger 
                    isOpen={isOpen}
                    menuClicked={handleToggle}
                    width={18}
                    height={15}
                    strokeWidth={3}
                    rotate={0}
                    color="#140eae"
                    borderRadius={0}
                    animationDuration={0.3}
                    />
                </div>
            </div>   
        </div> 
    )
}

export default Navbar
