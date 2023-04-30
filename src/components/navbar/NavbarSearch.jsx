import React from 'react'

const NavbarSearch = () => {


  const handleSearch = () => {

  }

  return (
    <div className = 'navbar-search relative hidden md:block'>
      <form
        className = 'absolute md:static top-10 -left-20'
        onSubmit = {handleSearch}        
      >
        <input
          className = 'navbar-search-input bg-blue-50 p-2 md:text-md border border-gray-300 focus:outline-none focus:border focus:border-[#140eae] w-[300px] md:w-[350px] rounded-md md:top-0'
          type = 'text'
          value = ''
          onChange = { () => {}}
          placeholder = 'Search'
        />
      </form>
    </div>
  )
}

export default NavbarSearch