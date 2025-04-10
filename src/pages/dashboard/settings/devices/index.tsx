'use client'

import { useSession } from 'next-auth/react'
import { Laptop, Smartphone, Globe } from 'lucide-react'

import { Button } from '@/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { useToast } from '@/hooks/use-toast'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { PageHeader } from '@/components/layout/PageHeader'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'
import {
  Monitor,
  Clock,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Shield,
  LogOut,
  Info,
} from 'lucide-react'
import { Badge } from '@/ui/badge'
import { Switch } from '@/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Label } from '@/ui/label'
import { Separator } from '@/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert'

// Dummy devices data
const devicesData = {
  currentDevice: {
    id: 1,
    name: 'Windows PC',
    type: 'desktop',
    browser: 'Chrome 114',
    os: 'Windows 11',
    ip: '192.168.1.1',
    location: 'İstanbul, Türkiye',
    lastActive: 'Şu anda aktif',
    trusted: true,
  },
  devices: [
    {
      id: 1,
      name: 'Windows PC',
      type: 'desktop',
      browser: 'Chrome 114',
      os: 'Windows 11',
      ip: '192.168.1.1',
      location: 'İstanbul, Türkiye',
      lastActive: 'Şu anda aktif',
      trusted: true,
    },
    {
      id: 2,
      name: 'MacBook Pro',
      type: 'laptop',
      browser: 'Safari 16',
      os: 'macOS Ventura',
      ip: '192.168.1.2',
      location: 'Ankara, Türkiye',
      lastActive: '2 saat önce',
      trusted: true,
    },
    {
      id: 3,
      name: 'iPhone 13',
      type: 'mobile',
      browser: 'Safari Mobile 16',
      os: 'iOS 16',
      ip: '192.168.1.3',
      location: 'İstanbul, Türkiye',
      lastActive: '1 gün önce',
      trusted: true,
    },
    {
      id: 4,
      name: 'iPad Pro',
      type: 'tablet',
      browser: 'Safari 16',
      os: 'iPadOS 16',
      ip: '192.168.1.4',
      location: 'İzmir, Türkiye',
      lastActive: '3 gün önce',
      trusted: false,
    },
    {
      id: 5,
      name: 'Android Phone',
      type: 'mobile',
      browser: 'Chrome Mobile 114',
      os: 'Android 13',
      ip: '192.168.1.5',
      location: 'Antalya, Türkiye',
      lastActive: '1 hafta önce',
      trusted: false,
    },
  ],
  recentActivities: [
    {
      id: 1,
      device: 'Windows PC',
      activity: 'Giriş yapıldı',
      time: '15.06.2023 14:30',
      location: 'İstanbul, Türkiye',
      status: 'success',
    },
    {
      id: 2,
      device: 'MacBook Pro',
      activity: 'Şifre değiştirildi',
      time: '14.06.2023 10:15',
      location: 'Ankara, Türkiye',
      status: 'success',
    },
    {
      id: 3,
      device: 'iPhone 13',
      activity: 'Profil güncellendi',
      time: '13.06.2023 18:45',
      location: 'İstanbul, Türkiye',
      status: 'success',
    },
    {
      id: 4,
      device: 'Unknown Device',
      activity: 'Giriş denemesi',
      time: '10.06.2023 03:20',
      location: 'Berlin, Almanya',
      status: 'blocked',
    },
  ],
};

export default function DevicesSettingsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()

  const handleLogout = (deviceId: number) => {
    toast({
      title: 'Oturum sonlandırıldı',
      description: 'Seçilen cihazdan çıkış yapıldı.',
    })
  }

  const handleLogoutAll = () => {
    toast({
      title: 'Tüm oturumlar sonlandırıldı',
      description: 'Aktif cihaz hariç tüm cihazlardan çıkış yapıldı.',
    })
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'desktop':
        return <Monitor className="h-5 w-5 text-primary" />;
      case 'laptop':
        return <Laptop className="h-5 w-5 text-primary" />;
      case 'mobile':
        return <Smartphone className="h-5 w-5 text-primary" />;
      case 'tablet':
        return <Laptop className="h-5 w-5 text-primary" />;
      default:
        return <Smartphone className="h-5 w-5 text-primary" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Başarılı
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="mr-1 h-3 w-3" />
            Başarısız
          </Badge>
        );
      case 'blocked':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Engellendi
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <Clock className="mr-1 h-3 w-3" />
            Beklemede
          </Badge>
        );
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Cihaz Ayarları" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5" />
              <h2 className="text-2xl font-bold tracking-tight">Cihaz Yönetimi</h2>
            </div>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Yenile
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle>Mevcut Cihaz</CardTitle>
                  <CardDescription>
                    Şu anda kullandığınız cihaz bilgileri
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      {getDeviceIcon(devicesData.currentDevice.type)}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{devicesData.currentDevice.name}</h3>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Aktif Cihaz
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Tarayıcı:</span>
                          <span>{devicesData.currentDevice.browser}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">İşletim Sistemi:</span>
                          <span>{devicesData.currentDevice.os}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">IP Adresi:</span>
                          <span>{devicesData.currentDevice.ip}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{devicesData.currentDevice.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="trusted" defaultChecked={devicesData.currentDevice.trusted} />
                    <Label htmlFor="trusted">Güvenilir Cihaz</Label>
                  </div>
                  <Button variant="outline" className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    Oturumu Kapat
                  </Button>
                </CardFooter>
              </Card>

              <Tabs defaultValue="all" className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Tüm Cihazlar</h3>
                  <TabsList>
                    <TabsTrigger value="all">Tümü</TabsTrigger>
                    <TabsTrigger value="trusted">Güvenilir</TabsTrigger>
                    <TabsTrigger value="untrusted">Güvenilir Değil</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="all" className="space-y-4">
                  {devicesData.devices.filter(device => device.id !== devicesData.currentDevice.id).map((device) => (
                    <Card key={device.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            {getDeviceIcon(device.type)}
                          </div>
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{device.name}</h3>
                              {device.trusted ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  Güvenilir
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                  Güvenilir Değil
                                </Badge>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <span className="font-medium">Tarayıcı:</span>
                                <span>{device.browser}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className="font-medium">İşletim Sistemi:</span>
                                <span>{device.os}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className="font-medium">Son Aktif:</span>
                                <span>{device.lastActive}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{device.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Button variant="outline" size="sm">
                              <Shield className="mr-2 h-3 w-3" />
                              {device.trusted ? 'Güvenilir Değil Yap' : 'Güvenilir Yap'}
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500">
                              <LogOut className="mr-2 h-3 w-3" />
                              Oturumu Kapat
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="trusted" className="space-y-4">
                  {devicesData.devices
                    .filter(device => device.trusted && device.id !== devicesData.currentDevice.id)
                    .map((device) => (
                      <Card key={device.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                              {getDeviceIcon(device.type)}
                            </div>
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{device.name}</h3>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  Güvenilir
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <span className="font-medium">Tarayıcı:</span>
                                  <span>{device.browser}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className="font-medium">İşletim Sistemi:</span>
                                  <span>{device.os}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className="font-medium">Son Aktif:</span>
                                  <span>{device.lastActive}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{device.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Button variant="outline" size="sm">
                                <Shield className="mr-2 h-3 w-3" />
                                Güvenilir Değil Yap
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500">
                                <LogOut className="mr-2 h-3 w-3" />
                                Oturumu Kapat
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>
                
                <TabsContent value="untrusted" className="space-y-4">
                  {devicesData.devices
                    .filter(device => !device.trusted && device.id !== devicesData.currentDevice.id)
                    .map((device) => (
                      <Card key={device.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                              {getDeviceIcon(device.type)}
                            </div>
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{device.name}</h3>
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                  Güvenilir Değil
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <span className="font-medium">Tarayıcı:</span>
                                  <span>{device.browser}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className="font-medium">İşletim Sistemi:</span>
                                  <span>{device.os}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className="font-medium">Son Aktif:</span>
                                  <span>{device.lastActive}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{device.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Button variant="outline" size="sm">
                                <Shield className="mr-2 h-3 w-3" />
                                Güvenilir Yap
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500">
                                <LogOut className="mr-2 h-3 w-3" />
                                Oturumu Kapat
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="md:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>Son Aktiviteler</CardTitle>
                  <CardDescription>
                    Cihazlarınızda gerçekleşen son aktiviteler
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {devicesData.recentActivities.map((activity) => (
                    <div key={activity.id} className="space-y-2 pb-4 border-b last:border-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{activity.activity}</p>
                        {getStatusBadge(activity.status)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{activity.device}</span>
                        <span className="mx-2">•</span>
                        <span>{activity.time}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{activity.location}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Aktiviteleri Yenile
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Cihaz Güvenliği</CardTitle>
                  <CardDescription>
                    Cihaz güvenliği ayarlarınızı yönetin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Bilinmeyen Cihazlarda Doğrulama</Label>
                      <p className="text-sm text-muted-foreground">
                        Yeni cihazlarda giriş yaparken ek doğrulama iste
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Şüpheli Giriş Bildirimleri</Label>
                      <p className="text-sm text-muted-foreground">
                        Şüpheli giriş denemeleri için bildirim al
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Otomatik Cihaz Kilitleme</Label>
                      <p className="text-sm text-muted-foreground">
                        Uzun süre kullanılmayan cihazlarda oturumu kapat
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
                <CardFooter>
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Bilgilendirme</AlertTitle>
                    <AlertDescription>
                      Güvenilir cihazlarda bile düzenli olarak şifrenizi değiştirmenizi öneririz.
                    </AlertDescription>
                  </Alert>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
