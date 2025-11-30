import React from 'react'

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${
        hover ? 'hover:shadow-md transition-shadow duration-200 cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card