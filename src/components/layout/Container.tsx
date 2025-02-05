import React from 'react'

interface ContainerProps {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container-fixed">
      <div className="grid gap-5 lg:gap-7.5">{children}</div>
    </div>
  )
}

export default Container
