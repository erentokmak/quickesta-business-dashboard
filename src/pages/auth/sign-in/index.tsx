import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
import { TermsAndPrivacy } from '@/components/auth/terms-and-privacy'
import { emailSchema, passwordSchema } from '@/utils/validations/auth'

export default function SignIn() {
  const router = useRouter()
  const { toast } = useToast()
  const isMobile = useIsMobile()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    }

    try {
      emailSchema.parse(formData.email)
    } catch (error: any) {
      newErrors.email = error.errors[0].message
    }

    try {
      passwordSchema.parse(formData.password)
    } catch (error: any) {
      newErrors.password = error.errors[0].message
    }

    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
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
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: 'Hata',
          description: 'E-posta veya şifre hatalı',
          variant: 'destructive',
        })
        return
      }

      router.push('/dashboard')
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
      </Button>

      <div className="text-center text-sm">
        Hesabınız yok mu?{' '}
        <a href="/auth/sign-up" className="underline underline-offset-4">
          Kayıt Ol
        </a>
      </div>
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
                Quickesta&apos;ya Giriş Yapın
              </h1>
              <div className="text-center text-sm">
                Hesabınız yok mu?{' '}
                <a
                  href="/auth/sign-up"
                  className="underline underline-offset-4"
                >
                  Kayıt Ol
                </a>
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
            <CardTitle className="text-xl">Giriş Yapın</CardTitle>
            <CardDescription>Bilgilerinizi girerek giriş yapın</CardDescription>
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
