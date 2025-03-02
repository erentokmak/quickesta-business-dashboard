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
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { 
  Calendar as CalendarIcon, 
  Search, 
  Filter, 
  Download, 
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
  MoreHorizontal,
  Calendar,
  User,
  Globe,
  MapPin,
  ArrowUpDown,
  ChevronDown,
} from 'lucide-react'
import { Badge } from '@/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { DatePickerWithRange } from '@/ui/date-range-picker'

// Dummy data for recent appointments
const appointmentsData = [
  { 
    id: 'APT-1234',
    customer: 'Ahmet Yılmaz',
    date: '20.06.2023',
    time: '10:30',
    country: 'Fransa',
    visaType: 'Turist Vizesi',
    location: 'Fransa Konsolosluğu, İstanbul',
    status: 'Onaylandı',
    notes: 'Tüm belgeler hazır',
  },
  { 
    id: 'APT-1235',
    customer: 'Ayşe Demir',
    date: '21.06.2023',
    time: '11:15',
    country: 'İtalya',
    visaType: 'İş Vizesi',
    location: 'İtalya Konsolosluğu, Ankara',
    status: 'Beklemede',
    notes: 'Davet mektubu bekleniyor',
  },
  { 
    id: 'APT-1236',
    customer: 'Mehmet Kaya',
    date: '22.06.2023',
    time: '09:00',
    country: 'Almanya',
    visaType: 'Öğrenci Vizesi',
    location: 'Almanya Konsolosluğu, İstanbul',
    status: 'Onaylandı',
    notes: 'Kabul mektubu hazır',
  },
  { 
    id: 'APT-1237',
    customer: 'Zeynep Çelik',
    date: '23.06.2023',
    time: '14:45',
    country: 'İspanya',
    visaType: 'Turist Vizesi',
    location: 'İspanya Konsolosluğu, İstanbul',
    status: 'İptal Edildi',
    notes: 'Müşteri talebi ile iptal edildi',
  },
  { 
    id: 'APT-1238',
    customer: 'Ali Yıldız',
    date: '24.06.2023',
    time: '10:00',
    country: 'ABD',
    visaType: 'İş Vizesi',
    location: 'ABD Konsolosluğu, İstanbul',
    status: 'Onaylandı',
    notes: 'Tüm belgeler hazır',
  },
  { 
    id: 'APT-1239',
    customer: 'Fatma Şahin',
    date: '25.06.2023',
    time: '11:30',
    country: 'İngiltere',
    visaType: 'Turist Vizesi',
    location: 'İngiltere Konsolosluğu, İstanbul',
    status: 'Beklemede',
    notes: 'Banka hesap dökümü bekleniyor',
  },
  { 
    id: 'APT-1240',
    customer: 'Mustafa Demir',
    date: '26.06.2023',
    time: '13:15',
    country: 'Hollanda',
    visaType: 'Çalışma Vizesi',
    location: 'Hollanda Konsolosluğu, İstanbul',
    status: 'Onaylandı',
    notes: 'İş sözleşmesi hazır',
  },
  { 
    id: 'APT-1241',
    customer: 'Elif Yılmaz',
    date: '27.06.2023',
    time: '09:30',
    country: 'Belçika',
    visaType: 'Turist Vizesi',
    location: 'Belçika Konsolosluğu, İstanbul',
    status: 'Beklemede',
    notes: 'Konaklama belgesi bekleniyor',
  },
];

// Appointment summary data
const appointmentSummary = {
  total: 8,
  upcoming: 5,
  completed: 2,
  cancelled: 1,
  todayCount: 2,
  weekCount: 8,
  monthCount: 32,
};

// Upcoming appointments by country
const upcomingByCountry = [
  { country: 'Fransa', count: 12 },
  { country: 'Almanya', count: 10 },
  { country: 'İtalya', count: 8 },
  { country: 'İspanya', count: 7 },
  { country: 'İngiltere', count: 6 },
];

export default function RecentAppointmentsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Onaylandı':
        return <Badge className="bg-green-500">Onaylandı</Badge>;
      case 'Beklemede':
        return <Badge className="bg-yellow-500">Beklemede</Badge>;
      case 'İptal Edildi':
        return <Badge className="bg-red-500">İptal Edildi</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Onaylandı':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Beklemede':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'İptal Edildi':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Son Randevular" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <h2 className="text-2xl font-bold tracking-tight">Randevu Takibi</h2>
            </div>
            <div className="flex items-center space-x-2">
              <DatePickerWithRange className="w-[300px]" />
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
                <CardTitle className="text-base">Toplam Randevu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{appointmentSummary.total}</div>
                <p className="text-xs text-muted-foreground">
                  Bu haftaki toplam randevu sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Yaklaşan Randevular</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-500">{appointmentSummary.upcoming}</div>
                <p className="text-xs text-muted-foreground">
                  Önümüzdeki 7 gün içinde
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Tamamlanan Randevular</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">{appointmentSummary.completed}</div>
                <p className="text-xs text-muted-foreground">
                  Son 7 gün içinde
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">İptal Edilen Randevular</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">{appointmentSummary.cancelled}</div>
                <p className="text-xs text-muted-foreground">
                  Son 7 gün içinde
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Randevu Listesi</CardTitle>
                  <CardDescription>
                    Yaklaşan ve geçmiş randevuların listesi
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Tabs defaultValue="all" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all">Tümü</TabsTrigger>
                      <TabsTrigger value="upcoming">Yaklaşan</TabsTrigger>
                      <TabsTrigger value="past">Geçmiş</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Randevu ara..." className="pl-8" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="date-asc">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sıralama" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-asc">Tarih (Yakından Uzağa)</SelectItem>
                      <SelectItem value="date-desc">Tarih (Uzaktan Yakına)</SelectItem>
                      <SelectItem value="customer">Müşteri Adı</SelectItem>
                      <SelectItem value="country">Ülke</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="p-0 h-8 font-medium">
                      Tarih/Saat
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div>Müşteri</div>
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="p-0 h-8 font-medium">
                      Ülke
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div>Vize Türü</div>
                  <div>Lokasyon</div>
                  <div>Durum</div>
                  <div>İşlemler</div>
                </div>
                <div>
                  {appointmentsData.map((appointment, index) => (
                    <div
                      key={appointment.id}
                      className={`grid grid-cols-7 gap-4 p-4 items-center ${
                        index !== appointmentsData.length - 1 ? 'border-b' : ''
                      }`}
                    >
                      <div className="font-medium">
                        <div>{appointment.date}</div>
                        <div className="text-sm text-muted-foreground">{appointment.time}</div>
                      </div>
                      <div className="font-medium">{appointment.customer}</div>
                      <div>{appointment.country}</div>
                      <div>{appointment.visaType}</div>
                      <div className="truncate max-w-[200px]" title={appointment.location}>
                        {appointment.location}
                      </div>
                      <div>{getStatusBadge(appointment.status)}</div>
                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Detayları Görüntüle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Takvime Ekle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              Müşteri Bilgileri
                            </DropdownMenuItem>
                            {appointment.status === 'Beklemede' && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                  Randevuyu Onayla
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                  Randevuyu İptal Et
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Toplam 32 randevudan 1-8 arası gösteriliyor
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Önceki
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 p-0">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 p-0">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 p-0">
                    3
                  </Button>
                  <span>...</span>
                  <Button variant="outline" size="sm" className="w-8 p-0">
                    4
                  </Button>
                  <Button variant="outline" size="sm">
                    Sonraki
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Bugünkü Randevular</CardTitle>
                <CardDescription>
                  Bugün için planlanmış randevular
                </CardDescription>
              </CardHeader>
              <CardContent>
                {appointmentsData.slice(0, 2).map((appointment, index) => (
                  <div key={appointment.id} className={`flex items-start ${index !== 0 ? 'mt-4 pt-4 border-t' : ''}`}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Calendar className="h-5 w-5 text-blue-700" />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium">{appointment.customer} - {appointment.time}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.country} - {appointment.visaType}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <MapPin className="inline-block mr-1 h-3 w-3" />
                        {appointment.location}
                      </p>
                      <div className="flex items-center pt-1">
                        {getStatusBadge(appointment.status)}
                        <span className="ml-2 text-xs text-muted-foreground">{appointment.notes}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {appointmentsData.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-40">
                    <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Bugün için planlanmış randevu bulunmuyor</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ülkelere Göre Yaklaşan Randevular</CardTitle>
                <CardDescription>
                  Önümüzdeki 30 gün içindeki randevuların ülkelere göre dağılımı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingByCountry.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div className="ml-4 space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{item.country}</p>
                          <p className="text-sm font-medium">{item.count} randevu</p>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${(item.count / Math.max(...upcomingByCountry.map(c => c.count))) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Randevu Takvimi</CardTitle>
              <CardDescription>
                Haftalık randevu görünümü
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center h-64 border rounded-md bg-muted/10">
                <div className="text-center">
                  <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Takvim görünümü burada gösterilecek</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Tam Takvimi Görüntüle
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 