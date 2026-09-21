import React from 'react'

export default function Card({ as = 'div', className = '', padded = true, hover = false, children, ...rest }) {
  const Component = as
  return (
    <Component
      className={`rounded-2xl border border-line bg-white ${padded ? 'p-5 sm:p-6' : ''} ${
        hover ? 'transition-shadow duration-150 hover:shadow-lift' : 'shadow-soft'
      } ${className}`}
      {...rest}
    >
      {children}
    </Component>
  )
}
