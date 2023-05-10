// components/BlurBackground.js
import React from 'react'

const BlurBackground = ({ children, blur }) => {
  return (
    <div
      className={`w-full transition-all duration-300 ease-in-out ${
        blur ? 'filter blur-md' : ''
      }`}
    >
      {children}
    </div>
  )
}

export default BlurBackground
