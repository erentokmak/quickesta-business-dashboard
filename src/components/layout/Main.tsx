import { motion } from 'framer-motion'
import React from 'react'
import { slideAnimation, getTransition } from '@/utils/animations'

interface MainProps {
  children: React.ReactNode
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <motion.main
      variants={slideAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={getTransition(0.2)}
      className="grow no-scrollbar scrollable-y"
      data-scrollable="true"
      data-scrollable-offset="40px"
      role="content"
    >
      {children}
    </motion.main>
  )
}

export default Main
