
import React from 'react'
import MyPortableText from './MyPortableText';

const HomePage = ({homeData}) => {

   return (
      <div className = 'mx-5 md:mx-10'>
         <MyPortableText blocks={homeData[0].content} />
      </div>
   )
}

export default HomePage