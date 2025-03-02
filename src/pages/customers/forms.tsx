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
  FileText, 
  Search, 
  Filter, 
  Download, 
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Copy,
  Send,
  ArrowUpDown,
  Calendar,
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

// Dummy data for customer forms
const formsData = [
  { 
    id: 'FORM-1234',
    name: 'Schengen Vize Başvuru Formu',
    type: 'Başvuru Formu',
    countries: ['Fransa', 'Almanya', 'İtalya', 'İspanya', 'Hollanda'],
    language: 'Türkçe',
    lastUpdated: '15.05.2023',
    status: 'Aktif',
    downloads: 245,
  },
  { 
    id: 'FORM-1235',
    name: 'İngiltere Vize Başvuru Formu',
    type: 'Başvuru Formu',
    countries: ['İngiltere'],
    language: 'Türkçe',
    lastUpdated: '10.05.2023',
    status: 'Aktif',
    downloads: 187,
  },
  { 
    id: 'FORM-1236',
    name: 'ABD Vize Başvuru Formu',
    type: 'Başvuru Formu',
    countries: ['ABD'],
    language: 'Türkçe',
    lastUpdated: '05.05.2023',
    status: 'Aktif',
    downloads: 203,
  },
  { 
    id: 'FORM-1237',
    name: 'Kanada Vize Başvuru Formu',
    type: 'Başvuru Formu',
    countries: ['Kanada'],
    language: 'Türkçe',
    lastUpdated: '01.05.2023',
    status: 'Aktif',
    downloads: 156,
  },
  { 
    id: 'FORM-1238',
    name: 'Avustralya Vize Başvuru Formu',
    type: 'Başvuru Formu',
    countries: ['Avustralya'],
    language: 'Türkçe',
    lastUpdated: '28.04.2023',
    status: 'Aktif',
    downloads: 132,
  },
  { 
    id: 'FORM-1239',
    name: 'Japonya Vize Başvuru Formu',
    type: 'Başvuru Formu',
    countries: ['Japonya'],
    language: 'Türkçe',
    lastUpdated: '25.04.2023',
    status: 'Aktif',
    downloads: 98,
  },
  { 
    id: 'FORM-1240',
    name: 'Vize Başvuru Kontrol Listesi',
    type: 'Kontrol Listesi',
    countries: ['Tümü'],
    language: 'Türkçe',
    lastUpdated: '20.04.2023',
    status: 'Aktif',
    downloads: 312,
  },
  { 
    id: 'FORM-1241',
    name: 'Vize Ret Durumunda Yapılacaklar',
    type: 'Bilgilendirme',
    countries: ['Tümü'],
    language: 'Türkçe',
    lastUpdated: '15.04.2023',
    status: 'Aktif',
    downloads: 178,
  },
  { 
    id: 'FORM-1242',
    name: 'Vize Görüşme Hazırlık Rehberi',
    type: 'Rehber',
    countries: ['Tümü'],
    language: 'Türkçe',
    lastUpdated: '10.04.2023',
    status: 'Aktif',
    downloads: 265,
  },
  { 
    id: 'FORM-1243',
    name: 'Seyahat Sigortası Bilgilendirme',
    type: 'Bilgilendirme',
    countries: ['Tümü'],
    language: 'Türkçe',
    lastUpdated: '05.04.2023',
    status: 'Aktif',
    downloads: 201,
  },
];

// Form types data
const formTypes = [
  { type: 'Başvuru Formu', count: 6 },
  { type: 'Kontrol Listesi', count: 1 },
  { type: 'Bilgilendirme', count: 2 },
  { type: 'Rehber', count: 1 },
];

// Popular countries data
const popularCountries = [
  { country: 'Fransa', count: 245 },
  { country: 'Almanya', count: 230 },
  { country: 'İtalya', count: 215 },
  { country: 'İspanya', count: 200 },
  { country: 'ABD', count: 203 },
];

export default function CustomerFormsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Bilgilendirme Formları" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <h2 className="text-2xl font-bold tracking-tight">Müşteri Formları</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Form Ekle
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Toplam Form</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formsData.length}</div>
                <p className="text-xs text-muted-foreground">
                  Sistemdeki toplam form sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Toplam İndirme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formsData.reduce((sum, form) => sum + form.downloads, 0)}</div>
                <p className="text-xs text-muted-foreground">
                  Tüm formların toplam indirme sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">En Popüler Form</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">Kontrol Listesi</div>
                <p className="text-xs text-muted-foreground">
                  312 indirme
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Aktif Formlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formsData.filter(form => form.status === 'Aktif').length}</div>
                <p className="text-xs text-muted-foreground">
                  Aktif durumda olan form sayısı
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Form Listesi</CardTitle>
                  <CardDescription>
                    Tüm müşteri bilgilendirme ve başvuru formları
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Tabs defaultValue="all" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="all">Tümü</TabsTrigger>
                      <TabsTrigger value="application">Başvuru</TabsTrigger>
                      <TabsTrigger value="info">Bilgilendirme</TabsTrigger>
                      <TabsTrigger value="guide">Rehber</TabsTrigger>
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
                    <Input placeholder="Form ara..." className="pl-8" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrele
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="updated-desc">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sıralama" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="updated-desc">Son Güncelleme (Yeni-Eski)</SelectItem>
                      <SelectItem value="updated-asc">Son Güncelleme (Eski-Yeni)</SelectItem>
                      <SelectItem value="downloads-desc">İndirme (Çok-Az)</SelectItem>
                      <SelectItem value="downloads-asc">İndirme (Az-Çok)</SelectItem>
                      <SelectItem value="name-asc">İsim (A-Z)</SelectItem>
                      <SelectItem value="name-desc">İsim (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                  <div className="flex items-center col-span-2">
                    <Button variant="ghost" size="sm" className="p-0 h-8 font-medium">
                      Form Adı
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div>Tür</div>
                  <div>Ülke</div>
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="p-0 h-8 font-medium">
                      Son Güncelleme
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="p-0 h-8 font-medium">
                      İndirme
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div>İşlemler</div>
                </div>
                <div>
                  {formsData.map((form, index) => (
                    <div
                      key={form.id}
                      className={`grid grid-cols-7 gap-4 p-4 items-center ${
                        index !== formsData.length - 1 ? 'border-b' : ''
                      }`}
                    >
                      <div className="font-medium col-span-2">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          {form.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {form.id} • {form.language}
                        </div>
                      </div>
                      <div>
                        <Badge variant="outline">{form.type}</Badge>
                      </div>
                      <div>
                        {form.countries.length > 1 ? (
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{form.countries[0]} +{form.countries.length - 1}</span>
                          </div>
                        ) : (
                          form.countries[0]
                        )}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        {form.lastUpdated}
                      </div>
                      <div>{form.downloads}</div>
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
                              Görüntüle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              İndir
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Düzenle
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Kopyala
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              E-posta Gönder
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Sil
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
                  Toplam {formsData.length} form gösteriliyor
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Önceki
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 p-0">
                    1
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
                <CardTitle>Form Türleri</CardTitle>
                <CardDescription>
                  Form türlerine göre dağılım
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formTypes.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div className="ml-4 space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{item.type}</p>
                          <p className="text-sm font-medium">{item.count} form</p>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${(item.count / formsData.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popüler Ülkeler</CardTitle>
                <CardDescription>
                  En çok indirilen form ülkeleri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularCountries.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div className="ml-4 space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{item.country}</p>
                          <p className="text-sm font-medium">{item.count} indirme</p>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${(item.count / Math.max(...popularCountries.map(c => c.count))) * 100}%` }}
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
              <CardTitle>Son Aktiviteler</CardTitle>
              <CardDescription>
                Formlarla ilgili son aktiviteler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                    <Download className="h-5 w-5 text-blue-700" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">Schengen Vize Başvuru Formu indirildi</p>
                    <p className="text-sm text-muted-foreground">
                      Ahmet Yılmaz tarafından 2 saat önce
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                    <Plus className="h-5 w-5 text-green-700" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">Yeni form eklendi: Vize Görüşme Hazırlık Rehberi</p>
                    <p className="text-sm text-muted-foreground">
                      Admin tarafından 1 gün önce
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100">
                    <Edit className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">ABD Vize Başvuru Formu güncellendi</p>
                    <p className="text-sm text-muted-foreground">
                      Admin tarafından 2 gün önce
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                    <Send className="h-5 w-5 text-blue-700" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">İngiltere Vize Başvuru Formu e-posta ile gönderildi</p>
                    <p className="text-sm text-muted-foreground">
                      Admin tarafından 3 gün önce
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Tüm Aktiviteleri Görüntüle
              </Button>
            </CardFooter>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 