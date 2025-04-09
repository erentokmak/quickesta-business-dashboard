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
  ChevronRight
} from "lucide-react"

// Örnek müşteri grupları
const customerGroups = [
  {
    id: "1",
    name: "VIP Müşteriler",
    description: "Yüksek harcama yapan müşteriler",
    memberCount: 25,
    createdAt: "2024-01-15",
    lastUpdated: "2024-02-20",
  },
  {
    id: "2",
    name: "Yeni Müşteriler",
    description: "Son 30 gün içinde kayıt olan müşteriler",
    memberCount: 15,
    createdAt: "2024-01-20",
    lastUpdated: "2024-02-18",
  },
  {
    id: "3",
    name: "Düzenli Alışveriş Yapanlar",
    description: "Ayda en az 2 alışveriş yapan müşteriler",
    memberCount: 45,
    createdAt: "2024-01-25",
    lastUpdated: "2024-02-15",
  },
  {
    id: "4",
    name: "Potansiyel Müşteriler",
    description: "Henüz alışveriş yapmamış kayıtlı müşteriler",
    memberCount: 30,
    createdAt: "2024-02-01",
    lastUpdated: "2024-02-10",
  },
  {
    id: "5",
    name: "Sadık Müşteriler",
    description: "1 yıldan uzun süredir müşterimiz olanlar",
    memberCount: 60,
    createdAt: "2024-02-05",
    lastUpdated: "2024-02-08",
  },
]

export default function CustomerGroupsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Grupları filtrele
  const filteredGroups = customerGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
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
                  <h2 className="text-2xl font-semibold tracking-tight">Müşteri Grupları</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Müşteri gruplarını yönetin ve organize edin
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={() => router.push("/customers/segments")}>
                  <Tag className="h-4 w-4 mr-2" />
                  Segmentler
                </Button>
                <Button onClick={() => router.push("/customers/behaviors")}>
                  <Activity className="h-4 w-4 mr-2" />
                  Davranışlar
                </Button>
                <Button onClick={() => router.push("/customers/groups/create")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Grup
                </Button>
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Grup</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{customerGroups.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Aktif müşteri grubu
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Üye</CardTitle>
                    <UserPlus className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {customerGroups.reduce((acc, group) => acc + group.memberCount, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tüm gruplardaki toplam üye
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ortalama Grup Büyüklüğü</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Math.round(customerGroups.reduce((acc, group) => acc + group.memberCount, 0) / customerGroups.length)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Grup başına ortalama üye
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Grup ara..."
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
                        <TableHead>Grup Adı</TableHead>
                        <TableHead>Açıklama</TableHead>
                        <TableHead>Üye Sayısı</TableHead>
                        <TableHead>Oluşturulma</TableHead>
                        <TableHead>Son Güncelleme</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGroups.map((group) => (
                        <TableRow key={group.id}>
                          <TableCell>
                            <div className="font-medium">{group.name}</div>
                          </TableCell>
                          <TableCell>{group.description}</TableCell>
                          <TableCell>{group.memberCount}</TableCell>
                          <TableCell>{group.createdAt}</TableCell>
                          <TableCell>{group.lastUpdated}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <UserPlus className="h-4 w-4 mr-2" />
                                  Üye Ekle
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