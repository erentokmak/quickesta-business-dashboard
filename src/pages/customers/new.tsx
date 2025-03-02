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
import { Textarea } from '@/ui/textarea'
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Globe, 
  FileText, 
  Save,
  ArrowLeft,
  Upload,
  Trash2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'
import { Label } from '@/ui/label'
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert'
import { Separator } from '@/ui/separator'
import { Switch } from '@/ui/switch'

export default function NewCustomerPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Yeni Müşteri Ekle" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-2xl font-bold tracking-tight">Yeni Müşteri</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">İptal</Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Kaydet
              </Button>
            </div>
          </div>

          <Tabs defaultValue="individual" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="individual">Bireysel Müşteri</TabsTrigger>
              <TabsTrigger value="corporate">Kurumsal Müşteri</TabsTrigger>
            </TabsList>
            
            <TabsContent value="individual" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Kişisel Bilgiler</CardTitle>
                    <CardDescription>
                      Müşterinin temel bilgilerini girin
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Ad</Label>
                        <Input id="firstName" placeholder="Müşteri adı" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Soyad</Label>
                        <Input id="lastName" placeholder="Müşteri soyadı" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <div className="flex">
                        <Mail className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="ornek@email.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <div className="flex">
                        <Phone className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input id="phone" placeholder="+90 (___) ___ __ __" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Doğum Tarihi</Label>
                      <div className="flex">
                        <Calendar className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input id="birthDate" type="date" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Uyruk</Label>
                      <div className="flex">
                        <Globe className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Select>
                          <SelectTrigger id="nationality">
                            <SelectValue placeholder="Uyruk seçin" />
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="idNumber">T.C. Kimlik / Pasaport No</Label>
                      <div className="flex">
                        <FileText className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input id="idNumber" placeholder="Kimlik numarası" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Cinsiyet</Label>
                      <RadioGroup defaultValue="male" className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Erkek</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Kadın</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Diğer</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>İletişim Bilgileri</CardTitle>
                      <CardDescription>
                        Müşterinin adres ve iletişim bilgilerini girin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Adres</Label>
                        <div className="flex">
                          <MapPin className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Textarea id="address" placeholder="Tam adres" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">Şehir</Label>
                          <Input id="city" placeholder="Şehir" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Posta Kodu</Label>
                          <Input id="postalCode" placeholder="Posta kodu" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="country">Ülke</Label>
                        <Select>
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
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Belgeler</CardTitle>
                      <CardDescription>
                        Müşteri ile ilgili belgeleri yükleyin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4">
                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Kimlik / Pasaport</p>
                                <p className="text-xs text-muted-foreground">PDF, JPG veya PNG (max 5MB)</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Yükle
                            </Button>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Adres Belgesi</p>
                                <p className="text-xs text-muted-foreground">PDF, JPG veya PNG (max 5MB)</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Yükle
                            </Button>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Diğer Belgeler</p>
                                <p className="text-xs text-muted-foreground">PDF, JPG veya PNG (max 5MB)</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Yükle
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Ek Bilgiler</CardTitle>
                  <CardDescription>
                    Müşteri ile ilgili ek bilgileri ve notları girin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notlar</Label>
                    <Textarea id="notes" placeholder="Müşteri ile ilgili özel notlar" rows={4} />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>E-posta Bildirimleri</Label>
                        <p className="text-sm text-muted-foreground">
                          Müşteriye e-posta bildirimleri gönder
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Bildirimleri</Label>
                        <p className="text-sm text-muted-foreground">
                          Müşteriye SMS bildirimleri gönder
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>VIP Müşteri</Label>
                        <p className="text-sm text-muted-foreground">
                          Müşteriyi VIP olarak işaretle
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">İptal</Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Müşteriyi Kaydet
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="corporate" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Şirket Bilgileri</CardTitle>
                    <CardDescription>
                      Kurumsal müşterinin temel bilgilerini girin
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Şirket Adı</Label>
                      <div className="flex">
                        <Building2 className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input id="companyName" placeholder="Şirket adı" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="taxId">Vergi Numarası</Label>
                      <div className="flex">
                        <FileText className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input id="taxId" placeholder="Vergi numarası" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Şirket E-postası</Label>
                      <div className="flex">
                        <Mail className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input id="companyEmail" type="email" placeholder="sirket@email.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="companyPhone">Şirket Telefonu</Label>
                      <div className="flex">
                        <Phone className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input id="companyPhone" placeholder="+90 (___) ___ __ __" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="industry">Sektör</Label>
                      <Select>
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Sektör seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Teknoloji</SelectItem>
                          <SelectItem value="finance">Finans</SelectItem>
                          <SelectItem value="healthcare">Sağlık</SelectItem>
                          <SelectItem value="education">Eğitim</SelectItem>
                          <SelectItem value="manufacturing">Üretim</SelectItem>
                          <SelectItem value="retail">Perakende</SelectItem>
                          <SelectItem value="other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="companySize">Şirket Büyüklüğü</Label>
                      <Select>
                        <SelectTrigger id="companySize">
                          <SelectValue placeholder="Şirket büyüklüğü seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 çalışan</SelectItem>
                          <SelectItem value="11-50">11-50 çalışan</SelectItem>
                          <SelectItem value="51-200">51-200 çalışan</SelectItem>
                          <SelectItem value="201-500">201-500 çalışan</SelectItem>
                          <SelectItem value="501+">501+ çalışan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Şirket Adresi</CardTitle>
                      <CardDescription>
                        Kurumsal müşterinin adres bilgilerini girin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyAddress">Adres</Label>
                        <div className="flex">
                          <MapPin className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Textarea id="companyAddress" placeholder="Şirket adresi" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyCity">Şehir</Label>
                          <Input id="companyCity" placeholder="Şehir" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="companyPostalCode">Posta Kodu</Label>
                          <Input id="companyPostalCode" placeholder="Posta kodu" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="companyCountry">Ülke</Label>
                        <Select>
                          <SelectTrigger id="companyCountry">
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
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Yetkili Kişi Bilgileri</CardTitle>
                      <CardDescription>
                        Şirket yetkilisinin bilgilerini girin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contactFirstName">Ad</Label>
                          <Input id="contactFirstName" placeholder="Yetkili adı" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactLastName">Soyad</Label>
                          <Input id="contactLastName" placeholder="Yetkili soyadı" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contactTitle">Ünvan</Label>
                        <Input id="contactTitle" placeholder="Yetkili ünvanı" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">E-posta</Label>
                        <div className="flex">
                          <Mail className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Input id="contactEmail" type="email" placeholder="yetkili@email.com" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Telefon</Label>
                        <div className="flex">
                          <Phone className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Input id="contactPhone" placeholder="+90 (___) ___ __ __" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Şirket Belgeleri ve Ek Bilgiler</CardTitle>
                  <CardDescription>
                    Kurumsal müşteri ile ilgili belgeleri ve ek bilgileri girin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Vergi Levhası</p>
                            <p className="text-xs text-muted-foreground">PDF, JPG veya PNG (max 5MB)</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Yükle
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">İmza Sirküleri</p>
                            <p className="text-xs text-muted-foreground">PDF, JPG veya PNG (max 5MB)</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Yükle
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Ticaret Sicil Gazetesi</p>
                            <p className="text-xs text-muted-foreground">PDF, JPG veya PNG (max 5MB)</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Yükle
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyNotes">Notlar</Label>
                    <Textarea id="companyNotes" placeholder="Şirket ile ilgili özel notlar" rows={4} />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Kurumsal İndirim</Label>
                        <p className="text-sm text-muted-foreground">
                          Bu şirkete kurumsal indirim uygula
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Öncelikli Müşteri</Label>
                        <p className="text-sm text-muted-foreground">
                          Bu şirketi öncelikli müşteri olarak işaretle
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">İptal</Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Şirketi Kaydet
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Bilgilendirme</AlertTitle>
            <AlertDescription>
              Müşteri kaydedildikten sonra, müşteri bilgileri düzenlenebilir ve müşteriye vize başvuruları eklenebilir.
            </AlertDescription>
          </Alert>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 