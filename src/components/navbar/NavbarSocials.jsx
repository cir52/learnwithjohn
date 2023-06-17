import Link from 'next/link';
import * as FaIcons from 'react-icons/fa'

const NavbarSocials = ({ navbarSocialsData }) => {

  return (
    <>
      {navbarSocialsData.map((item) => {
        const CurrentIcon = FaIcons[item.icon]
        return (
          item.link.blank ?
            <Link key={item._id} href={item.link.href} target="_blank" rel="noopener">
              <CurrentIcon className='text-xl hover:text-[#ed1b24]' />
            </Link> :
            <Link key={item._id} href={item.link.href}>
              <CurrentIcon />
            </Link>
        )
      })}
    </>
  )
}

export default NavbarSocials