import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import  { BiSearch } from 'react-icons/bi'
import algoliaIndex from '../../../algoliaClient'

const NavbarSearch = () => {

  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = async (e) => {

    setSearchValue(e.target.value)
    
    const query = e.target.value;

    if (!query) {
      setSearchResults([]);
      return;
    }

    const { hits } = await algoliaIndex.search(query);
    setSearchResults(hits);
  };
  
  const router = useRouter();

  const handleSearchSubmit = (e) => {
    e.preventDefault()    
    if (searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }

  return (
    <div className = 'search-input-container relative text-[#140eae]'>
      <form
        onSubmit = {handleSearchSubmit}        
      >
        <input
          className = 'w-full navbar-search-input bg-blue-50 pl-4 p-2 pr-[65px] md:text-md border border-blue-200 focus:outline-none focus:border-[#140eae] rounded-xl md:rounded-full md:w-[200px] lg:w-[280px] xl:w-[350px] 2xl:w-[450px] placeholder-[#140eae66]'
          type = 'text'
          value = {searchValue}
          onChange = { handleSearch }
          placeholder = 'Search'
        />
        
        <button
          onClick = {handleSearchSubmit}
          className = 'absolute md:right-3 text-[#140eae77] right-4 border-l-2 border-blue-200 my-2 pl-4 text-2xl'
        >
          <BiSearch className = 'hover:text-[#ed1b24] pt-[2px]'/>
        </button>
        <ul className='absolute text-[#140eae] shadow-lg '>
          {searchResults.map((result) => (
            <li key={result.objectID}>
              <h3>
                <a href={`/${result.slug}`}>{result.title}</a>
              </h3>
              <div>
                {result.content.map((item, index) => {
                  if (item._type === 'block') {
                    return <p key={index}>{item.text}</p>;
                  } else if (item._type === 'image') {
                    return (
                      <img
                        key={index}
                        src={item.imageUrl}
                        alt={item.alt}
                        width="100"
                        height="100"
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </li>
          ))}
        </ul>

      </form>
    </div>
  )
}

export default NavbarSearch