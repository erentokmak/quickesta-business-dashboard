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
  Activity,
  ShoppingCart,
  Clock,
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

// Örnek müşteri davranışları verisi
const customerBehaviors = [
  {
    id: "1",
    name: "Hızlı Alışveriş Yapanlar",
    description: "Ortalama alışveriş süresi 5 dakikadan az olan müşteriler",
    criteria: "Ortalama alışveriş süresi < 5 dakika",
    memberCount: 45,
    avgOrderValue: 850,
    frequency: "Haftalık",
    lastUpdated: "2024-03-20",
  },
  {
    id: "2",
    name: "Detaylı İnceleyenler",
    description: "Ürün sayfalarında ortalama 3 dakikadan fazla zaman geçiren müşteriler",
    criteria: "Ortalama sayfa görüntüleme süresi > 3 dakika",
    memberCount: 38,
    avgOrderValue: 1200,
    frequency: "Aylık",
    lastUpdated: "2024-03-21",
  },
  {
    id: "3",
    name: "Sepet Terk Edenler",
    description: "Sepete ürün ekleyip satın almayı tamamlamayan müşteriler",
    criteria: "Sepet terk oranı > %50",
    memberCount: 62,
    avgOrderValue: 0,
    frequency: "Haftalık",
    lastUpdated: "2024-03-19",
  },
  {
    id: "4",
    name: "İndirim Avcıları",
    description: "Sadece indirimli ürünleri satın alan müşteriler",
    criteria: "İndirimli ürün alım oranı > %80",
    memberCount: 29,
    avgOrderValue: 650,
    frequency: "Aylık",
    lastUpdated: "2024-03-18",
  },
  {
    id: "5",
    name: "Mobil Alışverişçiler",
    description: "Primer olarak mobil uygulama üzerinden alışveriş yapan müşteriler",
    criteria: "Mobil alışveriş oranı > %90",
    memberCount: 53,
    avgOrderValue: 750,
    frequency: "Haftalık",
    lastUpdated: "2024-03-17",
  },
]

export default function CustomerBehaviorsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Arama sorgusuna göre müşteri davranışlarını filtrele
  const filteredBehaviors = customerBehaviors.filter(behavior => 
    behavior.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    behavior.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full">
        <div className="flex flex-col h-full">
          <div className="border-b">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Müşteri Davranışları</h2>
                <p className="text-sm text-muted-foreground">
                  Müşteri davranışlarınızı analiz edin ve yönetin
                </p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Davranış Tanımla
              </Button>
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
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">
                      Tanımlı davranış sayısı
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">227</div>
                    <p className="text-xs text-muted-foreground">
                      Davranış gruplarındaki toplam müşteri
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ortalama Sipariş Değeri</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">890 ₺</div>
                    <p className="text-xs text-muted-foreground">
                      Tüm davranış gruplarının ortalama sipariş değeri
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Müşteri Davranışları</CardTitle>
                      <CardDescription>
                        Tüm müşteri davranışlarınızı görüntüleyin ve yönetin
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Davranış ara..."
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
                        <TableHead>Davranış Adı</TableHead>
                        <TableHead>Açıklama</TableHead>
                        <TableHead>Kriterler</TableHead>
                        <TableHead>Üye Sayısı</TableHead>
                        <TableHead>Ort. Sipariş Değeri</TableHead>
                        <TableHead>Sıklık</TableHead>
                        <TableHead>Son Güncelleme</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBehaviors.map((behavior) => (
                        <TableRow key={behavior.id}>
                          <TableCell className="font-medium">{behavior.name}</TableCell>
                          <TableCell>{behavior.description}</TableCell>
                          <TableCell>{behavior.criteria}</TableCell>
                          <TableCell>{behavior.memberCount}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <ShoppingCart className="h-3 w-3 text-muted-foreground" />
                              <span>{behavior.avgOrderValue} ₺</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span>{behavior.frequency}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span>{behavior.lastUpdated}</span>
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