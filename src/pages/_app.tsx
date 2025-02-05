import '../styles/globals.css'
import { useEffect } from 'react'
import {
  Base,
  Container,
  DetailPageActions,
  Footer,
  Header,
  Main,
  Sidebar,
  Wrapper,
} from '@/components/layout'
import dynamic from 'next/dynamic'
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/compat/router'
import { ApolloProvider } from '@apollo/client'
import client from '@/lib/apollo-client'
import { Toaster } from 'sonner'
import { ActionToolbar } from '@/ui/toolbar'
import { AnimatePresence } from 'framer-motion'

const GlobalInit = dynamic(() => import('@/components/GlobalInit'), {
  ssr: false,
})

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
  const hasToolbar = Object.keys(Component).some((key) =>
    ['title', 'breadcrumbs', 'actions'].includes(key),
  )
  const hasDetailPageActions = Object.keys(Component).includes(
    'hasDetailPageActions',
  )

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
      <AnimatePresence mode="wait">
        {session ? (
          <Base key={router?.pathname || '/'}>
            <Header />
            {!hasDetailPageActions && <Sidebar />}
            <Wrapper hasDetailPageActions={hasDetailPageActions}>
              {hasDetailPageActions && (
                <DetailPageActions
                  title={Component.title}
                  breadcrumbs={Component.breadcrumbs}
                  sections={Component.sections}
                  isHaveSaveButton={Component.isHaveSaveButton}
                  onSave={Component.onSave}
                />
              )}
              <Main>
                {!hasDetailPageActions && hasToolbar && (
                  <ActionToolbar {...Component} />
                )}
                <Container>
                  <Component {...pageProps} />
                </Container>
                <Footer />
              </Main>
            </Wrapper>
            <GlobalInit />
          </Base>
        ) : (
          <Component {...pageProps} />
        )}
      </AnimatePresence>
      <Toaster position="bottom-right" richColors duration={2000} />
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
