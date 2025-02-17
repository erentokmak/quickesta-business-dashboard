import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { addAccount, setActiveAccount } from '@/store/accountsSlice'
import Image from 'next/image'
import Link from 'next/link'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { Button } from '@/ui/button'
import { cn } from '@/lib/utils'
import { Label } from '@/ui/label'
import { Input } from '@/ui/input'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/ui/card'
import { useIsMobile } from '@/hooks/Responsive'
import { useToast } from '@/hooks/use-toast'
import { register } from '@/lib/api-v1/auth'
import { extractCountryCode, formatPhoneNumber } from '@/utils/formatters/phone'
import { ISignUpFormData, ISignUpFormErrors } from '@/types/auth'
import { TermsAndPrivacy } from '@/components/auth/terms-and-privacy'
import { validateSignUpFormFields } from '@/utils/validations/auth'

export default function SignUp() {
  const [formData, setFormData] = useState<ISignUpFormData>({
    name: '',
    surname: '',
    email: '',
    password: '',
    mobileNumber: '',
    countryCode: 90,
  })
  const [errors, setErrors] = useState<ISignUpFormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const isMobile = useIsMobile()
  const { toast } = useToast()
  const router = useRouter()
  const dispatch = useDispatch()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof ISignUpFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handlePhoneChange = (value: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: extractCountryCode(data.dialCode),
      mobileNumber: value,
    }))
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '' }))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validateSignUpFormFields(formData)
    if (!validation.isValid) {
      if (validation.fieldErrors) {
        setErrors(validation.fieldErrors as ISignUpFormErrors)
      }
      toast({
        variant: 'destructive',
        title: 'Form hatası',
        description: validation.error,
      })
      return
    }

    setIsLoading(true)

    try {
      const registerData = {
        ...formData,
        mobileNumber: formatPhoneNumber(
          formData.mobileNumber,
          formData.countryCode,
        ),
        confirmPassword: formData.password,
      }

      const response = await register(registerData)

      if (response.isSuccess) {
        toast({
          title: 'Kayıt başarılı!',
          description: 'Yönlendiriliyorsunuz...',
        })

        const signInResult = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        })

        if (signInResult?.error) {
          const errorData = JSON.parse(signInResult.error)
          toast({
            variant: 'destructive',
            title: errorData.message,
            description: errorData.detail,
          })
          return
        }

        // Get the session data
        const session = await getSession()
        if (!session?.user) {
          toast({
            title: 'Hata',
            description: 'Kullanıcı bilgileri alınamadı',
            variant: 'destructive',
          })
          return
        }

        // Add account to Redux store
        const accountData = {
          id: session.user.id,
          email: formData.email,
          name: session.user.name,
          surname: session.user.surname,
          phoneNumber: session.user.phoneNumber,
          username: formData.email,
          accessToken: session.user.accessToken,
          refreshToken: session.user.refreshToken,
          expiresIn: Date.now() + 3600000,
          roles: session.user.roles,
          permissions: session.user.permissions,
        }

        dispatch(addAccount(accountData))
        dispatch(setActiveAccount(accountData.id))

        router.push('/dashboard')
      } else {
        toast({
          variant: 'destructive',
          title: 'Kayıt başarısız',
          description: response.error || 'Bir hata oluştu.',
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Bir sorun oluştu',
        description: error.message || 'Lütfen daha sonra tekrar deneyiniz.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Ad</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Adınız"
            value={formData.name}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            required
            className={cn(errors.name && 'border-red-500')}
          />
          {errors.name && (
            <span className="text-xs text-red-500">{errors.name}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="surname">Soyad</Label>
          <Input
            id="surname"
            name="surname"
            type="text"
            placeholder="Soyadınız"
            value={formData.surname}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            required
            className={cn(errors.surname && 'border-red-500')}
          />
          {errors.surname && (
            <span className="text-xs text-red-500">{errors.surname}</span>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">E-posta</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="ornek@mail.com"
          value={formData.email}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          required
          className={cn(errors.email && 'border-red-500')}
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Şifre</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          required
          className={cn(errors.password && 'border-red-500')}
        />
        {errors.password && (
          <span className="text-xs text-red-500">{errors.password}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label>Telefon</Label>
        <PhoneInput
          country={'tr'}
          value={formData.mobileNumber}
          onChange={handlePhoneChange}
          onKeyDown={handleKeyDown}
          inputClass="!w-full !h-10 !text-base"
          containerClass="!w-full"
          buttonClass="!h-10 !border !border-input"
          dropdownClass="!w-[300px]"
          enableSearch
          searchPlaceholder="Ülke Ara..."
          searchNotFound="Ülke Bulunamadı"
          preferredCountries={['tr', 'us', 'gb', 'de']}
          inputProps={{
            name: 'phone',
            required: true,
            autoFocus: false,
          }}
        />
        {errors.phone && (
          <span className="text-xs text-red-500">{errors.phone}</span>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
      </Button>

      {!isMobile && (
        <div className="text-center text-sm">
          Zaten hesabınız var mı?{' '}
          <Link href="/auth/sign-in" className="underline underline-offset-4">
            Giriş Yap
          </Link>
        </div>
      )}
    </form>
  )

  if (isMobile) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/assets/images/brand-images/quickestaiconblue.png"
                alt="Quickesta"
                width={32}
                height={32}
                className="rounded-md"
              />
              <h1 className="text-xl font-bold">
                Quickesta&apos;ya Kayıt Olun
              </h1>
              <div className="text-center text-sm">
                Zaten hesabınız var mı?{' '}
                <Link
                  href="/auth/sign-in"
                  className="underline underline-offset-4"
                >
                  Giriş Yap
                </Link>
              </div>
            </div>

            {renderForm()}

            <TermsAndPrivacy />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <Image
            src="/assets/images/brand-images/quickestaiconwhite.png"
            alt="Quickesta"
            width={24}
            height={24}
            className="rounded-md bg-primary p-1"
          />
          <span>Quickesta</span>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Hesap Oluşturun</CardTitle>
            <CardDescription>
              Bilgilerinizi girerek hemen başlayın
            </CardDescription>
          </CardHeader>
          <CardContent>{renderForm()}</CardContent>
        </Card>
        <TermsAndPrivacy />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
