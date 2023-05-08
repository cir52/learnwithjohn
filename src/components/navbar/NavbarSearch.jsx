import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react'
import { BiSearch } from 'react-icons/bi'
import algoliaIndex from '../../../algoliaClient'

const NavbarSearch = () => {

  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false)

  const searchContainerRef = useRef();
  const debounceTimeoutRef = useRef();

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    const query = e.target.value;

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (!query) {
      setSearchResultsVisible(false)
      setSearchResults([]);
      return;
    }

    // Debounce function to reduce the amount of queries to algolia (waiting fo x ms to send the query after the user stops typing)
    debounceTimeoutRef.current = setTimeout(async () => {
      const { hits } = await algoliaIndex.search(query)
      setSearchResults(hits)
      if (!searchResultsVisible) {
        setSearchResultsVisible(true)
      }
    }, 300); // Adjust the debounce time as needed (500ms default)
  };

  const router = useRouter();

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }

  const handleClickOutside = (e) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
      setSearchResultsVisible(false);
    }
  };

  const handleEscapePress = (e) => {
    if (e.key === 'Escape') {
      setSearchResultsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapePress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, []);

  return (
    <div
      className='search-input-container relative text-[#140eae]'
      ref={searchContainerRef}
    >
      <form
        onSubmit={handleSearchSubmit}
      >
        <input
          className='w-full navbar-search-input bg-blue-50 md:pl-4 p-2 pr-[65px] md:text-md border border-blue-200 focus:outline-none focus:border-[#140eae55] rounded-xl md:rounded-full md:w-[200px] lg:w-[280px] xl:w-[350px] 2xl:w-[450px] placeholder-[#140eae66]'
          type='text'
          value={searchValue}
          onChange={handleSearch}
          onFocus={searchValue.length > 0 ? () => setSearchResultsVisible(true) : () => setSearchResultsVisible(false)}
          placeholder='Search'
        />
        <button
          onClick={handleSearchSubmit}
          className='absolute md:right-3 text-[#140eae77] right-2 border-l-2 border-blue-200 my-2 pl-2 md:pl-4 text-2xl'
        >
          <BiSearch className='hover:text-[#ed1b24] pt-[2px]' />
        </button>
        {searchResultsVisible && <ul
          className='z-20 absolute text-[#140eae] shadow-lg max-h-[40vh] overflow-y-auto search-results-list px-[0.5rem] md:px-[0.8rem]'
        > {searchResults.length > 0 ?
            searchResults.map((result) => (
            <li key={result.objectID}>
              <h3>
                <a href={`/${result.slug}`}>{result.title}</a>
              </h3>
              {/* handle the search result to show a small paragraph with the match */}
              {result._highlightResult.content && (
                <div className='search-result-text text-gray-800 text-sm pt-1'>
                  {result._highlightResult.content
                    .filter((item) => item.text.matchLevel !== 'none')
                    .slice(0, 1)
                    .map((item, index) => {
                      const sentences = item.text.value.match(/[^.!?]+[.!?]+/g); // Match sentences using regex
                      let matchedSentenceIndex = -1;
                      let resultText = '';

                      if (sentences) {                       
                        // Find the index of the matched sentence                        
                        for (let i = 0; i < sentences.length; i++) {
                          console.log(sentences[i] + ' ' + item.text.matchedWords[0])
                          if (sentences[i].toLowerCase().includes(item.text.matchedWords[0])) {
                            matchedSentenceIndex = i;
                            break;
                          }
                        }                     

                        if (matchedSentenceIndex !== -1) {
                          resultText = sentences[matchedSentenceIndex];
                          if (matchedSentenceIndex + 1 < sentences.length) {
                            resultText += ' ' + sentences[matchedSentenceIndex + 1];
                          }
                        } 
                      } 
                      // no sentences - so just get 50 characters before and after the match
                      else {
                        const matchPosition = item.text.value.indexOf(item.text.matchedWords[0]);
                        const start = Math.max(0, matchPosition - 50);
                        const end = Math.min(item.text.value.length, matchPosition + item.text.matchedWords[0].length + 50);
                        resultText = (start > 0 ? '...' : '') + item.text.value.slice(start, end) + (end < item.text.value.length ? '...' : '');
                      }
                      
                      return (
                        <span
                          key={index}
                          dangerouslySetInnerHTML={{
                            __html: resultText,
                          }}
                        ></span>
                      );
                    })}
                </div>
              )}
            </li>
          )) :
          <li>
            <h3>found 0 Results</h3>
          </li>
          }
        </ul>
        }
      </form>
    </div>
  )
}

export default NavbarSearch