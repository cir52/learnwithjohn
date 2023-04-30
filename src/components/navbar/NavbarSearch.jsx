import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import  { BiSearch } from 'react-icons/bi'

const NavbarSearch = () => {

  const [searchValue, setSearchValue] = useState('')
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault()
    
    if (searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }

  return (
    <div className = 'navbar-search relative hidden md:block'>
      <form
        className = 'absolute md:static top-10 -left-20'
        onSubmit = {handleSearch}        
      >
        <input
          className = 'navbar-search-input bg-blue-50 pl-4 p-2 md:text-md border border-blue-200 focus:outline-none focus:border-1 focus:border-[#140eae] w-[300px] md:w-[350px] rounded-full md:top-0'
          type = 'text'
          value = {searchValue}
          onChange = { (e) => setSearchValue(e.target.value) }
          placeholder = 'Search'
        />
        <button
          onClick = {handleSearch}
          className = 'absolute md:right-3 text-[#140eae77] right-4 border-l-2 border-blue-200 my-2 pl-4 text-2xl'
        >
          <BiSearch className = 'pt-[2px]'/>
        </button>
      </form>
    </div>
  )
}

export default NavbarSearch