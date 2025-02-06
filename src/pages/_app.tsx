import '../styles/globals.css'
import { useEffect } from 'react'
import { Base, Main } from '@/components/layout'
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/compat/router'
import { ApolloProvider } from '@apollo/client'
import client from '@/lib/apollo-client'

const PUBLIC_PATHS = [
  '/auth/sign-in',
  '/auth/forgot-password',
  '/auth/sign-up',
] as const

function AppContent({
  Component,
  pageProps,
}: {
  Component: any
  pageProps: any
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const currentPath = router?.pathname || ''
  const isPublicPath = PUBLIC_PATHS.includes(
    currentPath as (typeof PUBLIC_PATHS)[number],
  )
  const isLoading = status === 'loading'
  useEffect(() => {
    if (isLoading) return

    if (session?.user && isPublicPath) {
      router?.push('/')
      return
    }

    if (!session?.user && !isPublicPath) {
      router?.push('/auth/sign-in')
    }
  }, [session, isLoading, router, isPublicPath])

  if (isLoading) return null

  return (
    <ApolloProvider client={client}>
      {session ? (
        <Base key={router?.pathname || '/'}>
          <Main>
            <Component {...pageProps} />
          </Main>
        </Base>
      ) : (
        <Component {...pageProps} />
      )}
    </ApolloProvider>
  )
}

export default function App({
  Component,
  pageProps,
}: {
  Component: any
  pageProps: any
}) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppContent Component={Component} pageProps={pageProps} />
    </SessionProvider>
  )
}
