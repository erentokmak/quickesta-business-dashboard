"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select"
import { Textarea } from "@/ui/textarea"
import { Globe, Palette, Layout, Image, Settings, FileText } from "lucide-react"
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'

export default function CreateWebsitePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center gap-2 px-4 py-2 border-b">
          <Globe className="h-5 w-5" />
          <h1 className="text-xl font-semibold">Web Sitesi Oluştur</h1>
        </div>
        <ScrollArea className="h-full">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Web Sitesi Bilgileri</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Site Adı</Label>
                      <div className="relative">
                        <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="siteName"
                          placeholder="Web sitenizin adını girin"
                          className="pl-8"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="siteType">Site Türü</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Site türü seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restaurant">Restoran</SelectItem>
                          <SelectItem value="cafe">Kafe</SelectItem>
                          <SelectItem value="bar">Bar</SelectItem>
                          <SelectItem value="hotel">Otel</SelectItem>
                          <SelectItem value="retail">Perakende</SelectItem>
                          <SelectItem value="portfolio">Portfolyo</SelectItem>
                          <SelectItem value="blog">Blog</SelectItem>
                          <SelectItem value="other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="domain">Domain</Label>
                      <div className="relative">
                        <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="domain"
                          placeholder="www.isletmeniz.com"
                          className="pl-8"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="theme">Tema</Label>
                      <div className="relative">
                        <Palette className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Tema seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="classic">Klasik</SelectItem>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="elegant">Zarif</SelectItem>
                            <SelectItem value="bold">Cesur</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="layout">Sayfa Düzeni</Label>
                      <div className="relative">
                        <Layout className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sayfa düzeni seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standart</SelectItem>
                            <SelectItem value="wide">Geniş</SelectItem>
                            <SelectItem value="boxed">Kutu</SelectItem>
                            <SelectItem value="fullwidth">Tam Genişlik</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="logo">Logo</Label>
                      <div className="relative">
                        <Image className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="logo"
                          type="file"
                          accept="image/*"
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Site Açıklaması</Label>
                    <div className="relative">
                      <FileText className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="description"
                        placeholder="Web siteniz hakkında kısa bir açıklama yazın"
                        className="pl-8 min-h-[100px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="features">Özellikler</Label>
                    <div className="relative">
                      <Settings className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pl-8">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="feature1" className="rounded border-gray-300" />
                          <label htmlFor="feature1">İletişim Formu</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="feature2" className="rounded border-gray-300" />
                          <label htmlFor="feature2">Blog</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="feature3" className="rounded border-gray-300" />
                          <label htmlFor="feature3">Ürün Galerisi</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="feature4" className="rounded border-gray-300" />
                          <label htmlFor="feature4">Randevu Sistemi</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="feature5" className="rounded border-gray-300" />
                          <label htmlFor="feature5">Sosyal Medya Entegrasyonu</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="feature6" className="rounded border-gray-300" />
                          <label htmlFor="feature6">SEO Optimizasyonu</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button variant="outline">İptal</Button>
                    <Button>Web Sitesini Oluştur</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  )
} 