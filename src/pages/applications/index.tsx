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
import { Input } from '@/ui/input'
import {
  FileCheck,
  Search,
  Filter,
  Plus,
  CheckCircle,
  XCircle,
  Calendar,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import Link from 'next/link'

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Onaylandı':
        return 'text-green-500'
      case 'Reddedildi':
        return 'text-red-500'
      default:
        return 'text-yellow-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Onaylandı':
        return <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
      case 'Reddedildi':
        return <XCircle className="mr-2 h-4 w-4 text-red-500" />
      default:
        return <Clock className="mr-2 h-4 w-4 text-yellow-500" />
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Ödendi':
        return 'text-green-500'
      default:
        return 'text-yellow-500'
    }
  }

  const getDocumentsStatusColor = (status: string) => {
    switch (status) {
      case 'Tamamlandı':
        return 'text-green-500'
      default:
        return 'text-red-500'
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Başvurular" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileCheck className="h-5 w-5" />
              <h2 className="text-2xl font-bold tracking-tight">
                Vize Başvuruları
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrele
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Dışa Aktar
              </Button>
              <Button size="sm" asChild>
                <Link href="/applications/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Yeni Başvuru
                </Link>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tüm Başvurular</CardTitle>
                  <CardDescription>
                    Tüm vize başvurularını görüntüleyin ve yönetin
                  </CardDescription>
                </div>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Başvuru ara..."
                    className="h-9"
                  />
                  <Button type="submit" size="sm" variant="ghost">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">Tümü</TabsTrigger>
                  <TabsTrigger value="pending">Beklemede</TabsTrigger>
                  <TabsTrigger value="approved">Onaylanan</TabsTrigger>
                  <TabsTrigger value="rejected">Reddedilen</TabsTrigger>
                </TabsList>

                <div className="rounded-md border">
                  <div className="grid grid-cols-8 gap-4 p-4 font-medium border-b">
                    <div className="col-span-2">Başvuru Sahibi</div>
                    <div>Ülke</div>
                    <div>Vize Türü</div>
                    <div>Randevu</div>
                    <div>Durum</div>
                    <div>Ödeme</div>
                    <div>İşlemler</div>
                  </div>

                  <TabsContent value="all" className="m-0">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className={`grid grid-cols-8 gap-4 p-4 items-center ${
                          app !== applications[applications.length - 1]
                            ? 'border-b'
                            : ''
                        }`}
                      >
                        <div className="col-span-2">
                          <div className="font-medium">{app.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {app.id}
                          </div>
                        </div>
                        <div>{app.status}</div>
                        <div>{app.category}</div>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            {app.status === 'active'
                              ? 'Aktif'
                              : app.status === 'pending'
                                ? 'Beklemede'
                                : app.status === 'development'
                                  ? 'Geliştiriliyor'
                                  : 'Pasif'}
                          </span>
                        </div>
                        <div className={getStatusColor(app.status)}>
                          {getStatusIcon(app.status)}
                        </div>
                        <div
                          className={getPaymentStatusColor(
                            app.status === 'active' ? 'Ödendi' : 'Beklemede',
                          )}
                        >
                          {app.status === 'active' ? 'Ödendi' : 'Beklemede'}
                        </div>
                        <div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Görüntüle</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Düzenle</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Sil</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="pending" className="m-0">
                    {applications
                      .filter((app) => app.status === 'pending')
                      .map((app, index, filtered) => (
                        <div
                          key={app.id}
                          className={`grid grid-cols-8 gap-4 p-4 items-center ${
                            index !== filtered.length - 1 ? 'border-b' : ''
                          }`}
                        >
                          <div className="col-span-2">
                            <div className="font-medium">{app.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {app.id}
                            </div>
                          </div>
                          <div>{app.status}</div>
                          <div>{app.category}</div>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>
                              {app.status === 'pending' ? 'Beklemede' : ''}
                            </span>
                          </div>
                          <div className={getStatusColor(app.status)}>
                            {getStatusIcon(app.status)}
                          </div>
                          <div
                            className={getPaymentStatusColor(
                              app.status === 'active' ? 'Ödendi' : 'Beklemede',
                            )}
                          >
                            {app.status === 'active' ? 'Ödendi' : 'Beklemede'}
                          </div>
                          <div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Görüntüle</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Düzenle</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash className="mr-2 h-4 w-4" />
                                  <span>Sil</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                  </TabsContent>

                  <TabsContent value="approved" className="m-0">
                    {applications
                      .filter((app) => app.status === 'active')
                      .map((app, index, filtered) => (
                        <div
                          key={app.id}
                          className={`grid grid-cols-8 gap-4 p-4 items-center ${
                            index !== filtered.length - 1 ? 'border-b' : ''
                          }`}
                        >
                          <div className="col-span-2">
                            <div className="font-medium">{app.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {app.id}
                            </div>
                          </div>
                          <div>{app.status}</div>
                          <div>{app.category}</div>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>
                              {app.status === 'active' ? 'Aktif' : ''}
                            </span>
                          </div>
                          <div className={getStatusColor(app.status)}>
                            {getStatusIcon(app.status)}
                          </div>
                          <div
                            className={getPaymentStatusColor(
                              app.status === 'active' ? 'Ödendi' : '',
                            )}
                          >
                            {app.status === 'active' ? 'Ödendi' : ''}
                          </div>
                          <div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Görüntüle</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Düzenle</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash className="mr-2 h-4 w-4" />
                                  <span>Sil</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                  </TabsContent>

                  <TabsContent value="rejected" className="m-0">
                    {applications
                      .filter((app) => app.status === 'inactive')
                      .map((app, index, filtered) => (
                        <div
                          key={app.id}
                          className={`grid grid-cols-8 gap-4 p-4 items-center ${
                            index !== filtered.length - 1 ? 'border-b' : ''
                          }`}
                        >
                          <div className="col-span-2">
                            <div className="font-medium">{app.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {app.id}
                            </div>
                          </div>
                          <div>{app.status}</div>
                          <div>{app.category}</div>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>
                              {app.status === 'inactive' ? 'Pasif' : ''}
                            </span>
                          </div>
                          <div className={getStatusColor(app.status)}>
                            {getStatusIcon(app.status)}
                          </div>
                          <div
                            className={getPaymentStatusColor(
                              app.status === 'active' ? 'Ödendi' : '',
                            )}
                          >
                            {app.status === 'active' ? 'Ödendi' : ''}
                          </div>
                          <div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Görüntüle</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Düzenle</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash className="mr-2 h-4 w-4" />
                                  <span>Sil</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
