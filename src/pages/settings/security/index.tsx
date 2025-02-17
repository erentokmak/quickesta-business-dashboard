'use client'

import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Input } from '@/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { Switch } from '@/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { PageHeader } from '@/components/layout/PageHeader'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: 'Mevcut şifre gereklidir.',
    }),
    newPassword: z
      .string()
      .min(8, {
        message: 'Şifre en az 8 karakter olmalıdır.',
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            'Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.',
        },
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Şifreler eşleşmiyor.',
    path: ['confirmPassword'],
  })

type PasswordFormValues = z.infer<typeof passwordFormSchema>

export default function SecuritySettingsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data: PasswordFormValues) {
    toast({
      title: 'Şifre güncellendi',
      description: 'Şifreniz başarıyla güncellendi.',
    })
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader
          title="Güvenlik"
          items={[{ title: 'Ayarlar', href: '/settings' }]}
        />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Şifre Yönetimi</CardTitle>
              <CardDescription>
                Hesap şifrenizi buradan güncelleyebilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mevcut Şifre</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="************"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yeni Şifre</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="************"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          En az 8 karakter, bir büyük harf, bir küçük harf, bir
                          rakam ve bir özel karakter içermelidir.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yeni Şifre (Tekrar)</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="************"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Şifreyi Güncelle</Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>İki Faktörlü Doğrulama</CardTitle>
              <CardDescription>
                Hesabınızın güvenliğini artırmak için iki faktörlü doğrulama
                yöntemlerini yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium">SMS ile Doğrulama</h4>
                  <p className="text-sm text-muted-foreground">
                    Her girişte telefonunuza SMS ile doğrulama kodu gönderilir.
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between space-x-4">
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium">Authenticator Uygulaması</h4>
                  <p className="text-sm text-muted-foreground">
                    Google Authenticator veya benzeri bir uygulama ile
                    doğrulama.
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between space-x-4">
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium">Passkey</h4>
                  <p className="text-sm text-muted-foreground">
                    Biyometrik veya cihaz tabanlı güvenli giriş yöntemi.
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
