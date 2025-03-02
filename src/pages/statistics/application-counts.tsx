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
  FileCheck, 
  Search, 
  Filter, 
  Download, 
  BarChart3,
  Calendar,
  Users,
  Globe,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'

// Dummy data for application counts
const monthlyApplicationData = [
  { month: 'Ocak', count: 245, change: '+5%' },
  { month: 'Şubat', count: 256, change: '+4.5%' },
  { month: 'Mart', count: 278, change: '+8.6%' },
  { month: 'Nisan', count: 290, change: '+4.3%' },
  { month: 'Mayıs', count: 310, change: '+6.9%' },
  { month: 'Haziran', count: 325, change: '+4.8%' },
];

const visaTypeData = [
  { type: 'Turist', count: 520, percentage: 30 },
  { type: 'İş', count: 420, percentage: 24 },
  { type: 'Öğrenci', count: 380, percentage: 22 },
  { type: 'Aile Birleşimi', count: 240, percentage: 14 },
  { type: 'Çalışma', count: 180, percentage: 10 },
];

const customerTypeData = [
  { type: 'Bireysel', count: 1240, percentage: 72 },
  { type: 'Kurumsal', count: 480, percentage: 28 },
];

const statusData = [
  { status: 'Onaylandı', count: 1150, percentage: 67 },
  { status: 'Reddedildi', count: 320, percentage: 18 },
  { status: 'Beklemede', count: 250, percentage: 15 },
];

export default function ApplicationCountsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Başvuru Sayıları" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <h2 className="text-2xl font-bold tracking-tight">Başvuru İstatistikleri</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Select defaultValue="2023">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Yıl" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
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
                <div className="text-3xl font-bold">1,720</div>
                <p className="text-xs text-muted-foreground">
                  2023 yılı toplam başvuru sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Aylık Ortalama</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {Math.round(monthlyApplicationData.reduce((sum, month) => sum + month.count, 0) / monthlyApplicationData.length)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Aylık ortalama başvuru sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">En Yüksek Ay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {monthlyApplicationData.sort((a, b) => b.count - a.count)[0].month}
                </div>
                <p className="text-xs text-muted-foreground">
                  {monthlyApplicationData.sort((a, b) => b.count - a.count)[0].count} başvuru
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Büyüme Oranı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">+5.7%</div>
                <p className="text-xs text-muted-foreground">
                  Yıllık ortalama büyüme oranı
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Aylık Başvuru Sayıları</CardTitle>
              <CardDescription>
                2023 yılı aylık başvuru sayıları
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {monthlyApplicationData.map((month, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">{month.month}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium mr-2">{month.count} başvuru</p>
                        <span className="text-xs text-green-500 font-medium">{month.change}</span>
                      </div>
                    </div>
                    <Progress 
                      value={month.count / Math.max(...monthlyApplicationData.map(m => m.count)) * 100} 
                      className="h-2" 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Vize Türüne Göre Dağılım</CardTitle>
                <CardDescription>
                  Başvuruların vize türüne göre dağılımı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {visaTypeData.map((type, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{type.type}</p>
                        <div className="flex items-center">
                          <p className="text-sm font-medium mr-2">{type.count} başvuru</p>
                          <span className="text-xs text-muted-foreground">%{type.percentage}</span>
                        </div>
                      </div>
                      <Progress value={type.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Müşteri Türüne Göre Dağılım</CardTitle>
                <CardDescription>
                  Başvuruların müşteri türüne göre dağılımı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {customerTypeData.map((type, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-medium">{type.type}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm font-medium mr-2">{type.count} başvuru</p>
                          <span className="text-xs text-muted-foreground">%{type.percentage}</span>
                        </div>
                      </div>
                      <Progress value={type.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Başvuru Durumuna Göre Dağılım</CardTitle>
              <CardDescription>
                Başvuruların durumuna göre dağılımı
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overall">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="overall">Genel</TabsTrigger>
                  <TabsTrigger value="individual">Bireysel</TabsTrigger>
                  <TabsTrigger value="corporate">Kurumsal</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overall" className="space-y-6">
                  {statusData.map((status, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{status.status}</p>
                        <div className="flex items-center">
                          <p className="text-sm font-medium mr-2">{status.count} başvuru</p>
                          <span className="text-xs text-muted-foreground">%{status.percentage}</span>
                        </div>
                      </div>
                      <Progress 
                        value={status.percentage} 
                        className={`h-2 ${
                          status.status === 'Onaylandı' 
                            ? 'bg-green-100' 
                            : status.status === 'Reddedildi' 
                            ? 'bg-red-100' 
                            : 'bg-yellow-100'
                        }`}
                      />
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="individual" className="space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Onaylandı</p>
                      <div className="flex items-center">
                        <p className="text-sm font-medium mr-2">830 başvuru</p>
                        <span className="text-xs text-muted-foreground">%67</span>
                      </div>
                    </div>
                    <Progress value={67} className="h-2 bg-green-100" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Reddedildi</p>
                      <div className="flex items-center">
                        <p className="text-sm font-medium mr-2">230 başvuru</p>
                        <span className="text-xs text-muted-foreground">%19</span>
                      </div>
                    </div>
                    <Progress value={19} className="h-2 bg-red-100" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Beklemede</p>
                      <div className="flex items-center">
                        <p className="text-sm font-medium mr-2">180 başvuru</p>
                        <span className="text-xs text-muted-foreground">%14</span>
                      </div>
                    </div>
                    <Progress value={14} className="h-2 bg-yellow-100" />
                  </div>
                </TabsContent>
                
                <TabsContent value="corporate" className="space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Onaylandı</p>
                      <div className="flex items-center">
                        <p className="text-sm font-medium mr-2">320 başvuru</p>
                        <span className="text-xs text-muted-foreground">%67</span>
                      </div>
                    </div>
                    <Progress value={67} className="h-2 bg-green-100" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Reddedildi</p>
                      <div className="flex items-center">
                        <p className="text-sm font-medium mr-2">90 başvuru</p>
                        <span className="text-xs text-muted-foreground">%19</span>
                      </div>
                    </div>
                    <Progress value={19} className="h-2 bg-red-100" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Beklemede</p>
                      <div className="flex items-center">
                        <p className="text-sm font-medium mr-2">70 başvuru</p>
                        <span className="text-xs text-muted-foreground">%14</span>
                      </div>
                    </div>
                    <Progress value={14} className="h-2 bg-yellow-100" />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ülkelere Göre Başvuru Sayıları</CardTitle>
              <CardDescription>
                En çok başvuru yapılan ülkeler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">Fransa</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-medium mr-2">320 başvuru</p>
                      <span className="text-xs text-muted-foreground">%19</span>
                    </div>
                  </div>
                  <Progress value={19} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">İtalya</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-medium mr-2">280 başvuru</p>
                      <span className="text-xs text-muted-foreground">%16</span>
                    </div>
                  </div>
                  <Progress value={16} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">Almanya</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-medium mr-2">260 başvuru</p>
                      <span className="text-xs text-muted-foreground">%15</span>
                    </div>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">İspanya</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-medium mr-2">220 başvuru</p>
                      <span className="text-xs text-muted-foreground">%13</span>
                    </div>
                  </div>
                  <Progress value={13} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">ABD</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-medium mr-2">180 başvuru</p>
                      <span className="text-xs text-muted-foreground">%10</span>
                    </div>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 