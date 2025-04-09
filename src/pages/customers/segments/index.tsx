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
  Calendar,
  DollarSign,
  TrendingUp
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"

// Örnek müşteri segmentleri verisi
const customerSegments = [
  {
    id: "1",
    name: "Yüksek Değerli Müşteriler",
    description: "Son 12 ayda 10.000 TL üzeri harcama yapan müşteriler",
    criteria: "Toplam harcama > 10.000 TL",
    memberCount: 25,
    revenue: 450000,
    lastUpdated: "2024-03-20",
  },
  {
    id: "2",
    name: "Orta Değerli Müşteriler",
    description: "Son 12 ayda 5.000-10.000 TL arası harcama yapan müşteriler",
    criteria: "5.000 TL < Toplam harcama < 10.000 TL",
    memberCount: 42,
    revenue: 315000,
    lastUpdated: "2024-03-21",
  },
  {
    id: "3",
    name: "Düşük Değerli Müşteriler",
    description: "Son 12 ayda 5.000 TL altı harcama yapan müşteriler",
    criteria: "Toplam harcama < 5.000 TL",
    memberCount: 18,
    revenue: 72000,
    lastUpdated: "2024-03-19",
  },
  {
    id: "4",
    name: "Sık Alışveriş Yapanlar",
    description: "Ayda en az 3 kez alışveriş yapan müşteriler",
    criteria: "Aylık sipariş sayısı >= 3",
    memberCount: 35,
    revenue: 175000,
    lastUpdated: "2024-03-18",
  },
  {
    id: "5",
    name: "Sezonsal Alışverişçiler",
    description: "Belirli sezonlarda yoğun alışveriş yapan müşteriler",
    criteria: "Sezonluk alışveriş paterni",
    memberCount: 12,
    revenue: 96000,
    lastUpdated: "2024-03-17",
  },
]

export default function CustomerSegmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Arama sorgusuna göre müşteri segmentlerini filtrele
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
                <h2 className="text-2xl font-semibold tracking-tight">Müşteri Segmentleri</h2>
                <p className="text-sm text-muted-foreground">
                  Müşteri segmentlerinizi yönetin ve analiz edin
                </p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Segment Oluştur
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Segment</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">
                      Aktif müşteri segmenti
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">132</div>
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
                    <div className="text-2xl font-bold">1.108.000 ₺</div>
                    <p className="text-xs text-muted-foreground">
                      Tüm segmentlerden gelen toplam gelir
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Müşteri Segmentleri</CardTitle>
                      <CardDescription>
                        Tüm müşteri segmentlerinizi görüntüleyin ve yönetin
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Segment ara..."
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
                        <TableHead>Segment Adı</TableHead>
                        <TableHead>Açıklama</TableHead>
                        <TableHead>Kriterler</TableHead>
                        <TableHead>Üye Sayısı</TableHead>
                        <TableHead>Gelir</TableHead>
                        <TableHead>Son Güncelleme</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSegments.map((segment) => (
                        <TableRow key={segment.id}>
                          <TableCell className="font-medium">{segment.name}</TableCell>
                          <TableCell>{segment.description}</TableCell>
                          <TableCell>{segment.criteria}</TableCell>
                          <TableCell>{segment.memberCount}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3 text-muted-foreground" />
                              <span>{segment.revenue.toLocaleString()} ₺</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span>{segment.lastUpdated}</span>
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
                                  <TrendingUp className="mr-2 h-4 w-4" />
                                  <span>Analiz Et</span>
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