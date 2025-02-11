import '@/styles/globals.css'

// Core imports
import { useEffect } from 'react'
import { useRouter } from 'next/compat/router'

// Auth imports
import { SessionProvider, useSession } from 'next-auth/react'

// Apollo imports
import { ApolloProvider } from '@apollo/client'
import client from '@/lib/apollo-client'

// Component imports
import { Base, Main } from '@/components/layout'
import { Toaster } from '@/ui/toaster'

// Types
type AppProps = {
  Component: React.ComponentType<any>
  pageProps: any
}

// Constants
const PUBLIC_PATHS = [
  '/auth/sign-in',
  '/auth/forgot-password',
  '/auth/sign-up',
] as const

// App Content Component
function AppContent({ Component, pageProps }: AppProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const isPublicPath = PUBLIC_PATHS.includes(
    router?.pathname as (typeof PUBLIC_PATHS)[number],
  )

  // Auth redirect effect
  useEffect(() => {
    if (status === 'loading') return
    if (session?.user && isPublicPath) {
      router?.push('/dashboard')
      return
    }
    if (!session?.user && !isPublicPath) {
      router?.push('/auth/sign-in')
    }
  }, [session, status, router, isPublicPath])

  if (status === 'loading') return null

  return (
    <ApolloProvider client={client}>
      {session ? (
        <Base>
          <Main>
            <Component {...pageProps} />
          </Main>
        </Base>
      ) : (
        <Component {...pageProps} />
      )}
      <Toaster />
    </ApolloProvider>
  )
}

// Root App Component
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppContent Component={Component} pageProps={pageProps} />
    </SessionProvider>
  )
}
