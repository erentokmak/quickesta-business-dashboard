"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import { 
  DollarSign, 
  Users, 
  Package, 
  ShoppingCart,
  TrendingUp,
  BarChart,
  Activity,
  FileText,
  Home
} from "lucide-react"
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center gap-2 px-4 py-2 border-b">
          <Home className="h-5 w-5" />
          <h1 className="text-xl font-semibold">Anasayfa</h1>
        </div>
        <ScrollArea className="h-full">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₺45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% geçen aydan
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Müşteriler</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2,350</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% geçen aydan
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Aktif Ürünler</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    +19% geçen aydan
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bekleyen Siparişler</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 geçen aydan
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
                <TabsTrigger value="analytics">Analitik</TabsTrigger>
                <TabsTrigger value="reports">Raporlar</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Satış Grafiği</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                        Grafik bileşeni buraya gelecek
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Son Siparişler</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Sipariş #1234</p>
                            <p className="text-sm text-muted-foreground">2 ürün - ₺1,234.56</p>
                          </div>
                          <div className="ml-auto font-medium">+₺234.56</div>
                        </div>
                        <div className="flex items-center">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Sipariş #1235</p>
                            <p className="text-sm text-muted-foreground">1 ürün - ₺567.89</p>
                          </div>
                          <div className="ml-auto font-medium">+₺567.89</div>
                        </div>
                        <div className="flex items-center">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Sipariş #1236</p>
                            <p className="text-sm text-muted-foreground">3 ürün - ₺890.12</p>
                          </div>
                          <div className="ml-auto font-medium">+₺890.12</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Performans Metrikleri</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                        Metrik grafikleri buraya gelecek
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Öne Çıkan Ürünler</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Ürün A</p>
                            <p className="text-sm text-muted-foreground">234 satış</p>
                          </div>
                          <div className="ml-auto font-medium">+₺12,345.67</div>
                        </div>
                        <div className="flex items-center">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Ürün B</p>
                            <p className="text-sm text-muted-foreground">123 satış</p>
                          </div>
                          <div className="ml-auto font-medium">+₺8,901.23</div>
                        </div>
                        <div className="flex items-center">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Ürün C</p>
                            <p className="text-sm text-muted-foreground">89 satış</p>
                          </div>
                          <div className="ml-auto font-medium">+₺5,678.90</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="reports" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Rapor İstatistikleri</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                        Rapor grafikleri buraya gelecek
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Son Raporlar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Aylık Satış Raporu</p>
                            <p className="text-sm text-muted-foreground">Ocak 2024</p>
                          </div>
                          <div className="ml-auto">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Müşteri Analizi</p>
                            <p className="text-sm text-muted-foreground">Ocak 2024</p>
                          </div>
                          <div className="ml-auto">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Stok Durumu</p>
                            <p className="text-sm text-muted-foreground">Ocak 2024</p>
                          </div>
                          <div className="ml-auto">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  )
}
