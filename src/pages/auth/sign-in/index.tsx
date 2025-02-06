import { useState } from 'react'
import { getCsrfToken, signIn } from 'next-auth/react'
import Image from 'next/image'
import { toast } from 'sonner'

export default function SignIn({ csrfToken }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
        remember: true,
      })

      if (result?.error) {
        try {
          const errorData = JSON.parse(result.error)
          toast.error(errorData.detail || 'Giriş başarısız oldu.', {
            description: errorData.title
              ? `${errorData.title} (${errorData.status})`
              : undefined,
          })
        } catch {
          const errorData = JSON.parse(result.error)
          toast.error(errorData.detail || 'Giriş başarısız oldu.', {
            description: errorData.title
              ? `${errorData.title} (${errorData.status})`
              : undefined,
          })
        }
        setIsLoading(false)
      } else {
        toast.success('Giriş başarılı!')
        setIsLoading(false)
      }
    } catch (error) {
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.', {
        description: error.message ? error.message : undefined,
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center grow bg-center bg-no-repeat page-bg">
      <div className="card max-w-[370px] w-full">
        <form
          onSubmit={handleSubmit}
          className="card-body flex flex-col gap-4 p-7"
          method="post"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

          <div className="text-center">
            <div>
              <Image
                src="/assets/primaryLogo.png"
                alt="Logo"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="form-label font-normal text-gray-900">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                Email
              </span>
            </label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              placeholder="Emailinizi girin"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-1">
              <label className="form-label font-normal text-gray-900">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Şifre
                </span>
              </label>
            </div>
            <div className="input" data-toggle-password="true">
              <input
                name="password"
                placeholder="Şifrenizi girin"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className="btn btn-icon"
                data-toggle-password-trigger="true"
                type="button"
              >
                <i className="ki-filled ki-eye text-gray-500 toggle-password-active:hidden"></i>
                <i className="ki-filled ki-eye-slash text-gray-500 hidden toggle-password-active:block"></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary flex justify-center grow"
            disabled={isLoading}
          >
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: (await getCsrfToken(context)) || null,
    },
  }
}
