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
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { PageHeader } from '@/components/layout/PageHeader'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'
import {
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Globe, 
  Save,
  Camera,
  Trash2,
  AlertCircle,
  CheckCircle,
  Settings,
  Lock,
  Bell,
  Shield,
  LogOut,
  Smartphone,
} from 'lucide-react'
import { Label } from '@/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Separator } from '@/ui/separator'
import { Switch } from '@/ui/switch'
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Textarea } from '@/ui/textarea'

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Ad en az 2 karakter olmalıdır.',
    })
    .max(30, {
      message: 'Ad en fazla 30 karakter olabilir.',
    }),
  surname: z
    .string()
    .min(2, {
      message: 'Soyad en az 2 karakter olmalıdır.',
    })
    .max(30, {
      message: 'Soyad en fazla 30 karakter olabilir.',
    }),
  email: z
    .string()
    .min(1, {
      message: 'E-posta adresi gereklidir.',
    })
    .email('Geçerli bir e-posta adresi giriniz.'),
  phone: z
    .string()
    .min(1, {
      message: 'Telefon numarası gereklidir.',
    })
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: 'Geçerli bir telefon numarası giriniz.',
    }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// Dummy user data
const userData = {
  id: 'USER-1001',
  name: 'Ahmet Yılmaz',
  email: 'ahmet.yilmaz@example.com',
  phone: '+90 (555) 123 4567',
  role: 'Admin',
  department: 'Yönetim',
  joinDate: '01.01.2023',
  lastActive: '15.06.2023',
  avatar: '/avatars/user-1.png',
  address: {
    street: 'Bağdat Caddesi No: 123',
    city: 'İstanbul',
    district: 'Kadıköy',
    postalCode: '34000',
    country: 'Türkiye',
  },
  language: 'Türkçe',
  timezone: '(GMT+3) İstanbul',
  bio: 'Vize danışmanlığı alanında 10 yıllık deneyime sahibim. Müşterilerimize en iyi hizmeti sunmak için çalışıyorum.',
};

export default function ProfileSettingsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()

  // Dummy data (session'dan gelen verilerle değiştirilecek)
  const defaultValues: Partial<ProfileFormValues> = {
    name: session?.user?.name || 'John',
    surname: session?.user?.surname || 'Doe',
    email: session?.user?.email || 'john.doe@example.com',
    phone: session?.user?.phoneNumber || '+905555555555',
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'Profil güncellendi',
      description: 'Profil bilgileriniz başarıyla güncellendi.',
    })
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Profil Ayarları" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <h2 className="text-2xl font-bold tracking-tight">Profil Bilgileri</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Değişiklikleri Kaydet
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle>Hesap Ayarları</CardTitle>
                  <CardDescription>
                    Profil ve hesap ayarlarınızı yönetin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex flex-col items-center justify-center space-y-3 py-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center space-y-1">
                      <h3 className="text-lg font-medium">{userData.name}</h3>
                      <p className="text-sm text-muted-foreground">{userData.role}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Camera className="mr-2 h-4 w-4" />
                        Değiştir
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Kaldır
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-1 py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Profil</span>
                      </div>
                      <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        Aktif
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1 py-2">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Güvenlik</span>
                    </div>
                  </div>
                  <div className="space-y-1 py-2">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Bildirimler</span>
                    </div>
                  </div>
                  <div className="space-y-1 py-2">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Cihazlar</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-1 py-2">
                    <div className="flex items-center space-x-2 text-red-500">
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm font-medium">Çıkış Yap</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:w-3/4">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="personal">Kişisel Bilgiler</TabsTrigger>
                  <TabsTrigger value="contact">İletişim Bilgileri</TabsTrigger>
                  <TabsTrigger value="preferences">Tercihler</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Kişisel Bilgiler</CardTitle>
                      <CardDescription>
                        Kişisel bilgilerinizi güncelleyin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Ad</Label>
                          <Input id="firstName" defaultValue={userData.name.split(' ')[0]} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Soyad</Label>
                          <Input id="lastName" defaultValue={userData.name.split(' ')[1]} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <div className="flex">
                          <Mail className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Input id="email" type="email" defaultValue={userData.email} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <div className="flex">
                          <Phone className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Input id="phone" defaultValue={userData.phone} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="role">Rol</Label>
                        <Select defaultValue={userData.role.toLowerCase()}>
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Rol seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Yönetici</SelectItem>
                            <SelectItem value="agent">Danışman</SelectItem>
                            <SelectItem value="user">Kullanıcı</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="department">Departman</Label>
                        <Select defaultValue={userData.department.toLowerCase()}>
                          <SelectTrigger id="department">
                            <SelectValue placeholder="Departman seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yönetim">Yönetim</SelectItem>
                            <SelectItem value="satış">Satış</SelectItem>
                            <SelectItem value="danışmanlık">Danışmanlık</SelectItem>
                            <SelectItem value="operasyon">Operasyon</SelectItem>
                            <SelectItem value="muhasebe">Muhasebe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Hakkımda</Label>
                        <Textarea id="bio" rows={4} defaultValue={userData.bio} />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Kaydet
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="contact" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>İletişim Bilgileri</CardTitle>
                      <CardDescription>
                        İletişim bilgilerinizi güncelleyin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Adres</Label>
                        <div className="flex">
                          <MapPin className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Textarea id="address" defaultValue={userData.address.street} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">Şehir</Label>
                          <Input id="city" defaultValue={userData.address.city} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="district">İlçe</Label>
                          <Input id="district" defaultValue={userData.address.district} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Posta Kodu</Label>
                          <Input id="postalCode" defaultValue={userData.address.postalCode} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Ülke</Label>
                          <Select defaultValue="tr">
                            <SelectTrigger id="country">
                              <SelectValue placeholder="Ülke seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tr">Türkiye</SelectItem>
                              <SelectItem value="us">Amerika Birleşik Devletleri</SelectItem>
                              <SelectItem value="gb">Birleşik Krallık</SelectItem>
                              <SelectItem value="de">Almanya</SelectItem>
                              <SelectItem value="fr">Fransa</SelectItem>
                              <SelectItem value="it">İtalya</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Kaydet
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="preferences" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tercihler</CardTitle>
                      <CardDescription>
                        Uygulama tercihlerinizi güncelleyin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Dil</Label>
                        <div className="flex">
                          <Globe className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Select defaultValue="tr">
                            <SelectTrigger id="language">
                              <SelectValue placeholder="Dil seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tr">Türkçe</SelectItem>
                              <SelectItem value="en">İngilizce</SelectItem>
                              <SelectItem value="de">Almanca</SelectItem>
                              <SelectItem value="fr">Fransızca</SelectItem>
                              <SelectItem value="es">İspanyolca</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Saat Dilimi</Label>
                        <div className="flex">
                          <Calendar className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Select defaultValue="europe-istanbul">
                            <SelectTrigger id="timezone">
                              <SelectValue placeholder="Saat dilimi seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="europe-istanbul">(GMT+3) İstanbul</SelectItem>
                              <SelectItem value="europe-london">(GMT+0) Londra</SelectItem>
                              <SelectItem value="america-new_york">(GMT-5) New York</SelectItem>
                              <SelectItem value="asia-tokyo">(GMT+9) Tokyo</SelectItem>
                              <SelectItem value="australia-sydney">(GMT+10) Sydney</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Karanlık Mod</Label>
                            <p className="text-sm text-muted-foreground">
                              Karanlık tema kullan
                            </p>
                          </div>
                          <Switch />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>E-posta Bildirimleri</Label>
                            <p className="text-sm text-muted-foreground">
                              Sistem bildirimleri için e-posta al
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>SMS Bildirimleri</Label>
                            <p className="text-sm text-muted-foreground">
                              Sistem bildirimleri için SMS al
                            </p>
                          </div>
                          <Switch />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>İki Faktörlü Doğrulama</Label>
                            <p className="text-sm text-muted-foreground">
                              Hesap güvenliği için iki faktörlü doğrulama kullan
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Kaydet
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <Alert className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Bilgilendirme</AlertTitle>
                <AlertDescription>
                  Profil bilgilerinizi güncelledikten sonra değişikliklerin uygulanması için sayfayı yenilemeniz gerekebilir.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
