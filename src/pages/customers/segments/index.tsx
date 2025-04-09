"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { SidebarProvider, SidebarInset } from "@/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import { 
  Search,
  MoreHorizontal,
  Plus,
  Users,
  Tag,
  Activity,
  UserPlus,
  Edit,
  Trash,
  ArrowLeft,
  ChevronRight,
  BarChart,
  Users as UsersIcon,
  DollarSign
} from "lucide-react"

// Örnek müşteri segmentleri
const customerSegments = [
  {
    id: "1",
    name: "Yüksek Değerli Müşteriler",
    description: "Aylık ortalama harcaması 1000₺ üzerinde olan müşteriler",
    criteria: "Ortalama sepet tutarı > 1000₺",
    memberCount: 25,
    revenue: 45000,
    lastUpdated: "2024-02-20",
  },
  {
    id: "2",
    name: "Sık Alışveriş Yapanlar",
    description: "Ayda en az 3 kez alışveriş yapan müşteriler",
    criteria: "Aylık sipariş sayısı >= 3",
    memberCount: 35,
    revenue: 28000,
    lastUpdated: "2024-02-18",
  },
  {
    id: "3",
    name: "Yeni Müşteriler",
    description: "Son 30 gün içinde ilk alışverişini yapan müşteriler",
    criteria: "İlk sipariş tarihi son 30 gün içinde",
    memberCount: 15,
    revenue: 7500,
    lastUpdated: "2024-02-15",
  },
  {
    id: "4",
    name: "İnaktif Müşteriler",
    description: "Son 6 ayda alışveriş yapmayan müşteriler",
    criteria: "Son sipariş tarihi > 180 gün önce",
    memberCount: 20,
    revenue: 0,
    lastUpdated: "2024-02-10",
  },
  {
    id: "5",
    name: "Sezonsal Alışverişçiler",
    description: "Belirli sezonlarda yoğun alışveriş yapan müşteriler",
    criteria: "Yaz sezonu alışverişleri > kış sezonu alışverişleri",
    memberCount: 30,
    revenue: 35000,
    lastUpdated: "2024-02-08",
  },
]

export default function CustomerSegmentsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Segmentleri filtrele
  const filteredSegments = customerSegments.filter(segment => 
    segment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    segment.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full">
        <div className="flex flex-col h-full">
          <div className="border-b">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => router.push("/customers")}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-2xl font-semibold tracking-tight">Müşteri Segmentleri</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Müşteri segmentlerini yönetin ve analiz edin
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={() => router.push("/customers/groups")}>
                  <Users className="h-4 w-4 mr-2" />
                  Gruplar
                </Button>
                <Button onClick={() => router.push("/customers/behaviors")}>
                  <Activity className="h-4 w-4 mr-2" />
                  Davranışlar
                </Button>
                <Button onClick={() => router.push("/customers/segments/create")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Segment
                </Button>
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Segment</CardTitle>
                    <Tag className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{customerSegments.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Aktif müşteri segmenti
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {customerSegments.reduce((acc, segment) => acc + segment.memberCount, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tüm segmentlerdeki toplam müşteri
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {customerSegments.reduce((acc, segment) => acc + segment.revenue, 0).toLocaleString("tr-TR")} ₺
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tüm segmentlerden elde edilen gelir
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Segment ara..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Segment Adı</TableHead>
                        <TableHead>Açıklama</TableHead>
                        <TableHead>Kriterler</TableHead>
                        <TableHead>Üye Sayısı</TableHead>
                        <TableHead>Gelir</TableHead>
                        <TableHead>Son Güncelleme</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSegments.map((segment) => (
                        <TableRow key={segment.id}>
                          <TableCell>
                            <div className="font-medium">{segment.name}</div>
                          </TableCell>
                          <TableCell>{segment.description}</TableCell>
                          <TableCell>{segment.criteria}</TableCell>
                          <TableCell>{segment.memberCount}</TableCell>
                          <TableCell>{segment.revenue.toLocaleString("tr-TR")} ₺</TableCell>
                          <TableCell>{segment.lastUpdated}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <UsersIcon className="h-4 w-4 mr-2" />
                                  Üyeleri Görüntüle
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <BarChart className="h-4 w-4 mr-2" />
                                  Analiz Et
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Düzenle
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash className="h-4 w-4 mr-2" />
                                  Sil
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 