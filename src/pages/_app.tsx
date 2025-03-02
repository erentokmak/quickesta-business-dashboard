import '@/styles/globals.css'

// Core imports
import { useEffect } from 'react'
import { useRouter } from 'next/compat/router'

// Auth imports
import { SessionProvider, useSession } from 'next-auth/react'

// Redux imports
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/store'
import { useSelector } from 'react-redux'
import { selectAccounts } from '@/store/accountsSlice'

// Apollo imports
import { ApolloProvider } from '@apollo/client'
import client from '@/lib/apollo-client'

// Component imports
import { Base, Main } from '@/components/layout'
import { Toaster } from '@/ui/toaster'
import { ThemeProvider } from '@/components/layout/theme-provider'

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
  const accounts = useSelector(selectAccounts)

  const isPublicPath = PUBLIC_PATHS.includes(
    router?.pathname as (typeof PUBLIC_PATHS)[number],
  )
  const isAddAccountMode = router?.query?.mode === 'add'

  // Auth redirect effect
  useEffect(() => {
    if (status === 'loading') return

    // Allow access to sign-in page in add account mode even when logged in
    if (isAddAccountMode && router?.pathname === '/auth/sign-in') {
      return
    }

    // Normal auth flow
    if (session?.user && isPublicPath && !isAddAccountMode) {
      router?.push('/dashboard')
      return
    }

    // Only redirect to sign-in if there are no accounts
    if (!session?.user && !isPublicPath && accounts.length === 0) {
      router?.push('/auth/sign-in')
    }
  }, [session, status, router, isPublicPath, isAddAccountMode, accounts.length])

  if (status === 'loading') return null

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ApolloProvider client={client}>
        {session || accounts.length > 0 ? (
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
    </ThemeProvider>
  )
}

// Root App Component
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={pageProps.session}>
          <AppContent Component={Component} pageProps={pageProps} />
        </SessionProvider>
      </PersistGate>
    </Provider>
  )
}
