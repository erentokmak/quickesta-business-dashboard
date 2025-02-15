import React from 'react'

interface BaseProps {
  children: React.ReactNode
}

const Base: React.FC<BaseProps> = ({ children }) => {
  return <div>{children}</div>
}

export default Base
