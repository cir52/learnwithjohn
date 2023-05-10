import React, { useState, useEffect } from 'react'
import algoliaIndex from '../../algoliaClient'
import Link from 'next/link'

const Search = ({ query }) => {

   const [searchResults, setSearchResults] = useState([])
   const queryString = decodeURI(query).substring(1)

   useEffect(() => {
      async function searchAlgolia() {
         const { hits } = await algoliaIndex.search(queryString)
         setSearchResults(hits)
      }
      if (queryString) {
         searchAlgolia()
      } else {
         setSearchResults([])
      }
   }, [queryString])

   return (
      <div className='search-result-container text-[#140eae]'>
         <div>
            <h1>Search Results {(searchResults.length > 0) && `(${searchResults.length})`}</h1>
         </div>
         <ul className='mt-[1.1rem] text-lg'> 
         {searchResults.length > 0 ?
            searchResults.map((result) => (
               <li key={result.objectID}>
                  <h3>
                     <Link href={`/${result.slug}`}>{result.title}</Link>
                  </h3>
                  {/* handle the search result to show a small paragraph with the match */}
                  {result._highlightResult.content && (
                     <div className='search-result-text text-gray-800 text-base pt-2'>
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
                                 const start = Math.max(0, matchPosition - 100);
                                 const end = Math.min(item.text.value.length, matchPosition + item.text.matchedWords[0].length + 100);
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
                  <hr className='block text-[#140eae88] h-[2px] !my-3' />
               </li>
            )) :
            <li>
               <h3><b>0</b> Results for {`&quot;${queryString}&quot;`}</h3>
            </li>
            }
         </ul>
      </div>
   )
}

export default Search