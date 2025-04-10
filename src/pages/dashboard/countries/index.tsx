import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { PageHeader } from '@/components/layout/PageHeader'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/ui/card'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { 
  Globe, 
  Search, 
  Filter, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  Clock, 
  BarChart3,
  Download,
  Flag,
  Users,
} from 'lucide-react'
import { Progress } from '@/ui/progress'
import Link from 'next/link'

// Dummy data for countries
const countriesData = [
  { 
    id: 'FR', 
    name: 'Fransa', 
    flag: '🇫🇷', 
    applications: 156, 
    approved: 128, 
    rejected: 28, 
    pending: 42, 
    approvalRate: 82,
    popularVisaTypes: ['Turist', 'Öğrenci', 'İş'],
    processingTime: '15 gün',
    change: '+12%',
  },
  { 
    id: 'IT', 
    name: 'İtalya', 
    flag: '🇮🇹', 
    applications: 132, 
    approved: 100, 
    rejected: 32, 
    pending: 35, 
    approvalRate: 76,
    popularVisaTypes: ['Turist', 'İş', 'Aile Birleşimi'],
    processingTime: '20 gün',
    change: '+8%',
  },
  { 
    id: 'DE', 
    name: 'Almanya', 
    flag: '🇩🇪', 
    applications: 124, 
    approved: 105, 
    rejected: 19, 
    pending: 30, 
    approvalRate: 85,
    popularVisaTypes: ['İş', 'Öğrenci', 'Çalışma'],
    processingTime: '25 gün',
    change: '+5%',
  },
  { 
    id: 'ES', 
    name: 'İspanya', 
    flag: '🇪🇸', 
    applications: 98, 
    approved: 77, 
    rejected: 21, 
    pending: 28, 
    approvalRate: 79,
    popularVisaTypes: ['Turist', 'Çalışma', 'Öğrenci'],
    processingTime: '18 gün',
    change: '+15%',
  },
  { 
    id: 'US', 
    name: 'ABD', 
    flag: '🇺🇸', 
    applications: 87, 
    approved: 59, 
    rejected: 28, 
    pending: 32, 
    approvalRate: 68,
    popularVisaTypes: ['Turist', 'İş', 'Öğrenci'],
    processingTime: '30 gün',
    change: '-3%',
  },
  { 
    id: 'GB', 
    name: 'İngiltere', 
    flag: '🇬🇧', 
    applications: 76, 
    approved: 55, 
    rejected: 21, 
    pending: 25, 
    approvalRate: 72,
    popularVisaTypes: ['Öğrenci', 'İş', 'Turist'],
    processingTime: '28 gün',
    change: '+2%',
  },
  { 
    id: 'NL', 
    name: 'Hollanda', 
    flag: '🇳🇱', 
    applications: 68, 
    approved: 55, 
    rejected: 13, 
    pending: 20, 
    approvalRate: 81,
    popularVisaTypes: ['İş', 'Aile Birleşimi', 'Öğrenci'],
    processingTime: '22 gün',
    change: '+7%',
  },
  { 
    id: 'BE', 
    name: 'Belçika', 
    flag: '🇧🇪', 
    applications: 52, 
    approved: 40, 
    rejected: 12, 
    pending: 18, 
    approvalRate: 77,
    popularVisaTypes: ['İş', 'Turist', 'Aile Birleşimi'],
    processingTime: '20 gün',
    change: '+4%',
  },
]

export default function CountriesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Ülkeler" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <h2 className="text-2xl font-bold tracking-tight">Ülke Bazlı Vize İstatistikleri</h2>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Ülke ara..." className="pl-8" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrele
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Rapor İndir
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Toplam Ülke</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{countriesData.length}</div>
                <p className="text-xs text-muted-foreground">
                  Vize başvurusu yapılan ülke sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Toplam Başvuru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {countriesData.reduce((sum, country) => sum + country.applications, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Tüm ülkelere yapılan başvuru sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Ortalama Onay Oranı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {Math.round(
                    countriesData.reduce((sum, country) => sum + country.approvalRate, 0) /
                      countriesData.length
                  )}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Tüm ülkelerin ortalama onay oranı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Ortalama İşlem Süresi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {Math.round(
                    countriesData.reduce(
                      (sum, country) => sum + parseInt(country.processingTime), 
                      0
                    ) / countriesData.length
                  )} gün
                </div>
                <p className="text-xs text-muted-foreground">
                  Ortalama vize işlem süresi
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ülke Listesi</CardTitle>
              <CardDescription>
                Vize başvurusu yapılan ülkeler ve istatistikleri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                  <div className="col-span-2">Ülke</div>
                  <div>Başvuru</div>
                  <div>Onay Oranı</div>
                  <div>İşlem Süresi</div>
                  <div>Değişim</div>
                  <div>İşlemler</div>
                </div>
                <div>
                  {countriesData.map((country, index) => (
                    <div
                      key={country.id}
                      className={`grid grid-cols-7 gap-4 p-4 items-center ${
                        index !== countriesData.length - 1 ? 'border-b' : ''
                      }`}
                    >
                      <div className="col-span-2 flex items-center">
                        <span className="mr-2 text-2xl">{country.flag}</span>
                        <div>
                          <div className="font-medium">{country.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {country.popularVisaTypes.join(', ')}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{country.applications}</div>
                        <div className="text-xs text-muted-foreground">
                          <span className="text-green-500">{country.approved} onay</span> /{' '}
                          <span className="text-red-500">{country.rejected} red</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{country.approvalRate}%</span>
                        </div>
                        <Progress value={country.approvalRate} className="h-2 w-24" />
                      </div>
                      <div>{country.processingTime}</div>
                      <div className={country.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                        {country.change}
                      </div>
                      <div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/countries/${country.id.toLowerCase()}`}>
                            <span>Detaylar</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>En Yüksek Onay Oranına Sahip Ülkeler</CardTitle>
                <CardDescription>
                  Vize onay oranı en yüksek olan ülkeler
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {countriesData
                    .sort((a, b) => b.approvalRate - a.approvalRate)
                    .slice(0, 5)
                    .map((country, index) => (
                      <div key={country.id} className="flex items-center">
                        <span className="mr-2 text-2xl">{country.flag}</span>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium leading-none">
                              {country.name}
                            </p>
                            <p className="text-sm font-medium">{country.approvalRate}%</p>
                          </div>
                          <Progress value={country.approvalRate} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
                              <span>{country.approved}</span>
                            </div>
                            <div className="flex items-center">
                              <XCircle className="mr-1 h-3 w-3 text-red-500" />
                              <span>{country.rejected}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3 text-yellow-500" />
                              <span>{country.pending}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>En Çok Başvuru Yapılan Ülkeler</CardTitle>
                <CardDescription>
                  En fazla vize başvurusu yapılan ülkeler
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {countriesData
                    .sort((a, b) => b.applications - a.applications)
                    .slice(0, 5)
                    .map((country, index) => (
                      <div key={country.id} className="flex items-center">
                        <span className="mr-2 text-2xl">{country.flag}</span>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium leading-none">
                              {country.name}
                            </p>
                            <p className="text-sm font-medium">{country.applications} başvuru</p>
                          </div>
                          <Progress 
                            value={country.applications / countriesData[0].applications * 100} 
                            className="h-2" 
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <div>
                              En popüler: {country.popularVisaTypes[0]}
                            </div>
                            <div>
                              İşlem: {country.processingTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 