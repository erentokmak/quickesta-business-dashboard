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

// Örnek cihaz verileri
const devices = [
  {
    id: 1,
    name: 'Windows PC',
    type: 'desktop',
    browser: 'Chrome',
    location: 'İstanbul, TR',
    lastActive: '2 dakika önce',
    isCurrent: true,
  },
  {
    id: 2,
    name: 'iPhone 13',
    type: 'mobile',
    browser: 'Safari',
    location: 'İstanbul, TR',
    lastActive: '1 saat önce',
    isCurrent: false,
  },
  {
    id: 3,
    name: 'MacBook Pro',
    type: 'desktop',
    browser: 'Firefox',
    location: 'Ankara, TR',
    lastActive: '3 gün önce',
    isCurrent: false,
  },
]

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
        return <Laptop className="h-6 w-6" />
      case 'mobile':
        return <Smartphone className="h-6 w-6" />
      default:
        return <Globe className="h-6 w-6" />
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader 
          title="Cihaz Yönetimi" 
          items={[
            { title: "Ayarlar", href: "/settings" }
          ]} 
        />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Aktif Cihazlar</CardTitle>
              <CardDescription>
                Hesabınıza bağlı tüm cihazları görüntüleyin ve yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-end">
                <Button variant="outline" onClick={handleLogoutAll}>
                  Diğer Tüm Cihazlardan Çıkış Yap
                </Button>
              </div>

              <div className="space-y-4">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center space-x-4">
                      {getDeviceIcon(device.type)}
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{device.name}</p>
                          {device.isCurrent && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                              Mevcut Cihaz
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {device.browser} • {device.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Son aktif: {device.lastActive}
                        </p>
                      </div>
                    </div>
                    {!device.isCurrent && (
                      <Button
                        variant="ghost"
                        onClick={() => handleLogout(device.id)}
                      >
                        Oturumu Kapat
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Güvenlik İpuçları</CardTitle>
              <CardDescription>
                Cihaz güvenliğinizi artırmak için öneriler.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Düzenli Kontrol</h4>
                <p className="text-sm text-muted-foreground">
                  Bağlı cihazlarınızı düzenli olarak kontrol edin ve
                  tanımadığınız cihazlardan çıkış yapın.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Güçlü Şifre</h4>
                <p className="text-sm text-muted-foreground">
                  Hesap güvenliğiniz için güçlü bir şifre kullanın ve düzenli
                  olarak değiştirin.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">İki Faktörlü Doğrulama</h4>
                <p className="text-sm text-muted-foreground">
                  Ekstra güvenlik için iki faktörlü doğrulamayı aktif edin.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
