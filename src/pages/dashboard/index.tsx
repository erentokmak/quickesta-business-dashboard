import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { PageHeader } from '@/components/layout/PageHeader'
import { ApplicationsSection } from '@/components/dashboard/applications-section'
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
  CardFooter,
} from '@/ui/card'
import { Button } from '@/ui/button'
import {
  User,
  Shield,
  Smartphone,
  Bell,
  Settings,
  ArrowRight,
  Users,
  CheckCircle,
  XCircle,
  Globe,
  Calendar,
  FileCheck,
  BarChart3,
  Download,
  Plane,
  Building2,
  Home,
} from 'lucide-react'
import Link from 'next/link'
import { Progress } from '@/ui/progress'

// Dummy data for statistics
const approvalRateData = {
  overall: 78,
  monthly: [
    { month: 'Ocak', rate: 75 },
    { month: 'Şubat', rate: 72 },
    { month: 'Mart', rate: 80 },
    { month: 'Nisan', rate: 82 },
    { month: 'Mayıs', rate: 78 },
    { month: 'Haziran', rate: 76 },
  ],
}

const popularCountriesData = [
  { country: 'Fransa', count: 156, change: '+12%' },
  { country: 'İtalya', count: 132, change: '+8%' },
  { country: 'Almanya', count: 124, change: '+5%' },
  { country: 'İspanya', count: 98, change: '+15%' },
  { country: 'ABD', count: 87, change: '-3%' },
]

const recentAppointmentsData = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    country: 'Fransa',
    date: '15.06.2023',
    status: 'Onaylandı',
  },
  {
    id: 2,
    name: 'Ayşe Demir',
    country: 'İtalya',
    date: '12.06.2023',
    status: 'Beklemede',
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    country: 'Almanya',
    date: '10.06.2023',
    status: 'Reddedildi',
  },
  {
    id: 4,
    name: 'Zeynep Çelik',
    country: 'İspanya',
    date: '08.06.2023',
    status: 'Onaylandı',
  },
]

export default function Page() {
  const { data: session } = useSession()

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

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center gap-2 px-4 py-2 border-b">
          <Home className="h-5 w-5" />
          <h1 className="text-xl font-semibold">Anasayfa</h1>
        </div>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Hoş Geldiniz, {session?.user?.name}!</CardTitle>
              <CardDescription>
                Quickesta Visa Dashboard&apos;a hoş geldiniz. Vize başvurularını
                ve istatistikleri buradan takip edebilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Genel Onay Oranı
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className={`text-4xl font-bold ${approvalRateData.overall >= 70 ? 'text-green-500' : approvalRateData.overall >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {approvalRateData.overall}%
                      </div>
                      <Progress
                        value={approvalRateData.overall}
                        className={`h-2 w-full ${approvalRateData.overall >= 70 ? 'bg-green-500' : approvalRateData.overall >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      />
                      <div className="text-xs text-muted-foreground">
                        Son 6 ay ortalaması
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <Link href="/statistics/approval-rates">
                        <span>Detaylı İstatistikler</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      En Çok Tercih Edilen Ülkeler
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {popularCountriesData
                        .slice(0, 3)
                        .map((country, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{country.country}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2">{country.count}</span>
                              <span
                                className={
                                  country.change.startsWith('+')
                                    ? 'text-green-500'
                                    : 'text-red-500'
                                }
                              >
                                {country.change}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <Link href="/statistics/popular-countries">
                        <span>Tüm Ülkeler</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Hızlı İşlemler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        asChild
                      >
                        <Link href="/applications/new">
                          <FileCheck className="mr-2 h-4 w-4" />
                          <span>Yeni Başvuru</span>
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        asChild
                      >
                        <Link href="/customers/new">
                          <User className="mr-2 h-4 w-4" />
                          <span>Yeni Müşteri</span>
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        asChild
                      >
                        <Link href="/applications/recent-appointments">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Randevular</span>
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        asChild
                      >
                        <Link href="/payments/status">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Ödemeler</span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Son Randevular</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/applications/recent-appointments">
                      <span>Tümünü Gör</span>
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAppointmentsData.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>
                        <div className="font-medium">{appointment.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.country} - {appointment.date}
                        </div>
                      </div>
                      <div
                        className={`font-medium ${getStatusColor(appointment.status)}`}
                      >
                        {appointment.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Aylık Onay Oranları</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/statistics/approval-rates">
                      <span>Detaylı Analiz</span>
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvalRateData.monthly.map((month, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{month.month}</div>
                        <div className="text-sm font-medium">{month.rate}%</div>
                      </div>
                      <Progress value={month.rate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hızlı Erişim</CardTitle>
              <CardDescription>
                Sık kullanılan sayfalara hızlıca erişin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                <Link href="/statistics/approval-rates">
                  <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <BarChart3 className="h-6 w-6 text-muted-foreground" />
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold">Onay/Red Oranları</h3>
                      <p className="text-sm text-muted-foreground">
                        Vize onay ve red istatistiklerini görüntüleyin
                      </p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/applications">
                  <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <FileCheck className="h-6 w-6 text-muted-foreground" />
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold">Başvurular</h3>
                      <p className="text-sm text-muted-foreground">
                        Tüm vize başvurularını görüntüleyin ve yönetin
                      </p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/countries">
                  <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Globe className="h-6 w-6 text-muted-foreground" />
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold">Ülkeler</h3>
                      <p className="text-sm text-muted-foreground">
                        Ülkelere göre başvuruları görüntüleyin
                      </p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/companies">
                  <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Building2 className="h-6 w-6 text-muted-foreground" />
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold">Şirketler</h3>
                      <p className="text-sm text-muted-foreground">
                        Şirketlere göre başvuruları görüntüleyin
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
