import { motion } from 'framer-motion'
import React from 'react'
import { slideAnimation, getTransition } from '@/utils/animations'

interface WrapperProps {
  children: React.ReactNode
  hasDetailPageActions?: boolean
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  hasDetailPageActions,
}) => {
  return (
    <>
      <style jsx global>{`
        :root {
          --sidebar-transition: margin-left 0.3s ease-in-out;
        }
        main {
          transition: var(--sidebar-transition);
        }
      `}</style>

      <motion.div
        variants={slideAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={getTransition(0.1)}
        className="flex grow flex-col pt-[--tw-header-height] lg:pt-0"
      >
        <div
          id="scrollable_content"
          className={`flex flex-col grow items-stretch rounded-xl bg-[--tw-content-bg] dark:bg-[--tw-content-bg-dark] border border-gray-300 dark:border-gray-200 mt-0 ${
            hasDetailPageActions ? 'ml-[15px]' : ''
          } lg:mt-[15px] m-[15px] ${
            !hasDetailPageActions ? 'pt-5 lg:ms-[var(--sidebar-margin)]' : ''
          }  no-scrollbar scrollable-y`}
        >
          {children}
        </div>
      </motion.div>
    </>
  )
}

export default Wrapper
