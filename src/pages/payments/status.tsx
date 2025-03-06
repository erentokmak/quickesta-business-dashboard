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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog"
import React from 'react'

// Dummy data for payments
const paymentsData = [
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
    id: 'PAY-1241',
    customer: 'Elif Yılmaz',
    amount: '€140.00',
    date: '08.06.2023',
    status: 'Tamamlandı',
    method: 'Kredi Kartı',
    application: 'Belçika - Turist Vizesi',
    invoice: 'INV-2023-1241',
  },
];

// Payment summary data
const paymentSummary = {
  total: '€1,220.00',
  completed: '€860.00',
  pending: '€320.00',
  cancelled: '€180.00',
  completedCount: 5,
  pendingCount: 2,
  cancelledCount: 1,
  totalCount: 8,
};

export default function PaymentStatusPage() {
  const [selectedPayment, setSelectedPayment] = React.useState<any>(null)

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Tamamlandı':
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
        <PageHeader title="Ödeme Durumu" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <h2 className="text-2xl font-bold tracking-tight">Ödeme Takibi</h2>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Ödeme ara..." className="pl-8" />
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
                <CardTitle className="text-base">Toplam Ödeme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{paymentSummary.total}</div>
                <p className="text-xs text-muted-foreground">
                  {paymentSummary.totalCount} ödeme
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Tamamlanan Ödemeler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">{paymentSummary.completed}</div>
                <p className="text-xs text-muted-foreground">
                  {paymentSummary.completedCount} ödeme
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Bekleyen Ödemeler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-500">{paymentSummary.pending}</div>
                <p className="text-xs text-muted-foreground">
                  {paymentSummary.pendingCount} ödeme
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">İptal Edilen Ödemeler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">{paymentSummary.cancelled}</div>
                <p className="text-xs text-muted-foreground">
                  {paymentSummary.cancelledCount} ödeme
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ödeme Durumu</CardTitle>
                  <CardDescription>
                    Tüm ödemelerin güncel durumu
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Durum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Durumlar</SelectItem>
                      <SelectItem value="completed">Tamamlandı</SelectItem>
                      <SelectItem value="pending">Beklemede</SelectItem>
                      <SelectItem value="cancelled">İptal Edildi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                  <div>Ödeme ID</div>
                  <div>Müşteri</div>
                  <div>Tutar</div>
                  <div>Tarih</div>
                  <div>Durum</div>
                  <div>Ödeme Yöntemi</div>
                  <div>İşlemler</div>
                </div>
                <div>
                  {paymentsData.map((payment, index) => (
                    <Dialog key={payment.id}>
                      <DialogTrigger asChild>
                        <div
                          className={`grid grid-cols-7 gap-4 p-4 items-center cursor-pointer hover:bg-muted/50 ${
                            index !== paymentsData.length - 1 ? 'border-b' : ''
                          }`}
                          onClick={() => setSelectedPayment(payment)}
                        >
                          <div className="font-medium">{payment.id}</div>
                          <div className="font-medium">{payment.customer}</div>
                          <div>{payment.amount}</div>
                          <div>{payment.date}</div>
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
                                {payment.status === 'Beklemede' && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                      Ödemeyi Onayla
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                      Ödemeyi İptal Et
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ödeme Detayları</DialogTitle>
                          <DialogDescription>
                            {selectedPayment?.customer} tarafından yapılan ödeme detayları
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Ödeme ID</p>
                              <p className="text-sm">{selectedPayment?.id}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Müşteri</p>
                              <p className="text-sm">{selectedPayment?.customer}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Tutar</p>
                              <p className="text-sm">{selectedPayment?.amount}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Tarih</p>
                              <p className="text-sm">{selectedPayment?.date}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Durum</p>
                              <div className="mt-1">{getStatusBadge(selectedPayment?.status)}</div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Ödeme Yöntemi</p>
                              <p className="text-sm">{selectedPayment?.method}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Başvuru</p>
                              <p className="text-sm">{selectedPayment?.application}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Fatura No</p>
                              <p className="text-sm">{selectedPayment?.invoice}</p>
                            </div>
                          </div>
                          {selectedPayment?.status === 'Beklemede' && (
                            <div className="pt-4 border-t">
                              <h4 className="text-sm font-medium mb-2">Bekleyen Ödeme Bilgileri</h4>
                              <div className="bg-yellow-50 p-4 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                  Bu ödeme henüz tamamlanmamıştır. Müşteri tarafından ödeme yapılması beklenmektedir.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
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
                        <p className="text-sm font-medium mr-2">4 ödeme</p>
                        <span className="text-xs text-muted-foreground">%50</span>
                      </div>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Banka Havalesi</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium mr-2">2 ödeme</p>
                        <span className="text-xs text-muted-foreground">%25</span>
                      </div>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Online Ödeme</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium mr-2">2 ödeme</p>
                        <span className="text-xs text-muted-foreground">%25</span>
                      </div>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ödeme Durumu Özeti</CardTitle>
                <CardDescription>
                  Ödemelerin durumuna göre dağılımı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    {getStatusIcon('Tamamlandı')}
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Tamamlanan Ödemeler</p>
                      <p className="text-sm text-muted-foreground">
                        {paymentSummary.completedCount} ödeme ({paymentSummary.completed})
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      {Math.round((paymentSummary.completedCount / paymentSummary.totalCount) * 100)}%
                    </div>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon('Beklemede')}
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Bekleyen Ödemeler</p>
                      <p className="text-sm text-muted-foreground">
                        {paymentSummary.pendingCount} ödeme ({paymentSummary.pending})
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      {Math.round((paymentSummary.pendingCount / paymentSummary.totalCount) * 100)}%
                    </div>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon('İptal Edildi')}
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">İptal Edilen Ödemeler</p>
                      <p className="text-sm text-muted-foreground">
                        {paymentSummary.cancelledCount} ödeme ({paymentSummary.cancelled})
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      {Math.round((paymentSummary.cancelledCount / paymentSummary.totalCount) * 100)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Son Ödeme Aktiviteleri</CardTitle>
              <CardDescription>
                Son 24 saat içindeki ödeme aktiviteleri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">Ahmet Yılmaz tarafından ödeme yapıldı</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>15.06.2023 14:30</span>
                      <span className="mx-2">•</span>
                      <CreditCard className="mr-1 h-3 w-3" />
                      <span>Kredi Kartı</span>
                      <span className="mx-2">•</span>
                      <span className="font-medium">€140.00</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">Mehmet Kaya için ödeme bekleniyor</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>13.06.2023 11:15</span>
                      <span className="mx-2">•</span>
                      <CreditCard className="mr-1 h-3 w-3" />
                      <span>Kredi Kartı</span>
                      <span className="mx-2">•</span>
                      <span className="font-medium">€120.00</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <XCircle className="h-8 w-8 text-red-500" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">Ali Yıldız için ödeme iptal edildi</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>11.06.2023 09:45</span>
                      <span className="mx-2">•</span>
                      <CreditCard className="mr-1 h-3 w-3" />
                      <span>Kredi Kartı</span>
                      <span className="mx-2">•</span>
                      <span className="font-medium">€180.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 