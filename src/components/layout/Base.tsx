import { motion } from 'framer-motion'
import React from 'react'
import { slideAnimation, getTransition } from '@/utils/animations'

interface BaseProps {
  children: React.ReactNode
}

const Base: React.FC<BaseProps> = ({ children }) => {
  return (
    <motion.div
      variants={slideAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={getTransition()}
      className="flex grow"
    >
      {children}
    </motion.div>
  )
}

export default Base
