import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { addAccount, selectAccounts, setActiveAccount } from '@/store/accountsSlice'
import { useToast } from '@/hooks/use-toast'

/**
 * SSO Sign-in component that handles the SSO token from dashboard.visa.quickesta.com
 * This component is used to automatically sign in the user using the SSO token
 */
export const SSOSignIn = () => {
  const router = useRouter()
  const { toast } = useToast()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const accounts = useSelector(selectAccounts)
  const { data: session } = useSession()

  useEffect(() => {
    const handleSSOSignIn = async () => {
      try {
        // Get the SSO token from the URL
        const urlParams = new URLSearchParams(window.location.search)
        const ssoToken = urlParams.get('token')

        if (!ssoToken) {
          toast({
            title: 'Hata',
            description: 'SSO token bulunamadı',
            variant: 'destructive',
          })
          setIsLoading(false)
          return
        }

        // Sign in with the SSO token
        const result = await signIn('credentials', {
          ssoToken,
          redirect: false,
        })

        if (result?.error) {
          toast({
            title: 'Hata',
            description: 'SSO token ile giriş yapılamadı',
            variant: 'destructive',
          })
          setIsLoading(false)
          return
        }

        // Get the session data
        const sessionData = session?.user

        if (!sessionData) {
          toast({
            title: 'Hata',
            description: 'Kullanıcı bilgileri alınamadı',
            variant: 'destructive',
          })
          setIsLoading(false)
          return
        }

        // Check if account already exists
        const existingAccount = accounts.find(
          (acc) => acc.email === sessionData.email
        )

        // Add account to Redux store if it doesn't exist
        if (!existingAccount) {
          const accountData = {
            id: sessionData.id,
            email: sessionData.email,
            name: sessionData.name,
            surname: sessionData.surname,
            phoneNumber: sessionData.phoneNumber,
            username: sessionData.username,
            accessToken: sessionData.accessToken,
            refreshToken: sessionData.refreshToken,
            expiresIn: sessionData.expiresIn,
            roles: sessionData.roles,
            permissions: sessionData.permissions,
          }

          dispatch(addAccount(accountData))
          dispatch(setActiveAccount(accountData.id))
        } else {
          // Set the existing account as active
          dispatch(setActiveAccount(existingAccount.id))
        }

        // Redirect to dashboard
        router.push('/dashboard?sso=true')
      } catch (error) {
        console.error('SSO Sign-in Error:', error)
        toast({
          title: 'Hata',
          description: 'SSO ile giriş yapılırken bir hata oluştu',
          variant: 'destructive',
        })
        setIsLoading(false)
      }
    }

    if (window.location.search.includes('token=')) {
      handleSSOSignIn()
    } else {
      setIsLoading(false)
    }
  }, [dispatch, router, toast, accounts, session])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-lg font-medium">Giriş yapılıyor...</p>
        </div>
      </div>
    )
  }

  return null
} 