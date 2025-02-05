export function isDevEnv() {
  return process.env.NEXT_PUBLIC_APP_ENV === 'development'
}

export function isMobile() {
  return window.innerWidth < 768
}
