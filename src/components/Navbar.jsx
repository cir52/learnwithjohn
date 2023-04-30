import React from 'react';
import NavbarMenu from './navbar/NavbarMenu';
import NavbarSearch from './navbar/NavbarSearch';
import NavbarLogin from './navbar/NavbarLogin';
import NavbarSocials from './navbar/NavbarSocials';

const Navbar = () => {
    return (
        <div className='navbar h-[4.5rem] w-full fixed top-0 flex justify-between items-center py-2 px-4'>         
            <NavbarMenu />
            <NavbarSearch />
            <NavbarSocials />
            <NavbarLogin />         
        </div> 
    )
}

export default Navbar
