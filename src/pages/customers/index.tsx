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
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  Download,
  FileText,
  Mail,
  Phone,
} from 'lucide-react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import Link from 'next/link'

// Dummy data for customers
const customersData = [
  { 
    id: 'CUS-001', 
    name: 'Ahmet Yılmaz', 
    email: 'ahmet.yilmaz@example.com', 
    phone: '+90 555 123 4567', 
    applications: 3,
    lastApplication: '15.06.2023',
    status: 'Aktif',
    type: 'Bireysel',
  },
  { 
    id: 'CUS-002', 
    name: 'Ayşe Demir', 
    email: 'ayse.demir@example.com', 
    phone: '+90 555 234 5678', 
    applications: 1,
    lastApplication: '12.06.2023',
    status: 'Aktif',
    type: 'Bireysel',
  },
  { 
    id: 'CUS-003', 
    name: 'Mehmet Kaya', 
    email: 'mehmet.kaya@example.com', 
    phone: '+90 555 345 6789', 
    applications: 2,
    lastApplication: '10.06.2023',
    status: 'Aktif',
    type: 'Bireysel',
  },
  { 
    id: 'CUS-004', 
    name: 'Zeynep Çelik', 
    email: 'zeynep.celik@example.com', 
    phone: '+90 555 456 7890', 
    applications: 1,
    lastApplication: '08.06.2023',
    status: 'Aktif',
    type: 'Bireysel',
  },
  { 
    id: 'CUS-005', 
    name: 'Ali Yıldız', 
    email: 'ali.yildiz@example.com', 
    phone: '+90 555 567 8901', 
    applications: 0,
    lastApplication: '-',
    status: 'Pasif',
    type: 'Bireysel',
  },
  { 
    id: 'CUS-006', 
    name: 'Fatma Şahin', 
    email: 'fatma.sahin@example.com', 
    phone: '+90 555 678 9012', 
    applications: 1,
    lastApplication: '02.06.2023',
    status: 'Aktif',
    type: 'Bireysel',
  },
  { 
    id: 'CUS-007', 
    name: 'ABC Turizm Ltd. Şti.', 
    email: 'info@abcturizm.com', 
    phone: '+90 212 123 4567', 
    applications: 15,
    lastApplication: '01.06.2023',
    status: 'Aktif',
    type: 'Kurumsal',
  },
  { 
    id: 'CUS-008', 
    name: 'XYZ Seyahat Acentası', 
    email: 'info@xyzseyahat.com', 
    phone: '+90 216 234 5678', 
    applications: 8,
    lastApplication: '30.05.2023',
    status: 'Aktif',
    type: 'Kurumsal',
  },
]

export default function CustomersPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Müşteriler" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <h2 className="text-2xl font-bold tracking-tight">Müşteri Yönetimi</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrele
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Dışa Aktar
              </Button>
              <Button size="sm" asChild>
                <Link href="/customers/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Yeni Müşteri
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Toplam Müşteri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{customersData.length}</div>
                <p className="text-xs text-muted-foreground">
                  Kayıtlı toplam müşteri sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Bireysel Müşteriler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {customersData.filter(c => c.type === 'Bireysel').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Bireysel müşteri sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Kurumsal Müşteriler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {customersData.filter(c => c.type === 'Kurumsal').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Kurumsal müşteri sayısı
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Toplam Başvuru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {customersData.reduce((sum, customer) => sum + customer.applications, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Tüm müşterilerin toplam başvuru sayısı
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Müşteri Listesi</CardTitle>
                  <CardDescription>
                    Tüm müşterileri görüntüleyin ve yönetin
                  </CardDescription>
                </div>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Müşteri ara..."
                    className="h-9"
                  />
                  <Button type="submit" size="sm" variant="ghost">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">Tümü</TabsTrigger>
                  <TabsTrigger value="individual">Bireysel</TabsTrigger>
                  <TabsTrigger value="corporate">Kurumsal</TabsTrigger>
                  <TabsTrigger value="active">Aktif</TabsTrigger>
                  <TabsTrigger value="inactive">Pasif</TabsTrigger>
                </TabsList>

                <div className="rounded-md border">
                  <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
                    <div className="col-span-2">Müşteri</div>
                    <div>İletişim</div>
                    <div>Başvurular</div>
                    <div>Son Başvuru</div>
                    <div>Durum</div>
                    <div>İşlemler</div>
                  </div>

                  <TabsContent value="all" className="m-0">
                    {customersData.map((customer, index) => (
                      <div
                        key={customer.id}
                        className={`grid grid-cols-7 gap-4 p-4 items-center ${
                          index !== customersData.length - 1 ? 'border-b' : ''
                        }`}
                      >
                        <div className="col-span-2">
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {customer.id} - {customer.type}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center text-sm">
                            <Mail className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span className="truncate max-w-[150px]">{customer.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>{customer.phone}</span>
                          </div>
                        </div>
                        <div className="text-center">{customer.applications}</div>
                        <div>{customer.lastApplication}</div>
                        <div>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            customer.status === 'Aktif' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {customer.status}
                          </span>
                        </div>
                        <div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Görüntüle</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Düzenle</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Başvuruları Görüntüle</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Sil</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="individual" className="m-0">
                    {customersData
                      .filter(customer => customer.type === 'Bireysel')
                      .map((customer, index, filtered) => (
                        <div
                          key={customer.id}
                          className={`grid grid-cols-7 gap-4 p-4 items-center ${
                            index !== filtered.length - 1 ? 'border-b' : ''
                          }`}
                        >
                          <div className="col-span-2">
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {customer.id} - {customer.type}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center text-sm">
                              <Mail className="mr-1 h-4 w-4 text-muted-foreground" />
                              <span className="truncate max-w-[150px]">{customer.email}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="mr-1 h-4 w-4 text-muted-foreground" />
                              <span>{customer.phone}</span>
                            </div>
                          </div>
                          <div className="text-center">{customer.applications}</div>
                          <div>{customer.lastApplication}</div>
                          <div>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              customer.status === 'Aktif' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {customer.status}
                            </span>
                          </div>
                          <div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Görüntüle</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Düzenle</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span>Başvuruları Görüntüle</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash className="mr-2 h-4 w-4" />
                                  <span>Sil</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                  </TabsContent>

                  <TabsContent value="corporate" className="m-0">
                    {customersData
                      .filter(customer => customer.type === 'Kurumsal')
                      .map((customer, index, filtered) => (
                        <div
                          key={customer.id}
                          className={`grid grid-cols-7 gap-4 p-4 items-center ${
                            index !== filtered.length - 1 ? 'border-b' : ''
                          }`}
                        >
                          <div className="col-span-2">
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {customer.id} - {customer.type}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center text-sm">
                              <Mail className="mr-1 h-4 w-4 text-muted-foreground" />
                              <span className="truncate max-w-[150px]">{customer.email}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="mr-1 h-4 w-4 text-muted-foreground" />
                              <span>{customer.phone}</span>
                            </div>
                          </div>
                          <div className="text-center">{customer.applications}</div>
                          <div>{customer.lastApplication}</div>
                          <div>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              customer.status === 'Aktif' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {customer.status}
                            </span>
                          </div>
                          <div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Görüntüle</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Düzenle</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span>Başvuruları Görüntüle</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash className="mr-2 h-4 w-4" />
                                  <span>Sil</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                  </TabsContent>

                  <TabsContent value="active" className="m-0">
                    {customersData
                      .filter(customer => customer.status === 'Aktif')
                      .map((customer, index, filtered) => (
                        <div
                          key={customer.id}
                          className={`grid grid-cols-7 gap-4 p-4 items-center ${
                            index !== filtered.length - 1 ? 'border-b' : ''
                          }`}
                        >
                          <div className="col-span-2">
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {customer.id} - {customer.type}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center text-sm">
                              <Mail className="mr-1 h-4 w-4 text-muted-foreground" />
                              <span className="truncate max-w-[150px]">{customer.email}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="mr-1 h-4 w-4 text-muted-foreground" />
                              <span>{customer.phone}</span>
                            </div>
                          </div>
                          <div className="text-center">{customer.applications}</div>
                          <div>{customer.lastApplication}</div>
                          <div>
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                              {customer.status}
                            </span>
                          </div>
                          <div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Görüntüle</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Düzenle</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span>Başvuruları Görüntüle</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash className="mr-2 h-4 w-4" />
                                  <span>Sil</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                  </TabsContent>

                  <TabsContent value="inactive" className="m-0">
                    {customersData
                      .filter(customer => customer.status === 'Pasif')
                      .map((customer, index, filtered) => (
                        <div
                          key={customer.id}
                          className={`grid grid-cols-7 gap-4 p-4 items-center ${
                            index !== filtered.length - 1 ? 'border-b' : ''
                          }`}
                        >
                          <div className="col-span-2">
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {customer.id} - {customer.type}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center text-sm">
                              <Mail className="mr-1 h-4 w-4 text-muted-foreground" />
                              <span className="truncate max-w-[150px]">{customer.email}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="mr-1 h-4 w-4 text-muted-foreground" />
                              <span>{customer.phone}</span>
                            </div>
                          </div>
                          <div className="text-center">{customer.applications}</div>
                          <div>{customer.lastApplication}</div>
                          <div>
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                              {customer.status}
                            </span>
                          </div>
                          <div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Görüntüle</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Düzenle</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span>Başvuruları Görüntüle</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash className="mr-2 h-4 w-4" />
                                  <span>Sil</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 