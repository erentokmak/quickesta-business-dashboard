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
  Building2, 
  Search, 
  Filter, 
  Download, 
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Globe,
  Users,
  ArrowUpDown,
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'

// Dummy data for companies
const companiesData = [
  { 
    id: 'COMP-1001',
    name: 'Teknoloji A.Ş.',
    industry: 'Teknoloji',
    size: '51-200 çalışan',
    location: 'İstanbul, Türkiye',
    contactPerson: 'Ahmet Yılmaz',
    contactEmail: 'ahmet@teknoloji.com',
    contactPhone: '+90 (212) 555 1234',
    status: 'Aktif',
    applications: 12,
    lastActivity: '15.05.2023',
    taxId: '1234567890',
    logo: '/logos/tech-company.png',
  },
  { 
    id: 'COMP-1002',
    name: 'Finans Bank',
    industry: 'Finans',
    size: '201-500 çalışan',
    location: 'İstanbul, Türkiye',
    contactPerson: 'Zeynep Demir',
    contactEmail: 'zeynep@finansbank.com',
    contactPhone: '+90 (212) 555 5678',
    status: 'Aktif',
    applications: 8,
    lastActivity: '12.05.2023',
    taxId: '2345678901',
    logo: '/logos/finance-company.png',
  },
  { 
    id: 'COMP-1003',
    name: 'Sağlık Medikal Ltd.',
    industry: 'Sağlık',
    size: '11-50 çalışan',
    location: 'Ankara, Türkiye',
    contactPerson: 'Mehmet Kaya',
    contactEmail: 'mehmet@saglikmedikal.com',
    contactPhone: '+90 (312) 444 1234',
    status: 'Aktif',
    applications: 5,
    lastActivity: '10.05.2023',
    taxId: '3456789012',
    logo: '/logos/health-company.png',
  },
  { 
    id: 'COMP-1004',
    name: 'Eğitim Akademi',
    industry: 'Eğitim',
    size: '11-50 çalışan',
    location: 'İzmir, Türkiye',
    contactPerson: 'Ayşe Yıldız',
    contactEmail: 'ayse@egitimakademi.com',
    contactPhone: '+90 (232) 333 4567',
    status: 'Aktif',
    applications: 3,
    lastActivity: '08.05.2023',
    taxId: '4567890123',
    logo: '/logos/education-company.png',
  },
  { 
    id: 'COMP-1005',
    name: 'İnşaat Yapı A.Ş.',
    industry: 'İnşaat',
    size: '51-200 çalışan',
    location: 'İstanbul, Türkiye',
    contactPerson: 'Ali Demir',
    contactEmail: 'ali@insaatyapi.com',
    contactPhone: '+90 (212) 666 7890',
    status: 'Pasif',
    applications: 0,
    lastActivity: '01.05.2023',
    taxId: '5678901234',
    logo: '/logos/construction-company.png',
  },
  { 
    id: 'COMP-1006',
    name: 'Turizm Seyahat Ltd.',
    industry: 'Turizm',
    size: '11-50 çalışan',
    location: 'Antalya, Türkiye',
    contactPerson: 'Fatma Şahin',
    contactEmail: 'fatma@turizmseyahat.com',
    contactPhone: '+90 (242) 777 8901',
    status: 'Aktif',
    applications: 15,
    lastActivity: '18.05.2023',
    taxId: '6789012345',
    logo: '/logos/tourism-company.png',
  },
  { 
    id: 'COMP-1007',
    name: 'Üretim Sanayi A.Ş.',
    industry: 'Üretim',
    size: '201-500 çalışan',
    location: 'Bursa, Türkiye',
    contactPerson: 'Mustafa Özkan',
    contactEmail: 'mustafa@uretimsanayi.com',
    contactPhone: '+90 (224) 888 9012',
    status: 'Aktif',
    applications: 7,
    lastActivity: '14.05.2023',
    taxId: '7890123456',
    logo: '/logos/manufacturing-company.png',
  },
  { 
    id: 'COMP-1008',
    name: 'Perakende Market A.Ş.',
    industry: 'Perakende',
    size: '501+ çalışan',
    location: 'İstanbul, Türkiye',
    contactPerson: 'Elif Yılmaz',
    contactEmail: 'elif@perakendemarket.com',
    contactPhone: '+90 (212) 999 0123',
    status: 'Aktif',
    applications: 4,
    lastActivity: '11.05.2023',
    taxId: '8901234567',
    logo: '/logos/retail-company.png',
  },
];

// Industry data
const industryData = [
  { industry: 'Teknoloji', count: 1 },
  { industry: 'Finans', count: 1 },
  { industry: 'Sağlık', count: 1 },
  { industry: 'Eğitim', count: 1 },
  { industry: 'İnşaat', count: 1 },
  { industry: 'Turizm', count: 1 },
  { industry: 'Üretim', count: 1 },
  { industry: 'Perakende', count: 1 },
];

// Company size data
const companySizeData = [
  { size: '1-10 çalışan', count: 0 },
  { size: '11-50 çalışan', count: 3 },
  { size: '51-200 çalışan', count: 2 },
  { size: '201-500 çalışan', count: 2 },
  { size: '501+ çalışan', count: 1 },
];

// Company summary
const companySummary = {
  total: companiesData.length,
  active: companiesData.filter(company => company.status === 'Aktif').length,
  inactive: companiesData.filter(company => company.status === 'Pasif').length,
  totalApplications: companiesData.reduce((sum, company) => sum + company.applications, 0),
};

export default function CompaniesPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aktif':
        return <Badge className="bg-green-500">Aktif</Badge>;
      case 'Pasif':
        return <Badge className="bg-red-500">Pasif</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Aktif':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Pasif':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Şirketler" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <h2 className="text-2xl font-bold tracking-tight">Şirket Yönetimi</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Dışa Aktar
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Şirket Ekle
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Toplam Şirket</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{companySummary.total}</div>
                <p className="text-xs text-muted-foreground">
                  Sistemdeki toplam şirket sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Aktif Şirketler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">{companySummary.active}</div>
                <p className="text-xs text-muted-foreground">
                  Aktif durumdaki şirket sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Pasif Şirketler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">{companySummary.inactive}</div>
                <p className="text-xs text-muted-foreground">
                  Pasif durumdaki şirket sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Toplam Başvuru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{companySummary.totalApplications}</div>
                <p className="text-xs text-muted-foreground">
                  Şirketlerin toplam başvuru sayısı
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Şirket Listesi</CardTitle>
                  <CardDescription>
                    Tüm kurumsal müşteri şirketlerinin listesi
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Tabs defaultValue="all" className="w-[300px]">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="all">Tümü</TabsTrigger>
                      <TabsTrigger value="active">Aktif</TabsTrigger>
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
                    <Input placeholder="Şirket ara..." className="pl-8" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrele
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="name-asc">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sıralama" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name-asc">Şirket Adı (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Şirket Adı (Z-A)</SelectItem>
                      <SelectItem value="applications-desc">Başvuru (Çok-Az)</SelectItem>
                      <SelectItem value="applications-asc">Başvuru (Az-Çok)</SelectItem>
                      <SelectItem value="activity-desc">Son Aktivite (Yeni-Eski)</SelectItem>
                      <SelectItem value="activity-asc">Son Aktivite (Eski-Yeni)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                  <div className="flex items-center col-span-2">
                    <Button variant="ghost" size="sm" className="p-0 h-8 font-medium">
                      Şirket Adı
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div>Sektör</div>
                  <div>İletişim</div>
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="p-0 h-8 font-medium">
                      Başvurular
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div>Durum</div>
                  <div>İşlemler</div>
                </div>
                <div>
                  {companiesData.map((company, index) => (
                    <div
                      key={company.id}
                      className={`grid grid-cols-7 gap-4 p-4 items-center ${
                        index !== companiesData.length - 1 ? 'border-b' : ''
                      }`}
                    >
                      <div className="font-medium col-span-2">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={company.logo} alt={company.name} />
                            <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{company.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {company.id} • {company.size}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Badge variant="outline">{company.industry}</Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          <MapPin className="inline-block h-3 w-3 mr-1" />
                          {company.location}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm">{company.contactPerson}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          <Mail className="inline-block h-3 w-3 mr-1" />
                          {company.contactEmail}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          <Phone className="inline-block h-3 w-3 mr-1" />
                          {company.contactPhone}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{company.applications}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          <Calendar className="inline-block h-3 w-3 mr-1" />
                          Son: {company.lastActivity}
                        </div>
                      </div>
                      <div>{getStatusBadge(company.status)}</div>
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
                              <Edit className="mr-2 h-4 w-4" />
                              Düzenle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Başvuruları Görüntüle
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {company.status === 'Aktif' ? (
                              <DropdownMenuItem>
                                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                Pasife Al
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                Aktife Al
                              </DropdownMenuItem>
                            )}
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
                  Toplam {companiesData.length} şirket gösteriliyor
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
                <CardTitle>Sektör Dağılımı</CardTitle>
                <CardDescription>
                  Şirketlerin sektörlere göre dağılımı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {industryData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <div className="ml-4 space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{item.industry}</p>
                          <p className="text-sm font-medium">{item.count} şirket</p>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${(item.count / companiesData.length) * 100}%` }}
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
                <CardTitle>Şirket Büyüklüğü</CardTitle>
                <CardDescription>
                  Şirketlerin büyüklüğüne göre dağılımı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {companySizeData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div className="ml-4 space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{item.size}</p>
                          <p className="text-sm font-medium">{item.count} şirket</p>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${(item.count / companiesData.length) * 100}%` }}
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
                Şirketlerle ilgili son aktiviteler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                    <Plus className="h-5 w-5 text-blue-700" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">Turizm Seyahat Ltd. şirketi eklendi</p>
                    <p className="text-sm text-muted-foreground">
                      Admin tarafından 2 gün önce
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                    <FileText className="h-5 w-5 text-green-700" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">Teknoloji A.Ş. yeni bir başvuru oluşturdu</p>
                    <p className="text-sm text-muted-foreground">
                      Ahmet Yılmaz tarafından 3 gün önce
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100">
                    <Edit className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">Finans Bank bilgileri güncellendi</p>
                    <p className="text-sm text-muted-foreground">
                      Admin tarafından 4 gün önce
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                    <XCircle className="h-5 w-5 text-red-700" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">İnşaat Yapı A.Ş. pasif duruma alındı</p>
                    <p className="text-sm text-muted-foreground">
                      Admin tarafından 7 gün önce
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