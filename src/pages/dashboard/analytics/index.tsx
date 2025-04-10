"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { SidebarProvider, SidebarInset } from "@/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import { 
  BarChart,
  LineChart,
  PieChart,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Calendar,
  Filter,
  Download
} from "lucide-react"

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [dateRange, setDateRange] = useState("7d")

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full">
        <div className="flex flex-col h-full">
          <div className="border-b">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">İstatistikler</h2>
                <p className="text-sm text-muted-foreground">
                  İşletmenizin performansını analiz edin
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  className="p-2 border rounded-md"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="7d">Son 7 Gün</option>
                  <option value="30d">Son 30 Gün</option>
                  <option value="90d">Son 90 Gün</option>
                  <option value="1y">Son 1 Yıl</option>
                </select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrele
                </Button>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Rapor İndir
                </Button>
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₺24,500</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% geçen aya göre
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Yeni Müşteriler</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+235</div>
                    <p className="text-xs text-muted-foreground">
                      +18.2% geçen aya göre
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Siparişler</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +12.5% geçen aya göre
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ortalama Sepet Değeri</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₺42.75</div>
                    <p className="text-xs text-muted-foreground">
                      +5.3% geçen aya göre
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <BarChart className="w-4 h-4" />
                    Genel Bakış
                  </TabsTrigger>
                  <TabsTrigger value="sales" className="flex items-center gap-2">
                    <LineChart className="w-4 h-4" />
                    Satışlar
                  </TabsTrigger>
                  <TabsTrigger value="customers" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Müşteriler
                  </TabsTrigger>
                  <TabsTrigger value="products" className="flex items-center gap-2">
                    <PieChart className="w-4 h-4" />
                    Ürünler
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Gelir Grafiği</CardTitle>
                        <CardDescription>
                          Son 30 günlük gelir dağılımı
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center border rounded-md">
                          <p className="text-muted-foreground">Gelir grafiği burada görüntülenecek</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Sipariş Dağılımı</CardTitle>
                        <CardDescription>
                          Sipariş durumlarına göre dağılım
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center border rounded-md">
                          <p className="text-muted-foreground">Sipariş dağılım grafiği burada görüntülenecek</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle>En Çok Satan Ürünler</CardTitle>
                      <CardDescription>
                        Son 30 günün en çok satan ürünleri
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center border rounded-md">
                        <p className="text-muted-foreground">En çok satan ürünler tablosu burada görüntülenecek</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="sales" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Satış Trendi</CardTitle>
                      <CardDescription>
                        Zaman içindeki satış performansı
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px] flex items-center justify-center border rounded-md">
                        <p className="text-muted-foreground">Satış trendi grafiği burada görüntülenecek</p>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Ödeme Yöntemleri</CardTitle>
                        <CardDescription>
                          Ödeme yöntemlerine göre dağılım
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center border rounded-md">
                          <p className="text-muted-foreground">Ödeme yöntemleri grafiği burada görüntülenecek</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Kâr Marjı</CardTitle>
                        <CardDescription>
                          Ürün kategorilerine göre kâr marjı
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center border rounded-md">
                          <p className="text-muted-foreground">Kâr marjı grafiği burada görüntülenecek</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="customers" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Müşteri Edinimi</CardTitle>
                      <CardDescription>
                        Zaman içindeki müşteri edinimi
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px] flex items-center justify-center border rounded-md">
                        <p className="text-muted-foreground">Müşteri edinimi grafiği burada görüntülenecek</p>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Müşteri Segmentleri</CardTitle>
                        <CardDescription>
                          Müşteri segmentlerine göre dağılım
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center border rounded-md">
                          <p className="text-muted-foreground">Müşteri segmentleri grafiği burada görüntülenecek</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Müşteri Yaşam Boyu Değeri</CardTitle>
                        <CardDescription>
                          Müşteri segmentlerine göre yaşam boyu değer
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center border rounded-md">
                          <p className="text-muted-foreground">Müşteri yaşam boyu değeri grafiği burada görüntülenecek</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="products" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ürün Performansı</CardTitle>
                      <CardDescription>
                        En çok satan ürünlerin performansı
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px] flex items-center justify-center border rounded-md">
                        <p className="text-muted-foreground">Ürün performans grafiği burada görüntülenecek</p>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Kategori Dağılımı</CardTitle>
                        <CardDescription>
                          Ürün kategorilerine göre satış dağılımı
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center border rounded-md">
                          <p className="text-muted-foreground">Kategori dağılım grafiği burada görüntülenecek</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Stok Durumu</CardTitle>
                        <CardDescription>
                          Kategorilere göre stok durumu
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center border rounded-md">
                          <p className="text-muted-foreground">Stok durumu grafiği burada görüntülenecek</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 