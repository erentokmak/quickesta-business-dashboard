import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'

export default function SSOPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const processSSO = async () => {
      try {
        const { token, redirect } = router.query

        // Token yoksa hata göster
        if (!token || typeof token !== 'string') {
          setError('Geçersiz token. SSO işlemi başarısız.')
          setIsProcessing(false)
          return
        }

        // Kullanıcı zaten giriş yapmışsa, yönlendir
        if (session) {
          const redirectPath = redirect ? String(redirect) : '/dashboard'
          router.push(redirectPath)
          return
        }

        // SSO ile giriş yap
        const result = await signIn('credentials', {
          redirect: false,
          ssoToken: token,
        })

        if (result?.error) {
          setError('Oturum açma işlemi başarısız oldu: ' + result.error)
          setIsProcessing(false)
          return
        }

        // Başarılı giriş sonrası yönlendirme
        const redirectPath = redirect ? String(redirect) : '/dashboard'
        router.push(redirectPath)
      } catch (err) {
        console.error('SSO Error:', err)
        setError('Bir hata oluştu. Lütfen tekrar deneyin.')
        setIsProcessing(false)
      }
    }

    if (router.isReady) {
      processSSO()
    }
  }, [router, router.isReady, session])

  if (isProcessing) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="mt-4 text-xl font-semibold">Oturum açılıyor...</h2>
        <p className="mt-2 text-muted-foreground">
          Lütfen bekleyin, kimlik bilgileriniz doğrulanıyor.
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="rounded-lg bg-destructive/10 p-6 text-center">
          <h2 className="text-xl font-semibold text-destructive">
            Oturum Açma Hatası
          </h2>
          <p className="mt-2 text-muted-foreground">{error}</p>
          <button
            className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground"
            onClick={() => router.push('/auth/sign-in')}
          >
            Giriş Sayfasına Dön
          </button>
        </div>
      </div>
    )
  }

  return null
} 