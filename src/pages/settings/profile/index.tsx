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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { PageHeader } from '@/components/layout/PageHeader'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Ad en az 2 karakter olmalıdır.',
    })
    .max(30, {
      message: 'Ad en fazla 30 karakter olabilir.',
    }),
  surname: z
    .string()
    .min(2, {
      message: 'Soyad en az 2 karakter olmalıdır.',
    })
    .max(30, {
      message: 'Soyad en fazla 30 karakter olabilir.',
    }),
  email: z
    .string()
    .min(1, {
      message: 'E-posta adresi gereklidir.',
    })
    .email('Geçerli bir e-posta adresi giriniz.'),
  phone: z
    .string()
    .min(1, {
      message: 'Telefon numarası gereklidir.',
    })
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: 'Geçerli bir telefon numarası giriniz.',
    }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfileSettingsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()

  // Dummy data (session'dan gelen verilerle değiştirilecek)
  const defaultValues: Partial<ProfileFormValues> = {
    name: session?.user?.name || 'John',
    surname: session?.user?.surname || 'Doe',
    email: session?.user?.email || 'john.doe@example.com',
    phone: session?.user?.phoneNumber || '+905555555555',
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'Profil güncellendi',
      description: 'Profil bilgileriniz başarıyla güncellendi.',
    })
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader
          title="Profil"
          items={[{ title: 'Ayarlar', href: '/settings' }]}
        />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Profil</CardTitle>
              <CardDescription>
                Kişisel bilgilerinizi buradan güncelleyebilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src="/assets/images/brand-images/quickestaiconblue.png"
                    alt={defaultValues.name}
                  />
                  <AvatarFallback>
                    {defaultValues.name?.[0]}
                    {defaultValues.surname?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-semibold">Profil Fotoğrafı</h3>
                  <p className="text-sm text-muted-foreground">
                    PNG veya JPG formatında, maksimum 4MB boyutunda.
                  </p>
                  <Button variant="outline" size="sm">
                    Fotoğraf Değiştir
                  </Button>
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ad</FormLabel>
                          <FormControl>
                            <Input placeholder="Adınız" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="surname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Soyad</FormLabel>
                          <FormControl>
                            <Input placeholder="Soyadınız" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-posta</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="ornek@mail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Bu e-posta adresi giriş için kullanılacaktır.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefon</FormLabel>
                        <FormControl>
                          <Input placeholder="+90 555 555 55 55" {...field} />
                        </FormControl>
                        <FormDescription>
                          Doğrulama ve güvenlik için kullanılacaktır.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Değişiklikleri Kaydet</Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hesap Doğrulama Durumu</CardTitle>
              <CardDescription>
                Hesabınızın doğrulama durumunu buradan görebilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">E-posta Doğrulaması</h3>
                  <p className="text-sm text-muted-foreground">
                    E-posta adresiniz doğrulandı
                  </p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Doğrulandı
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">Telefon Doğrulaması</h3>
                  <p className="text-sm text-muted-foreground">
                    Telefon numaranız doğrulandı
                  </p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Doğrulandı
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
