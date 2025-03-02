import React from 'react'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { PageHeader } from '@/components/layout/PageHeader'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'
import { useSession } from 'next-auth/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { Button } from '@/ui/button'
import { Badge } from '@/ui/badge'
import { ExternalLink, AppWindow, Check, Clock, Code } from 'lucide-react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Separator } from '@/ui/separator'

interface Application {
  id: string
  name: string
  description: string
  url: string
  logo: string
  status: 'active' | 'pending' | 'development' | 'inactive'
  category: 'business' | 'development' | 'productivity'
}

export default function ApplicationsPage() {
  const { data: session } = useSession()

  // Uygulama verileri
  const applications: Application[] = [
    {
      id: 'visa',
      name: 'Quickesta Visa',
      description:
        'Vize başvuru ve takip sistemi. Vize başvurularınızı kolayca yönetin ve durumlarını takip edin.',
      url: 'https://dashboard.visa.quickesta.com',
      logo: '/assets/images/brand-images/quickestavisabluelogowithoutblank.png',
      status: 'active',
      category: 'business',
    },
    {
      id: 'crm',
      name: 'Quickesta CRM',
      description:
        'Müşteri ilişkileri yönetim sistemi. Müşterilerinizle olan tüm etkileşimlerinizi tek bir yerden yönetin.',
      url: 'https://crm.quickesta.com',
      logo: '/assets/images/brand-images/quickestabluelogowithoutblank.png',
      status: 'development',
      category: 'business',
    },
    {
      id: 'analytics',
      name: 'Quickesta Analytics',
      description:
        'Veri analiz platformu. İş verilerinizi analiz edin ve önemli içgörüler elde edin.',
      url: 'https://analytics.quickesta.com',
      logo: '/assets/images/brand-images/quickestabluelogowithoutblank.png',
      status: 'development',
      category: 'business',
    },
    {
      id: 'docs',
      name: 'Quickesta Docs',
      description:
        'Belge yönetim sistemi. Tüm belgelerinizi güvenli bir şekilde saklayın ve paylaşın.',
      url: 'https://docs.quickesta.com',
      logo: '/assets/images/brand-images/quickestabluelogowithoutblank.png',
      status: 'pending',
      category: 'productivity',
    },
    {
      id: 'dev',
      name: 'Quickesta Dev',
      description:
        "Geliştirici portalı. API'lerimize erişin ve entegrasyonlarınızı yönetin.",
      url: 'https://dev.quickesta.com',
      logo: '/assets/images/brand-images/quickestabluelogowithoutblank.png',
      status: 'development',
      category: 'development',
    },
    {
      id: 'pay',
      name: 'Quickesta Pay',
      description:
        'Ödeme sistemi. Güvenli ve hızlı ödeme işlemleri gerçekleştirin.',
      url: 'https://pay.quickesta.com',
      logo: '/assets/images/brand-images/qpay.png',
      status: 'pending',
      category: 'business',
    },
    {
      id: 'pos',
      name: 'Quickesta POS',
      description:
        'Satış noktası yönetim sistemi. Satışlarınızı kolayca yönetin.',
      url: 'https://pos.quickesta.com',
      logo: '/assets/images/brand-images/qpos.png',
      status: 'development',
      category: 'business',
    },
    {
      id: 'business',
      name: 'Quickesta Business',
      description:
        'İşletme yönetim platformu. İşletmenizi tek bir yerden yönetin.',
      url: 'https://business.quickesta.com',
      logo: '/assets/images/brand-images/qbusiness.png',
      status: 'pending',
      category: 'business',
    },
    {
      id: 'experts',
      name: 'Quickesta Experts',
      description:
        'Uzman danışmanlık platformu. Alanında uzman kişilerle bağlantı kurun.',
      url: 'https://experts.quickesta.com',
      logo: '/assets/images/brand-images/qexperts.png',
      status: 'development',
      category: 'productivity',
    },
  ]

  const handleApplicationClick = (app: Application) => {
    if (!session) return

    // JWT token'ı alıyoruz
    const token = session.user?.accessToken

    // Hedef URL'i oluşturuyoruz ve token'ı query parametresi olarak ekliyoruz
    const targetUrl = `${app.url}/auth/sso?token=${encodeURIComponent(token || '')}&redirect=/dashboard`

    // Yeni pencerede açıyoruz
    window.open(targetUrl, '_blank')
  }

  // Durum badge'i için renk belirleme
  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'active':
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <Check className="mr-1 h-3 w-3" /> Aktif
          </Badge>
        )
      case 'pending':
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            <Code className="mr-1 h-3 w-3" /> Geliştiriliyor
          </Badge>
        )
      case 'development':
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            <Code className="mr-1 h-3 w-3" /> Geliştiriliyor
          </Badge>
        )
      case 'inactive':
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-500 border-gray-200"
          >
            Pasif
          </Badge>
        )
    }
  }

  // Uygulama kartı bileşeni
  const ApplicationCard = ({ app }: { app: Application }) => {
    // Duruma göre buton metni ve davranışı
    const getButtonProps = () => {
      switch (app.status) {
        case 'active':
          return {
            text: 'Uygulamayı Aç',
            icon: <ExternalLink className="ml-2 h-4 w-4" />,
            disabled: false,
            onClick: () => handleApplicationClick(app),
          }
        case 'pending':
          return {
            text: 'Yakında',
            icon: <Clock className="ml-2 h-4 w-4" />,
            disabled: true,
            onClick: () => {},
          }
        case 'development':
          return {
            text: 'Geliştirme Aşamasında',
            icon: <Code className="ml-2 h-4 w-4" />,
            disabled: true,
            onClick: () => {},
          }
        case 'inactive':
          return {
            text: 'Pasif',
            icon: null,
            disabled: true,
            onClick: () => {},
          }
      }
    }

    const buttonProps = getButtonProps()

    return (
      <Card
        key={app.id}
        className="overflow-hidden border border-muted hover:border-muted-foreground/20 transition-all"
      >
        <div className="h-36 bg-muted/30 flex items-center justify-center p-6">
          <div className="w-24 h-24 relative flex items-center justify-center bg-white rounded-xl shadow-sm p-2">
            <Image
              src={app.logo}
              alt={`${app.name} logo`}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle>{app.name}</CardTitle>
            {getStatusBadge(app.status)}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{app.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between border-t bg-muted/10 p-4">
          <Button
            variant={app.status === 'active' ? 'default' : 'outline'}
            onClick={buttonProps.onClick}
            disabled={buttonProps.disabled}
          >
            {buttonProps.text}
            {buttonProps.icon}
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Uygulamalar" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Quickesta Uygulamaları</CardTitle>
              <CardDescription>
                Quickesta ekosistemindeki tüm uygulamalara buradan
                erişebilirsiniz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">Tümü</TabsTrigger>
                  <TabsTrigger value="business">İş</TabsTrigger>
                  <TabsTrigger value="productivity">Verimlilik</TabsTrigger>
                  <TabsTrigger value="development">Geliştirme</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applications.map((app) => (
                      <ApplicationCard key={app.id} app={app} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="business" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applications
                      .filter((app) => app.category === 'business')
                      .map((app) => (
                        <ApplicationCard key={app.id} app={app} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="productivity" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applications
                      .filter((app) => app.category === 'productivity')
                      .map((app) => (
                        <ApplicationCard key={app.id} app={app} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="development" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applications
                      .filter((app) => app.category === 'development')
                      .map((app) => (
                        <ApplicationCard key={app.id} app={app} />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Uygulama Erişimi</CardTitle>
              <CardDescription>
                Uygulamalara erişim hakkında bilgiler
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <h3 className="text-sm font-medium mb-2">
                  Tek Oturum Açma (SSO)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Quickesta hesabınızla tüm uygulamalara tek tıklamayla
                  erişebilirsiniz. Tek Oturum Açma (SSO) teknolojisi sayesinde
                  her uygulama için ayrı giriş yapmanıza gerek kalmaz.
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <h3 className="text-sm font-medium mb-2">Erişim İzinleri</h3>
                <p className="text-sm text-muted-foreground">
                  Uygulamalara erişim izinleriniz, hesabınızdaki rol ve
                  yetkilerinize göre belirlenir. Erişim izni olmayan uygulamalar
                  için yöneticinizle iletişime geçebilirsiniz.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
