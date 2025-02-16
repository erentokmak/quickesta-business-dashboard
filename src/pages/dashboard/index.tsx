import { AppSidebar } from '@/components/dashboard/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb'
import { Separator } from '@/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/ui/sidebar'
import { useSession } from 'next-auth/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { Button } from '@/ui/button'
import {
  User,
  Shield,
  Smartphone,
  Bell,
  Settings,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  const { data: session } = useSession()

  const settingsCards = [
    {
      title: 'Profil Ayarları',
      description: 'Kişisel bilgilerinizi güncelleyin',
      icon: User,
      href: '/settings/profile',
    },
    {
      title: 'Güvenlik',
      description: 'Şifre ve güvenlik ayarlarınızı yönetin',
      icon: Shield,
      href: '/settings/security',
    },
    {
      title: 'Cihaz Yönetimi',
      description: 'Bağlı cihazlarınızı görüntüleyin',
      icon: Smartphone,
      href: '/settings/devices',
    },
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Genel Bakış</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Hoş Geldiniz, {session?.user?.name}!</CardTitle>
              <CardDescription>
                Hesap ayarlarınızı ve güvenlik tercihlerinizi buradan
                yönetebilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {settingsCards.map((card) => (
                  <Link key={card.href} href={card.href}>
                    <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <card.icon className="h-6 w-6 text-muted-foreground" />
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h3 className="font-semibold">{card.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {card.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Hesap Durumu</CardTitle>
                <CardDescription>
                  Hesabınızın mevcut durumu ve doğrulama bilgileri
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">E-posta Doğrulaması</p>
                    <p className="text-sm text-muted-foreground">
                      {session?.user?.email}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-500"
                    disabled
                  >
                    Doğrulandı
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Telefon Doğrulaması</p>
                    <p className="text-sm text-muted-foreground">
                      {session?.user?.phoneNumber}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-500"
                    disabled
                  >
                    Doğrulandı
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Güvenlik Önerileri</CardTitle>
                <CardDescription>
                  Hesap güvenliğinizi artırmak için öneriler
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">
                    İki Faktörlü Doğrulama
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Hesabınızı daha güvenli hale getirmek için iki faktörlü
                    doğrulamayı etkinleştirin.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/settings/security">Şimdi Etkinleştir</Link>
                  </Button>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Şifre Güncellemesi</h4>
                  <p className="text-sm text-muted-foreground">
                    Güvenliğiniz için şifrenizi düzenli olarak değiştirmenizi
                    öneririz.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/settings/security">Şifre Değiştir</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
