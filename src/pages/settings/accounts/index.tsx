import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { PageHeader } from '@/components/layout/PageHeader'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Lock, 
  Key, 
  CreditCard, 
  Wallet,
  Building2,
  UserPlus,
  Users,
  Settings,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Edit,
} from 'lucide-react'
import { Label } from '@/ui/label'
import { Switch } from '@/ui/switch'
import { Separator } from '@/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Badge } from '@/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'

// Dummy account data
const accountData = {
  user: {
    id: 'USER-1001',
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    phone: '+90 (555) 123 4567',
    role: 'Admin',
    department: 'Yönetim',
    joinDate: '01.01.2023',
    avatar: '/avatars/user-1.png',
  },
  team: [
    {
      id: 1,
      name: 'Mehmet Demir',
      email: 'mehmet.demir@example.com',
      role: 'Yönetici',
      department: 'Satış',
      status: 'active',
      avatar: '/avatars/user-2.png',
    },
    {
      id: 2,
      name: 'Ayşe Kaya',
      email: 'ayse.kaya@example.com',
      role: 'Danışman',
      department: 'Danışmanlık',
      status: 'active',
      avatar: '/avatars/user-3.png',
    },
    {
      id: 3,
      name: 'Ali Yıldız',
      email: 'ali.yildiz@example.com',
      role: 'Danışman',
      department: 'Danışmanlık',
      status: 'inactive',
      avatar: '/avatars/user-4.png',
    },
  ],
  integrations: [
    {
      id: 1,
      name: 'Google Calendar',
      description: 'Randevuları Google Calendar ile senkronize et',
      connected: true,
      icon: '/icons/google-calendar.png',
    },
    {
      id: 2,
      name: 'Microsoft Outlook',
      description: 'E-postaları Outlook ile senkronize et',
      connected: false,
      icon: '/icons/outlook.png',
    },
    {
      id: 3,
      name: 'Slack',
      description: 'Bildirimler için Slack entegrasyonu',
      connected: true,
      icon: '/icons/slack.png',
    },
    {
      id: 4,
      name: 'Zoom',
      description: 'Görüntülü görüşmeler için Zoom entegrasyonu',
      connected: false,
      icon: '/icons/zoom.png',
    },
  ],
  billing: {
    plan: 'Premium',
    price: '₺499/ay',
    nextBilling: '15.07.2023',
    paymentMethod: {
      type: 'Kredi Kartı',
      last4: '4242',
      expiry: '06/25',
    },
    invoices: [
      {
        id: 'INV-2023-001',
        date: '15.06.2023',
        amount: '₺499',
        status: 'paid',
      },
      {
        id: 'INV-2023-002',
        date: '15.05.2023',
        amount: '₺499',
        status: 'paid',
      },
      {
        id: 'INV-2023-003',
        date: '15.04.2023',
        amount: '₺499',
        status: 'paid',
      },
    ],
  },
};

export default function AccountSettingsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Aktif
          </Badge>
        );
      case 'inactive':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="mr-1 h-3 w-3" />
            Pasif
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <AlertCircle className="mr-1 h-3 w-3" />
            Beklemede
          </Badge>
        );
      case 'paid':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Ödendi
          </Badge>
        );
      case 'unpaid':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="mr-1 h-3 w-3" />
            Ödenmedi
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            {status}
          </Badge>
        );
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Hesap Ayarları" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <h2 className="text-2xl font-bold tracking-tight">Hesap Yönetimi</h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <Tabs defaultValue="team" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="team">Ekip</TabsTrigger>
                  <TabsTrigger value="integrations">Entegrasyonlar</TabsTrigger>
                  <TabsTrigger value="billing">Faturalama</TabsTrigger>
                </TabsList>
                
                <TabsContent value="team" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Ekip Üyeleri</CardTitle>
                          <CardDescription>
                            Ekip üyelerini yönetin ve yeni üyeler ekleyin
                          </CardDescription>
                        </div>
                        <Button>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Yeni Üye Ekle
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        {accountData.team.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{member.name}</h3>
                                <p className="text-sm text-muted-foreground">{member.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <p className="text-sm font-medium">{member.role}</p>
                                <p className="text-xs text-muted-foreground">{member.department}</p>
                              </div>
                              {getStatusBadge(member.status)}
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center justify-between w-full">
                        <p className="text-sm text-muted-foreground">
                          Toplam {accountData.team.length} ekip üyesi
                        </p>
                        <Button variant="outline">
                          <Users className="mr-2 h-4 w-4" />
                          Tüm Ekibi Yönet
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Rol ve İzinler</CardTitle>
                      <CardDescription>
                        Kullanıcı rollerini ve izinlerini yönetin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">Admin</h3>
                            <p className="text-sm text-muted-foreground">
                              Tüm özelliklere tam erişim
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Düzenle
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">Yönetici</h3>
                            <p className="text-sm text-muted-foreground">
                              Çoğu özelliğe erişim, bazı kısıtlamalar
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Düzenle
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">Danışman</h3>
                            <p className="text-sm text-muted-foreground">
                              Müşteri ve başvuru yönetimi
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Düzenle
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">Kullanıcı</h3>
                            <p className="text-sm text-muted-foreground">
                              Sınırlı erişim, sadece görüntüleme
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Düzenle
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Rol Oluştur
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="integrations" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Uygulama Entegrasyonları</CardTitle>
                      <CardDescription>
                        Diğer uygulamalarla entegrasyonları yönetin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {accountData.integrations.map((integration) => (
                        <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={integration.icon} alt={integration.name} />
                                <AvatarFallback>{integration.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                            </div>
                            <div>
                              <h3 className="font-medium">{integration.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {integration.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Switch defaultChecked={integration.connected} />
                            <Button variant="outline" size="sm">
                              {integration.connected ? 'Yapılandır' : 'Bağlan'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Daha Fazla Entegrasyon Keşfet
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>API Erişimi</CardTitle>
                      <CardDescription>
                        API anahtarlarını ve webhook'ları yönetin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="api-key">API Anahtarı</Label>
                        <div className="flex">
                          <Input id="api-key" value="••••••••••••••••••••••••••••••" readOnly className="flex-1" />
                          <Button variant="outline" className="ml-2">Göster</Button>
                          <Button variant="outline" className="ml-2">Yenile</Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Bu anahtarı güvenli tutun. Asla istemci tarafı kodunda kullanmayın.
                        </p>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <div className="flex">
                          <Input id="webhook-url" placeholder="https://example.com/webhook" className="flex-1" />
                          <Button className="ml-2">Kaydet</Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Olaylar hakkında gerçek zamanlı bildirimler almak için webhook URL'si ekleyin.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="billing" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Abonelik Planı</CardTitle>
                      <CardDescription>
                        Mevcut abonelik planınızı yönetin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5">
                        <div>
                          <h3 className="font-medium">{accountData.billing.plan} Plan</h3>
                          <p className="text-sm text-muted-foreground">
                            {accountData.billing.price} - Sonraki fatura: {accountData.billing.nextBilling}
                          </p>
                        </div>
                        <Button>Planı Değiştir</Button>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg text-center">
                          <h3 className="font-medium">Temel</h3>
                          <p className="text-xl font-bold my-2">₺199/ay</p>
                          <p className="text-sm text-muted-foreground">
                            5 kullanıcı<br />
                            Temel özellikler<br />
                            E-posta desteği
                          </p>
                        </div>
                        
                        <div className="p-4 border rounded-lg text-center bg-primary/5 border-primary">
                          <h3 className="font-medium">Premium</h3>
                          <p className="text-xl font-bold my-2">₺499/ay</p>
                          <p className="text-sm text-muted-foreground">
                            20 kullanıcı<br />
                            Tüm özellikler<br />
                            Öncelikli destek
                          </p>
                          <Badge className="mt-2">Mevcut Plan</Badge>
                        </div>
                        
                        <div className="p-4 border rounded-lg text-center">
                          <h3 className="font-medium">Kurumsal</h3>
                          <p className="text-xl font-bold my-2">₺999/ay</p>
                          <p className="text-sm text-muted-foreground">
                            Sınırsız kullanıcı<br />
                            Özel özellikler<br />
                            7/24 destek
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Ödeme Yöntemi</CardTitle>
                      <CardDescription>
                        Ödeme bilgilerinizi güncelleyin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{accountData.billing.paymentMethod.type}</h3>
                            <p className="text-sm text-muted-foreground">
                              **** **** **** {accountData.billing.paymentMethod.last4} - Son Kullanma: {accountData.billing.paymentMethod.expiry}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Düzenle
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Kaldır
                          </Button>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Ödeme Yöntemi Ekle
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Fatura Geçmişi</CardTitle>
                      <CardDescription>
                        Geçmiş faturalarınızı görüntüleyin
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {accountData.billing.invoices.map((invoice) => (
                          <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h3 className="font-medium">{invoice.id}</h3>
                              <p className="text-sm text-muted-foreground">{invoice.date}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <p className="font-medium">{invoice.amount}</p>
                              {getStatusBadge(invoice.status)}
                              <Button variant="outline" size="sm">
                                İndir
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Wallet className="mr-2 h-4 w-4" />
                        Tüm Faturaları Görüntüle
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="md:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>Hesap Bilgileri</CardTitle>
                  <CardDescription>
                    Hesap detaylarınızı görüntüleyin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center space-y-3 py-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={accountData.user.avatar} alt={accountData.user.name} />
                      <AvatarFallback>{accountData.user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center space-y-1">
                      <h3 className="text-lg font-medium">{accountData.user.name}</h3>
                      <p className="text-sm text-muted-foreground">{accountData.user.role}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{accountData.user.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{accountData.user.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{accountData.user.department}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Hesap Durumu</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Plan</p>
                      <Badge>{accountData.billing.plan}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Katılım Tarihi</p>
                      <span className="text-sm">{accountData.user.joinDate}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Profil Ayarları
                  </Button>
                  <Button variant="outline">
                    <Shield className="mr-2 h-4 w-4" />
                    Güvenlik
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Şirket Bilgileri</CardTitle>
                  <CardDescription>
                    Şirket detaylarınızı yönetin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Şirket Adı</Label>
                    <Input id="company-name" defaultValue="Quickesta Vize Danışmanlık Ltd. Şti." />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">Vergi Numarası</Label>
                    <Input id="tax-id" defaultValue="1234567890" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-address">Adres</Label>
                    <Input id="company-address" defaultValue="Bağdat Caddesi No: 123, Kadıköy" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-city">Şehir</Label>
                      <Input id="company-city" defaultValue="İstanbul" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-postal">Posta Kodu</Label>
                      <Input id="company-postal" defaultValue="34000" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-country">Ülke</Label>
                    <Select defaultValue="tr">
                      <SelectTrigger id="company-country">
                        <SelectValue placeholder="Ülke seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tr">Türkiye</SelectItem>
                        <SelectItem value="us">Amerika Birleşik Devletleri</SelectItem>
                        <SelectItem value="gb">Birleşik Krallık</SelectItem>
                        <SelectItem value="de">Almanya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Şirket Bilgilerini Kaydet
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
