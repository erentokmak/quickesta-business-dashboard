'use client'
import { useEffect, useState } from 'react'

const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
} as const

interface ScreenSize {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  width: number | null
}

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: null,
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setScreenSize({
        isMobile: width <= BREAKPOINTS.mobile,
        isTablet: width > BREAKPOINTS.mobile && width <= BREAKPOINTS.tablet,
        isDesktop: width > BREAKPOINTS.tablet,
        width,
      })
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return screenSize
}

// Backwards compatibility için eski hook'u tutuyoruz
export function useIsMobile() {
  const { isMobile } = useScreenSize()
  return isMobile
}
