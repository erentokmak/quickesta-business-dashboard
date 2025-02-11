import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/ui/button'
import { cn } from '@/lib/utils'
import { Label } from '@/ui/label'
import { Input } from '@/ui/input'
import { GalleryVerticalEnd } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/ui/card'
import { useIsMobile } from '@/hooks/Responsive'
import { useToast } from '@/hooks/use-toast'

export default function SignIn({}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const isMobile = useIsMobile()
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      })

      if (result?.error) {
        const errorData = JSON.parse(result.error)
        toast({
          variant: 'destructive',
          title: errorData.message,
          description: errorData.detail,
        })
        return
      }

      toast({
        title: 'Giriş başarılı!',
        description: 'Ana sayfaya yönlendiriliyorsunuz...',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Bir sorun oluştu',
        description: 'Lütfen daha sonra tekrar deneyiniz.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Mobil tasarım
  if (isMobile) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className={cn('flex flex-col gap-6')}>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                  <a
                    href="#"
                    className="flex flex-col items-center gap-2 font-medium"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md">
                      <GalleryVerticalEnd className="size-6" />
                    </div>
                    <span className="sr-only">Quickesta</span>
                  </a>
                  <h1 className="text-xl font-bold">
                    Quickesta&apos;ya Hoş Geldiniz
                  </h1>
                  <div className="text-center text-sm">
                    Hesabınız yok mu?{' '}
                    <a href="#" className="underline underline-offset-4">
                      Kayıt Ol
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="username"
                      type="email"
                      placeholder="ornek@mail.com"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Şifre</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                  </Button>
                </div>
              </div>
            </form>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
              Devam ederek <a href="#">Kullanım Koşulları</a> ve{' '}
              <a href="#">Gizlilik Politikası</a>&apos;nı kabul etmiş olursunuz.
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Desktop tasarım
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Quickesta
        </a>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Tekrar Hoş Geldiniz</CardTitle>
            <CardDescription>
              Apple veya Google hesabınızla giriş yapın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="username"
                      type="email"
                      placeholder="ornek@mail.com"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Şifre</Label>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Şifremi unuttum
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Hesabınız yok mu?{' '}
                  <a href="#" className="underline underline-offset-4">
                    Kayıt Ol
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
          Devam ederek <a href="#">Kullanım Koşulları</a> ve{' '}
          <a href="#">Gizlilik Politikası</a>&apos;nı kabul etmiş olursunuz.
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
