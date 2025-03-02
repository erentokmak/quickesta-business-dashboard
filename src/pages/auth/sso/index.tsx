import { SSOSignIn } from '@/components/auth/sso-sign-in'
import Head from 'next/head'

/**
 * SSO page that handles the SSO token from dashboard.visa.quickesta.com
 * This page is used to automatically sign in the user using the SSO token
 */
export default function SSOPage() {
  return (
    <>
      <Head>
        <title>Quickesta Visa Dashboard - SSO Giriş</title>
        <meta name="description" content="Quickesta Visa Dashboard SSO Giriş" />
      </Head>
      <SSOSignIn />
    </>
  )
} 