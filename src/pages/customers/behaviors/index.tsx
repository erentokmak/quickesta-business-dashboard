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
  DollarSign,
  Clock
} from "lucide-react"

// Örnek müşteri davranışları
const customerBehaviors = [
  {
    id: "1",
    name: "Hızlı Alışveriş",
    description: "Ortalama alışveriş süresi 5 dakikadan az olan müşteriler",
    criteria: "Ortalama alışveriş süresi < 5 dakika",
    frequency: "daily",
    memberCount: 25,
    lastUpdated: "2024-02-20",
  },
  {
    id: "2",
    name: "Gece Alışverişi",
    description: "Gece 22:00 - 06:00 arası alışveriş yapan müşteriler",
    criteria: "Alışveriş saati 22:00 - 06:00 arası",
    frequency: "daily",
    memberCount: 15,
    lastUpdated: "2024-02-18",
  },
  {
    id: "3",
    name: "Hafta Sonu Alışverişi",
    description: "Sadece hafta sonları alışveriş yapan müşteriler",
    criteria: "Alışveriş günü Cumartesi veya Pazar",
    frequency: "weekly",
    memberCount: 35,
    lastUpdated: "2024-02-15",
  },
  {
    id: "4",
    name: "Sezonsal Alışveriş",
    description: "Belirli sezonlarda yoğun alışveriş yapan müşteriler",
    criteria: "Yaz sezonu alışverişleri > kış sezonu alışverişleri",
    frequency: "monthly",
    memberCount: 20,
    lastUpdated: "2024-02-10",
  },
  {
    id: "5",
    name: "İndirim Takipçisi",
    description: "Sadece indirimli ürünleri satın alan müşteriler",
    criteria: "İndirimli ürün oranı > %80",
    frequency: "monthly",
    memberCount: 30,
    lastUpdated: "2024-02-08",
  },
]

export default function CustomerBehaviorsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Davranışları filtrele
  const filteredBehaviors = customerBehaviors.filter(behavior => 
    behavior.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    behavior.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sıklık etiketini formatla
  const formatFrequency = (frequency: string) => {
    switch (frequency) {
      case "daily":
        return "Günlük"
      case "weekly":
        return "Haftalık"
      case "monthly":
        return "Aylık"
      case "quarterly":
        return "3 Aylık"
      case "yearly":
        return "Yıllık"
      default:
        return frequency
    }
  }

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
                  <h2 className="text-2xl font-semibold tracking-tight">Müşteri Davranışları</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Müşteri davranışlarını yönetin ve analiz edin
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={() => router.push("/customers/groups")}>
                  <Users className="h-4 w-4 mr-2" />
                  Gruplar
                </Button>
                <Button onClick={() => router.push("/customers/segments")}>
                  <Tag className="h-4 w-4 mr-2" />
                  Segmentler
                </Button>
                <Button onClick={() => router.push("/customers/behaviors/create")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Davranış
                </Button>
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Davranış</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{customerBehaviors.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Aktif müşteri davranışı
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
                      {customerBehaviors.reduce((acc, behavior) => acc + behavior.memberCount, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tüm davranışlardaki toplam müşteri
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ortalama Grup Büyüklüğü</CardTitle>
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Math.round(customerBehaviors.reduce((acc, behavior) => acc + behavior.memberCount, 0) / customerBehaviors.length)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Davranış başına ortalama müşteri
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Davranış ara..."
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
                        <TableHead>Davranış Adı</TableHead>
                        <TableHead>Açıklama</TableHead>
                        <TableHead>Kriterler</TableHead>
                        <TableHead>Sıklık</TableHead>
                        <TableHead>Üye Sayısı</TableHead>
                        <TableHead>Son Güncelleme</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBehaviors.map((behavior) => (
                        <TableRow key={behavior.id}>
                          <TableCell>
                            <div className="font-medium">{behavior.name}</div>
                          </TableCell>
                          <TableCell>{behavior.description}</TableCell>
                          <TableCell>{behavior.criteria}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {formatFrequency(behavior.frequency)}
                            </div>
                          </TableCell>
                          <TableCell>{behavior.memberCount}</TableCell>
                          <TableCell>{behavior.lastUpdated}</TableCell>
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