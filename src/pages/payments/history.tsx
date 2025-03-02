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
  CreditCard, 
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
import { Progress } from '@/ui/progress'
import { DatePickerWithRange } from '@/ui/date-range-picker'

// Dummy data for payment history
const paymentHistoryData = [
  { 
    id: 'PAY-1241',
    customer: 'Elif Yılmaz',
    amount: '€140.00',
    date: '08.06.2023',
    status: 'Tamamlandı',
    method: 'Kredi Kartı',
    application: 'Belçika - Turist Vizesi',
    invoice: 'INV-2023-1241',
  },
  { 
    id: 'PAY-1240',
    customer: 'Mustafa Demir',
    amount: '€200.00',
    date: '09.06.2023',
    status: 'Beklemede',
    method: 'Online Ödeme',
    application: 'Hollanda - Çalışma Vizesi',
    invoice: 'INV-2023-1240',
  },
  { 
    id: 'PAY-1239',
    customer: 'Fatma Şahin',
    amount: '€140.00',
    date: '10.06.2023',
    status: 'Tamamlandı',
    method: 'Banka Havalesi',
    application: 'İngiltere - Turist Vizesi',
    invoice: 'INV-2023-1239',
  },
  { 
    id: 'PAY-1238',
    customer: 'Ali Yıldız',
    amount: '€180.00',
    date: '11.06.2023',
    status: 'İptal Edildi',
    method: 'Kredi Kartı',
    application: 'ABD - İş Vizesi',
    invoice: 'INV-2023-1238',
  },
  { 
    id: 'PAY-1237',
    customer: 'Zeynep Çelik',
    amount: '€140.00',
    date: '12.06.2023',
    status: 'Tamamlandı',
    method: 'Online Ödeme',
    application: 'İspanya - Turist Vizesi',
    invoice: 'INV-2023-1237',
  },
  { 
    id: 'PAY-1236',
    customer: 'Mehmet Kaya',
    amount: '€120.00',
    date: '13.06.2023',
    status: 'Beklemede',
    method: 'Kredi Kartı',
    application: 'Almanya - Öğrenci Vizesi',
    invoice: 'INV-2023-1236',
  },
  { 
    id: 'PAY-1235',
    customer: 'Ayşe Demir',
    amount: '€160.00',
    date: '14.06.2023',
    status: 'Tamamlandı',
    method: 'Banka Havalesi',
    application: 'İtalya - İş Vizesi',
    invoice: 'INV-2023-1235',
  },
  { 
    id: 'PAY-1234',
    customer: 'Ahmet Yılmaz',
    amount: '€140.00',
    date: '15.06.2023',
    status: 'Tamamlandı',
    method: 'Kredi Kartı',
    application: 'Fransa - Turist Vizesi',
    invoice: 'INV-2023-1234',
  },
  { 
    id: 'PAY-1233',
    customer: 'Hasan Kara',
    amount: '€150.00',
    date: '05.06.2023',
    status: 'Tamamlandı',
    method: 'Kredi Kartı',
    application: 'İtalya - Turist Vizesi',
    invoice: 'INV-2023-1233',
  },
  { 
    id: 'PAY-1232',
    customer: 'Selin Yıldırım',
    amount: '€190.00',
    date: '04.06.2023',
    status: 'Tamamlandı',
    method: 'Banka Havalesi',
    application: 'Fransa - İş Vizesi',
    invoice: 'INV-2023-1232',
  },
  { 
    id: 'PAY-1231',
    customer: 'Emre Çetin',
    amount: '€130.00',
    date: '03.06.2023',
    status: 'İptal Edildi',
    method: 'Kredi Kartı',
    application: 'Almanya - Turist Vizesi',
    invoice: 'INV-2023-1231',
  },
  { 
    id: 'PAY-1230',
    customer: 'Deniz Aydın',
    amount: '€170.00',
    date: '02.06.2023',
    status: 'Tamamlandı',
    method: 'Online Ödeme',
    application: 'İspanya - İş Vizesi',
    invoice: 'INV-2023-1230',
  },
];

// Monthly payment summary
const monthlyPaymentData = [
  { month: 'Ocak', count: 42, amount: '€6,300.00' },
  { month: 'Şubat', count: 45, amount: '€6,750.00' },
  { month: 'Mart', count: 50, amount: '€7,500.00' },
  { month: 'Nisan', count: 48, amount: '€7,200.00' },
  { month: 'Mayıs', count: 52, amount: '€7,800.00' },
  { month: 'Haziran', count: 38, amount: '€5,700.00' },
];

export default function PaymentHistoryPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Tamamlandı':
        return <Badge className="bg-green-500">Tamamlandı</Badge>;
      case 'Beklemede':
        return <Badge className="bg-yellow-500">Beklemede</Badge>;
      case 'İptal Edildi':
        return <Badge className="bg-red-500">İptal Edildi</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Ödeme Geçmişi" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <h2 className="text-2xl font-bold tracking-tight">Ödeme Geçmişi</h2>
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
                <CardTitle className="text-base">Toplam İşlem</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">275</div>
                <p className="text-xs text-muted-foreground">
                  Son 6 aydaki toplam ödeme sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Toplam Tutar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">€41,250.00</div>
                <p className="text-xs text-muted-foreground">
                  Son 6 aydaki toplam ödeme tutarı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Aylık Ortalama</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">€6,875.00</div>
                <p className="text-xs text-muted-foreground">
                  Aylık ortalama ödeme tutarı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">En Yüksek Ay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">Mayıs</div>
                <p className="text-xs text-muted-foreground">
                  €7,800.00 (52 ödeme)
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Aylık Ödeme Özeti</CardTitle>
                  <CardDescription>
                    Son 6 aydaki ödeme istatistikleri
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
              <div className="rounded-md border">
                <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                  <div>Ay</div>
                  <div>Ödeme Sayısı</div>
                  <div>Toplam Tutar</div>
                  <div>Ortalama Tutar</div>
                </div>
                <div>
                  {monthlyPaymentData.map((month, index) => (
                    <div
                      key={month.month}
                      className={`grid grid-cols-4 gap-4 p-4 items-center ${
                        index !== monthlyPaymentData.length - 1 ? 'border-b' : ''
                      }`}
                    >
                      <div className="font-medium">{month.month}</div>
                      <div>{month.count} ödeme</div>
                      <div>{month.amount}</div>
                      <div>
                        {`€${(parseFloat(month.amount.replace('€', '').replace(',', '')) / month.count).toFixed(2)}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ödeme Geçmişi</CardTitle>
                  <CardDescription>
                    Tüm ödemelerin detaylı listesi
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Tabs defaultValue="all" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all">Tümü</TabsTrigger>
                      <TabsTrigger value="completed">Tamamlanan</TabsTrigger>
                      <TabsTrigger value="pending">Bekleyen</TabsTrigger>
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
                    <Input placeholder="Ödeme ara..." className="pl-8" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="date-desc">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sıralama" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-desc">Tarih (Yeniden Eskiye)</SelectItem>
                      <SelectItem value="date-asc">Tarih (Eskiden Yeniye)</SelectItem>
                      <SelectItem value="amount-desc">Tutar (Yüksekten Düşüğe)</SelectItem>
                      <SelectItem value="amount-asc">Tutar (Düşükten Yükseğe)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="p-0 h-8 font-medium">
                      Ödeme ID
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div>Müşteri</div>
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="p-0 h-8 font-medium">
                      Tarih
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="p-0 h-8 font-medium">
                      Tutar
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div>Durum</div>
                  <div>Ödeme Yöntemi</div>
                  <div>İşlemler</div>
                </div>
                <div>
                  {paymentHistoryData.map((payment, index) => (
                    <div
                      key={payment.id}
                      className={`grid grid-cols-7 gap-4 p-4 items-center ${
                        index !== paymentHistoryData.length - 1 ? 'border-b' : ''
                      }`}
                    >
                      <div className="font-medium">{payment.id}</div>
                      <div className="font-medium">{payment.customer}</div>
                      <div>{payment.date}</div>
                      <div>{payment.amount}</div>
                      <div>{getStatusBadge(payment.status)}</div>
                      <div>{payment.method}</div>
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
                              <Download className="mr-2 h-4 w-4" />
                              Fatura İndir
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Globe className="mr-2 h-4 w-4" />
                              Başvuru Detayları
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              Müşteri Bilgileri
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Toplam 275 ödemeden 1-12 arası gösteriliyor
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
                    23
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
                <CardTitle>Ödeme Yöntemleri Dağılımı</CardTitle>
                <CardDescription>
                  Ödeme yöntemlerine göre dağılım
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Kredi Kartı</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium mr-2">145 ödeme</p>
                        <span className="text-xs text-muted-foreground">%53</span>
                      </div>
                    </div>
                    <Progress value={53} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Banka Havalesi</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium mr-2">75 ödeme</p>
                        <span className="text-xs text-muted-foreground">%27</span>
                      </div>
                    </div>
                    <Progress value={27} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Online Ödeme</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium mr-2">55 ödeme</p>
                        <span className="text-xs text-muted-foreground">%20</span>
                      </div>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ödeme Durumu Dağılımı</CardTitle>
                <CardDescription>
                  Ödemelerin durumuna göre dağılımı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        <p className="text-sm font-medium">Tamamlandı</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium mr-2">220 ödeme</p>
                        <span className="text-xs text-muted-foreground">%80</span>
                      </div>
                    </div>
                    <Progress value={80} className="h-2 bg-green-100" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                        <p className="text-sm font-medium">Beklemede</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium mr-2">35 ödeme</p>
                        <span className="text-xs text-muted-foreground">%13</span>
                      </div>
                    </div>
                    <Progress value={13} className="h-2 bg-yellow-100" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <XCircle className="mr-2 h-4 w-4 text-red-500" />
                        <p className="text-sm font-medium">İptal Edildi</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium mr-2">20 ödeme</p>
                        <span className="text-xs text-muted-foreground">%7</span>
                      </div>
                    </div>
                    <Progress value={7} className="h-2 bg-red-100" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 