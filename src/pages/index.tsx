"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, Package, ShoppingCart } from "lucide-react"
import { Button } from "@/ui/button"

export default function DashboardPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Genel Bakış</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₺45,231.89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+20.1%</span> geçen aya göre
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Müşteriler</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+180.1%</span> geçen aya göre
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
                <span className="text-green-500">+19%</span> geçen aya göre
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
                <span className="text-red-500">-12%</span> geçen aya göre
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
                <CardContent className="pl-4">
                  {/* Buraya grafik komponenti eklenecek */}
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                    Grafik alanı
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Son Siparişler</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Buraya son siparişler listesi eklenecek */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Sipariş #1234</p>
                        <p className="text-sm text-muted-foreground">₺2,500.00</p>
                      </div>
                      <div className="ml-auto font-medium">+₺1,999.00</div>
                    </div>
                    <div className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Sipariş #1235</p>
                        <p className="text-sm text-muted-foreground">₺1,800.00</p>
                      </div>
                      <div className="ml-auto font-medium">+₺1,500.00</div>
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
                  <CardTitle>Analitik Grafiği</CardTitle>
                </CardHeader>
                <CardContent className="pl-4">
                  {/* Buraya analitik grafik komponenti eklenecek */}
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                    Analitik grafik alanı
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Performans Metrikleri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Dönüşüm Oranı</p>
                        <p className="text-sm text-muted-foreground">3.2%</p>
                      </div>
                      <div className="ml-auto font-medium text-green-500">+0.4%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Ortalama Sepet Değeri</p>
                        <p className="text-sm text-muted-foreground">₺450.00</p>
                      </div>
                      <div className="ml-auto font-medium text-green-500">+₺50.00</div>
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
                  <CardTitle>Raporlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Aylık Satış Raporu</p>
                        <p className="text-sm text-muted-foreground">Mart 2024</p>
                      </div>
                      <Button variant="outline" size="sm">
                        İndir
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Müşteri Analizi</p>
                        <p className="text-sm text-muted-foreground">Q1 2024</p>
                      </div>
                      <Button variant="outline" size="sm">
                        İndir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Rapor İstatistikleri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Toplam Rapor</p>
                        <p className="text-sm text-muted-foreground">24</p>
                      </div>
                      <div className="ml-auto font-medium">+4</div>
                    </div>
                    <div className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">İndirilen Raporlar</p>
                        <p className="text-sm text-muted-foreground">156</p>
                      </div>
                      <div className="ml-auto font-medium">+23</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  )
}
