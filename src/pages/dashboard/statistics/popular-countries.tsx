import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { PageHeader } from '@/components/layout/PageHeader'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { Progress } from '@/ui/progress'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { 
  Globe, 
  Search, 
  Filter, 
  Download, 
  ArrowRight,
  BarChart3,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'

// Dummy data for popular countries
const popularCountriesData = [
  { 
    country: 'Fransa', 
    flag: '🇫🇷',
    count: 156, 
    change: '+12%', 
    trend: 'up',
    previousMonths: [132, 140, 145, 150, 156],
    visaTypes: [
      { type: 'Turist', count: 78 },
      { type: 'Öğrenci', count: 42 },
      { type: 'İş', count: 36 },
    ]
  },
  { 
    country: 'İtalya', 
    flag: '🇮🇹',
    count: 132, 
    change: '+8%', 
    trend: 'up',
    previousMonths: [110, 115, 120, 125, 132],
    visaTypes: [
      { type: 'Turist', count: 65 },
      { type: 'İş', count: 40 },
      { type: 'Aile Birleşimi', count: 27 },
    ]
  },
  { 
    country: 'Almanya', 
    flag: '🇩🇪',
    count: 124, 
    change: '+5%', 
    trend: 'up',
    previousMonths: [105, 110, 115, 120, 124],
    visaTypes: [
      { type: 'İş', count: 50 },
      { type: 'Öğrenci', count: 45 },
      { type: 'Çalışma', count: 29 },
    ]
  },
  { 
    country: 'İspanya', 
    flag: '🇪🇸',
    count: 98, 
    change: '+15%', 
    trend: 'up',
    previousMonths: [75, 80, 85, 90, 98],
    visaTypes: [
      { type: 'Turist', count: 55 },
      { type: 'Çalışma', count: 25 },
      { type: 'Öğrenci', count: 18 },
    ]
  },
  { 
    country: 'ABD', 
    flag: '🇺🇸',
    count: 87, 
    change: '-3%', 
    trend: 'down',
    previousMonths: [95, 92, 90, 88, 87],
    visaTypes: [
      { type: 'Turist', count: 40 },
      { type: 'İş', count: 30 },
      { type: 'Öğrenci', count: 17 },
    ]
  },
  { 
    country: 'İngiltere', 
    flag: '🇬🇧',
    count: 76, 
    change: '+2%', 
    trend: 'up',
    previousMonths: [70, 72, 73, 75, 76],
    visaTypes: [
      { type: 'Öğrenci', count: 35 },
      { type: 'İş', count: 25 },
      { type: 'Turist', count: 16 },
    ]
  },
  { 
    country: 'Hollanda', 
    flag: '🇳🇱',
    count: 68, 
    change: '+7%', 
    trend: 'up',
    previousMonths: [58, 60, 63, 65, 68],
    visaTypes: [
      { type: 'İş', count: 30 },
      { type: 'Aile Birleşimi', count: 20 },
      { type: 'Öğrenci', count: 18 },
    ]
  },
  { 
    country: 'Belçika', 
    flag: '🇧🇪',
    count: 52, 
    change: '+4%', 
    trend: 'up',
    previousMonths: [45, 47, 48, 50, 52],
    visaTypes: [
      { type: 'İş', count: 25 },
      { type: 'Turist', count: 15 },
      { type: 'Aile Birleşimi', count: 12 },
    ]
  },
];

export default function PopularCountriesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Tercih Edilen Ülkeler" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <h2 className="text-2xl font-bold tracking-tight">En Çok Tercih Edilen Ülkeler</h2>
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
                <CardTitle className="text-base">Toplam Başvuru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {popularCountriesData.reduce((sum, country) => sum + country.count, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Tüm ülkelere yapılan başvuru sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">En Popüler Ülke</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{popularCountriesData[0].flag}</span>
                  <div>
                    <div className="text-xl font-bold">{popularCountriesData[0].country}</div>
                    <p className="text-xs text-muted-foreground">
                      {popularCountriesData[0].count} başvuru
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">En Yüksek Artış</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">
                    {popularCountriesData.sort((a, b) => 
                      parseInt(b.change) - parseInt(a.change)
                    )[0].flag}
                  </span>
                  <div>
                    <div className="text-xl font-bold">
                      {popularCountriesData.sort((a, b) => 
                        parseInt(b.change) - parseInt(a.change)
                      )[0].country}
                    </div>
                    <p className="text-xs text-green-500 font-medium">
                      {popularCountriesData.sort((a, b) => 
                        parseInt(b.change) - parseInt(a.change)
                      )[0].change}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">En Popüler Vize Türü</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Turist Vizesi</div>
                <p className="text-xs text-muted-foreground">
                  Tüm başvuruların %42&apos;si
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ülke Popülerlik Sıralaması</CardTitle>
                  <CardDescription>
                    Vize başvurularına göre ülke sıralaması
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="6">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Dönem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">Son 3 Ay</SelectItem>
                      <SelectItem value="6">Son 6 Ay</SelectItem>
                      <SelectItem value="12">Son 12 Ay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {popularCountriesData
                  .sort((a, b) => b.count - a.count)
                  .map((country, index) => (
                    <div key={country.country} className="flex items-center">
                      <div className="w-8 text-center font-bold text-muted-foreground">
                        {index + 1}
                      </div>
                      <span className="mr-2 text-2xl">{country.flag}</span>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium leading-none">
                            {country.country}
                          </p>
                          <div className="flex items-center">
                            <p className="text-sm font-medium mr-2">{country.count} başvuru</p>
                            <span className={`text-xs font-medium ${
                              country.trend === 'up' ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {country.change}
                              {country.trend === 'up' ? 
                                <TrendingUp className="inline ml-1 h-3 w-3" /> : 
                                <TrendingDown className="inline ml-1 h-3 w-3" />
                              }
                            </span>
                          </div>
                        </div>
                        <Progress 
                          value={country.count / popularCountriesData[0].count * 100} 
                          className="h-2" 
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <div>
                            En popüler: {country.visaTypes[0].type} ({country.visaTypes[0].count})
                          </div>
                          <div className="flex space-x-2">
                            {country.visaTypes.slice(1).map((visaType) => (
                              <div key={visaType.type}>
                                {visaType.type} ({visaType.count})
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Aylık Trend Analizi</CardTitle>
                <CardDescription>
                  Son 5 aydaki başvuru sayıları
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="france">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="france">Fransa</TabsTrigger>
                    <TabsTrigger value="italy">İtalya</TabsTrigger>
                    <TabsTrigger value="germany">Almanya</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="france" className="space-y-4">
                    <div className="text-2xl font-bold flex items-center">
                      🇫🇷 Fransa
                      <span className="ml-2 text-sm text-green-500">+12%</span>
                    </div>
                    <div className="space-y-4">
                      {popularCountriesData[0].previousMonths.map((count, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">
                              {['Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'][index]}
                            </div>
                            <div className="text-sm font-medium">{count} başvuru</div>
                          </div>
                          <Progress 
                            value={count / Math.max(...popularCountriesData[0].previousMonths) * 100} 
                            className="h-2" 
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="italy" className="space-y-4">
                    <div className="text-2xl font-bold flex items-center">
                      🇮🇹 İtalya
                      <span className="ml-2 text-sm text-green-500">+8%</span>
                    </div>
                    <div className="space-y-4">
                      {popularCountriesData[1].previousMonths.map((count, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">
                              {['Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'][index]}
                            </div>
                            <div className="text-sm font-medium">{count} başvuru</div>
                          </div>
                          <Progress 
                            value={count / Math.max(...popularCountriesData[1].previousMonths) * 100} 
                            className="h-2" 
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="germany" className="space-y-4">
                    <div className="text-2xl font-bold flex items-center">
                      🇩🇪 Almanya
                      <span className="ml-2 text-sm text-green-500">+5%</span>
                    </div>
                    <div className="space-y-4">
                      {popularCountriesData[2].previousMonths.map((count, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">
                              {['Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'][index]}
                            </div>
                            <div className="text-sm font-medium">{count} başvuru</div>
                          </div>
                          <Progress 
                            value={count / Math.max(...popularCountriesData[2].previousMonths) * 100} 
                            className="h-2" 
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vize Türü Dağılımı</CardTitle>
                <CardDescription>
                  Ülkelere göre en popüler vize türleri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {popularCountriesData
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5)
                    .map((country) => (
                      <div key={country.country} className="space-y-2">
                        <div className="flex items-center">
                          <span className="mr-2 text-2xl">{country.flag}</span>
                          <div className="font-medium">{country.country}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {country.visaTypes.map((visaType) => (
                            <div 
                              key={visaType.type} 
                              className="border rounded-md p-2 text-center"
                            >
                              <div className="text-xs font-medium">{visaType.type}</div>
                              <div className="text-sm">{visaType.count}</div>
                            </div>
                          ))}
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