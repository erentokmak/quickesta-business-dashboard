'use client'

import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Input } from '@/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { Switch } from '@/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { PageHeader } from '@/components/layout/PageHeader'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'
import {
  Shield, 
  Lock, 
  Key, 
  Smartphone, 
  AlertTriangle, 
  Eye, 
  EyeOff,
  Save,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  LogOut,
} from 'lucide-react'
import { Label } from '@/ui/label'
import { Separator } from '@/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Badge } from '@/ui/badge'
import { Progress } from '@/ui/progress'
import { useState } from 'react'

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: 'Mevcut şifre gereklidir.',
    }),
    newPassword: z
      .string()
      .min(8, {
        message: 'Şifre en az 8 karakter olmalıdır.',
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            'Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.',
        },
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Şifreler eşleşmiyor.',
    path: ['confirmPassword'],
  })

type PasswordFormValues = z.infer<typeof passwordFormSchema>

// Dummy security data
const securityData = {
  lastPasswordChange: '15.05.2023',
  passwordStrength: 85,
  twoFactorEnabled: true,
  loginHistory: [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'İstanbul, Türkiye',
      ip: '192.168.1.1',
      time: '15.06.2023 14:30',
      status: 'success',
    },
    {
      id: 2,
      device: 'Safari on MacOS',
      location: 'Ankara, Türkiye',
      ip: '192.168.1.2',
      time: '14.06.2023 10:15',
      status: 'success',
    },
    {
      id: 3,
      device: 'Firefox on Windows',
      location: 'İzmir, Türkiye',
      ip: '192.168.1.3',
      time: '12.06.2023 09:45',
      status: 'failed',
    },
    {
      id: 4,
      device: 'Chrome on Android',
      location: 'İstanbul, Türkiye',
      ip: '192.168.1.4',
      time: '10.06.2023 16:20',
      status: 'success',
    },
    {
      id: 5,
      device: 'Unknown Device',
      location: 'Berlin, Almanya',
      ip: '192.168.1.5',
      time: '08.06.2023 03:10',
      status: 'blocked',
    },
  ],
  connectedDevices: [
    {
      id: 1,
      name: 'Windows PC',
      type: 'Chrome',
      lastActive: '15.06.2023 14:30',
      location: 'İstanbul, Türkiye',
    },
    {
      id: 2,
      name: 'MacBook Pro',
      type: 'Safari',
      lastActive: '14.06.2023 10:15',
      location: 'Ankara, Türkiye',
    },
    {
      id: 3,
      name: 'iPhone 13',
      type: 'Safari Mobile',
      lastActive: '13.06.2023 18:45',
      location: 'İstanbul, Türkiye',
    },
  ],
};

export default function SecuritySettingsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data: PasswordFormValues) {
    toast({
      title: 'Şifre güncellendi',
      description: 'Şifreniz başarıyla güncellendi.',
    })
  }

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
        <PageHeader
          title="Güvenlik Ayarları"
          items={[{ title: 'Ayarlar', href: '/settings' }]}
        />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <h2 className="text-2xl font-bold tracking-tight">Hesap Güvenliği</h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <Tabs defaultValue="password" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="password">Şifre</TabsTrigger>
                  <TabsTrigger value="2fa">İki Faktörlü Doğrulama</TabsTrigger>
                  <TabsTrigger value="sessions">Oturumlar</TabsTrigger>
                </TabsList>
                
                <TabsContent value="password" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Şifre Değiştirme</CardTitle>
                      <CardDescription>
                        Hesap güvenliğiniz için şifrenizi düzenli olarak değiştirin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Mevcut Şifre</Label>
                        <div className="relative">
                          <Input 
                            id="current-password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••"
                          />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="absolute right-0 top-0 h-full px-3" 
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Yeni Şifre</Label>
                        <div className="relative">
                          <Input 
                            id="new-password" 
                            type={showNewPassword ? "text" : "password"} 
                            placeholder="••••••••"
                          />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="absolute right-0 top-0 h-full px-3" 
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Yeni Şifre (Tekrar)</Label>
                        <div className="relative">
                          <Input 
                            id="confirm-password" 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="••••••••"
                          />
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="absolute right-0 top-0 h-full px-3" 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Şifre Gücü</Label>
                          <span className="text-sm font-medium">{securityData.passwordStrength}%</span>
                        </div>
                        <Progress value={securityData.passwordStrength} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          Güçlü bir şifre için büyük/küçük harf, rakam ve özel karakter kullanın.
                        </p>
                      </div>
                      
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Bilgilendirme</AlertTitle>
                        <AlertDescription>
                          Son şifre değişikliği: {securityData.lastPasswordChange}
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Şifreyi Değiştir
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="2fa" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>İki Faktörlü Doğrulama</CardTitle>
                      <CardDescription>
                        Hesabınızı daha güvenli hale getirmek için iki faktörlü doğrulama kullanın
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>İki Faktörlü Doğrulama</Label>
                          <p className="text-sm text-muted-foreground">
                            Giriş yaparken ek bir doğrulama adımı ekler
                          </p>
                        </div>
                        <Switch defaultChecked={securityData.twoFactorEnabled} />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Smartphone className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="font-medium">SMS ile Doğrulama</p>
                            <p className="text-sm text-muted-foreground">
                              Giriş yaparken telefonunuza SMS ile kod gönderilir
                            </p>
                          </div>
                          <Button variant="outline">Ayarla</Button>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Key className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="font-medium">Kimlik Doğrulayıcı Uygulaması</p>
                            <p className="text-sm text-muted-foreground">
                              Google Authenticator veya benzeri bir uygulama kullanın
                            </p>
                          </div>
                          <Button variant="outline">Ayarla</Button>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Key className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="font-medium">Yedek Kodlar</p>
                            <p className="text-sm text-muted-foreground">
                              Diğer yöntemler kullanılamadığında kullanabileceğiniz kodlar
                            </p>
                          </div>
                          <Button variant="outline">Oluştur</Button>
                        </div>
                      </div>
                      
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Uyarı</AlertTitle>
                        <AlertDescription>
                          İki faktörlü doğrulamayı devre dışı bırakmak hesap güvenliğinizi azaltır.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="sessions" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Aktif Oturumlar</CardTitle>
                      <CardDescription>
                        Hesabınızda aktif olan oturumları yönetin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        {securityData.connectedDevices.map((device) => (
                          <div key={device.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="bg-primary/10 p-2 rounded-full">
                                <Smartphone className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{device.name}</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <span>{device.type}</span>
                                  <span className="mx-2">•</span>
                                  <span>{device.location}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  Son aktif: {device.lastActive}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="text-red-500">
                              Oturumu Kapat
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Giriş Geçmişi</h3>
                        <div className="space-y-4">
                          {securityData.loginHistory.map((login) => (
                            <div key={login.id} className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <p className="font-medium">{login.device}</p>
                                  {getStatusBadge(login.status)}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <span>{login.location}</span>
                                  <span className="mx-2">•</span>
                                  <span>{login.ip}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {login.time}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Yenile
                      </Button>
                      <Button variant="destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Tüm Oturumları Kapat
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="md:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>Güvenlik İpuçları</CardTitle>
                  <CardDescription>
                    Hesabınızı güvende tutmak için öneriler
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">Güçlü Şifre Kullanın</h3>
                    </div>
                    <p className="text-sm text-muted-foreground pl-7">
                      En az 8 karakter uzunluğunda, büyük/küçük harf, rakam ve özel karakter içeren şifreler oluşturun.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">İki Faktörlü Doğrulama</h3>
                    </div>
                    <p className="text-sm text-muted-foreground pl-7">
                      Hesabınıza ekstra bir güvenlik katmanı eklemek için iki faktörlü doğrulamayı etkinleştirin.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">Şüpheli Aktiviteleri Bildirin</h3>
                    </div>
                    <p className="text-sm text-muted-foreground pl-7">
                      Hesabınızda tanımadığınız bir aktivite fark ederseniz hemen şifrenizi değiştirin ve destek ekibimize bildirin.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">Düzenli Şifre Değişimi</h3>
                    </div>
                    <p className="text-sm text-muted-foreground pl-7">
                      Güvenliğiniz için şifrenizi en az 3 ayda bir değiştirmenizi öneririz.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">Güvenli Cihazlar Kullanın</h3>
                    </div>
                    <p className="text-sm text-muted-foreground pl-7">
                      Hesabınıza sadece güvendiğiniz ve güncel güvenlik yazılımlarına sahip cihazlardan erişin.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Shield className="mr-2 h-4 w-4" />
                    Güvenlik Kontrolü Yap
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
