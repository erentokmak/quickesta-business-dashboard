"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { SidebarProvider, SidebarInset } from "@/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/ui/table"
import { 
  Users,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash,
  Filter,
  UserPlus,
  Calendar
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"

// Örnek müşteri grupları verisi
const customerGroups = [
  {
    id: "1",
    name: "VIP Müşteriler",
    description: "Yüksek değerli müşteriler",
    memberCount: 25,
    createdAt: "2024-01-15",
    lastUpdated: "2024-03-20",
  },
  {
    id: "2",
    name: "Yeni Müşteriler",
    description: "Son 30 gün içinde kayıt olan müşteriler",
    memberCount: 42,
    createdAt: "2024-02-01",
    lastUpdated: "2024-03-21",
  },
  {
    id: "3",
    name: "Sık Alışveriş Yapanlar",
    description: "Ayda en az 3 kez alışveriş yapan müşteriler",
    memberCount: 18,
    createdAt: "2024-02-15",
    lastUpdated: "2024-03-19",
  },
  {
    id: "4",
    name: "Sezonsal Alışverişçiler",
    description: "Belirli sezonlarda yoğun alışveriş yapan müşteriler",
    memberCount: 35,
    createdAt: "2024-03-01",
    lastUpdated: "2024-03-18",
  },
  {
    id: "5",
    name: "İnaktif Müşteriler",
    description: "Son 6 ayda alışveriş yapmayan müşteriler",
    memberCount: 12,
    createdAt: "2024-03-10",
    lastUpdated: "2024-03-17",
  },
]

export default function CustomerGroupsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Arama sorgusuna göre müşteri gruplarını filtrele
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
                <h2 className="text-2xl font-semibold tracking-tight">Müşteri Grupları</h2>
                <p className="text-sm text-muted-foreground">
                  Müşteri gruplarınızı yönetin ve organize edin
                </p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Grup Oluştur
              </Button>
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
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">
                      Aktif müşteri grubu
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Üye</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">132</div>
                    <p className="text-xs text-muted-foreground">
                      Tüm gruplardaki toplam üye sayısı
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ortalama Grup Büyüklüğü</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">26</div>
                    <p className="text-xs text-muted-foreground">
                      Grup başına ortalama üye sayısı
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Müşteri Grupları</CardTitle>
                      <CardDescription>
                        Tüm müşteri gruplarınızı görüntüleyin ve yönetin
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Grup ara..."
                          className="pl-8 w-[250px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtrele
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Grup Adı</TableHead>
                        <TableHead>Açıklama</TableHead>
                        <TableHead>Üye Sayısı</TableHead>
                        <TableHead>Oluşturulma Tarihi</TableHead>
                        <TableHead>Son Güncelleme</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGroups.map((group) => (
                        <TableRow key={group.id}>
                          <TableCell className="font-medium">{group.name}</TableCell>
                          <TableCell>{group.description}</TableCell>
                          <TableCell>{group.memberCount}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span>{group.createdAt}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span>{group.lastUpdated}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Menüyü aç</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Users className="mr-2 h-4 w-4" />
                                  <span>Üyeleri Görüntüle</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <UserPlus className="mr-2 h-4 w-4" />
                                  <span>Üye Ekle</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Düzenle</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash className="mr-2 h-4 w-4" />
                                  <span>Sil</span>
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