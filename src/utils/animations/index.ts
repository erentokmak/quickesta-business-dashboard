import { Variants } from 'framer-motion'

export const slideAnimation: Variants = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 }
}

export const getTransition = (delay: number = 0) => ({
  duration: 0.3,
  ease: "easeInOut",
  delay
}) 