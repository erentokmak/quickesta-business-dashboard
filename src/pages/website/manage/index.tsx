"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import { Switch } from "@/ui/switch"
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'
import { Globe, Settings, Eye, Lock, Globe2, Smartphone, Tablet, Monitor, CheckCircle, XCircle, AlertCircle, RefreshCw, Save, Trash2, Plus, Search, Filter, Download, Upload, Share2, Copy, ExternalLink } from "lucide-react"

export default function WebsiteManagePage() {
  const [activeTab, setActiveTab] = useState("general")
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center gap-2 px-4 py-2 border-b">
          <Globe className="h-5 w-5" />
          <h1 className="text-xl font-semibold">Site Yönetimi</h1>
        </div>
        <ScrollArea className="h-full">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Web Sitenizi Yönetin</h2>
                <p className="text-muted-foreground">
                  Web sitenizin ayarlarını buradan yapılandırabilirsiniz.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Önizleme
                </Button>
                <Button size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Değişiklikleri Kaydet
                </Button>
              </div>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
              <TabsList>
                <TabsTrigger value="general">Genel</TabsTrigger>
                <TabsTrigger value="appearance">Görünüm</TabsTrigger>
                <TabsTrigger value="pages">Sayfalar</TabsTrigger>
                <TabsTrigger value="navigation">Navigasyon</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="integrations">Entegrasyonlar</TabsTrigger>
                <TabsTrigger value="advanced">Gelişmiş</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Genel Ayarlar</CardTitle>
                    <CardDescription>
                      Web sitenizin temel ayarlarını buradan yapılandırabilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="siteName">Site Adı</Label>
                        <Input id="siteName" placeholder="Web sitenizin adı" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="siteUrl">Site URL</Label>
                        <div className="flex">
                          <Input id="siteUrl" placeholder="www.example.com" />
                          <Button variant="outline" className="ml-2">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="siteDescription">Site Açıklaması</Label>
                        <Input id="siteDescription" placeholder="Web sitenizin kısa açıklaması" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="siteLanguage">Site Dili</Label>
                        <select id="siteLanguage" className="w-full rounded-md border border-input bg-background px-3 py-2">
                          <option value="tr">Türkçe</option>
                          <option value="en">English</option>
                          <option value="de">Deutsch</option>
                          <option value="fr">Français</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="maintenanceMode">Bakım Modu</Label>
                        <Switch id="maintenanceMode" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Bakım modu aktifken, ziyaretçiler sitenizi görüntüleyemez.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="enableComments">Yorumlar</Label>
                        <Switch id="enableComments" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ziyaretçilerin içeriklerinize yorum yapmasına izin verin.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Değişiklikleri Kaydet
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Görünüm Ayarları</CardTitle>
                    <CardDescription>
                      Web sitenizin görünümünü buradan özelleştirebilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="theme">Tema</Label>
                        <select id="theme" className="w-full rounded-md border border-input bg-background px-3 py-2">
                          <option value="light">Açık Tema</option>
                          <option value="dark">Koyu Tema</option>
                          <option value="system">Sistem Teması</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="primaryColor">Ana Renk</Label>
                        <div className="flex">
                          <Input id="primaryColor" type="color" className="h-10 w-20 p-1" defaultValue="#3b82f6" />
                          <Input id="primaryColorHex" className="ml-2" defaultValue="#3b82f6" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fontFamily">Yazı Tipi</Label>
                        <select id="fontFamily" className="w-full rounded-md border border-input bg-background px-3 py-2">
                          <option value="inter">Inter</option>
                          <option value="roboto">Roboto</option>
                          <option value="open-sans">Open Sans</option>
                          <option value="montserrat">Montserrat</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fontSize">Yazı Boyutu</Label>
                        <select id="fontSize" className="w-full rounded-md border border-input bg-background px-3 py-2">
                          <option value="small">Küçük</option>
                          <option value="medium" selected>Orta</option>
                          <option value="large">Büyük</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Logo</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-20 w-20 rounded-md border border-dashed flex items-center justify-center">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            Logo Yükle
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG veya SVG formatında, maksimum 2MB
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Favicon</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-md border border-dashed flex items-center justify-center">
                          <Upload className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            Favicon Yükle
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            PNG veya ICO formatında, maksimum 1MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Değişiklikleri Kaydet
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="pages" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sayfa Yönetimi</CardTitle>
                    <CardDescription>
                      Web sitenizin sayfalarını buradan yönetebilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Sayfa ara..." className="pl-8" />
                      </div>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Sayfa
                      </Button>
                    </div>
                    
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="h-10 px-4 text-left align-middle font-medium">Sayfa Adı</th>
                            <th className="h-10 px-4 text-left align-middle font-medium">URL</th>
                            <th className="h-10 px-4 text-left align-middle font-medium">Durum</th>
                            <th className="h-10 px-4 text-left align-middle font-medium">Son Güncelleme</th>
                            <th className="h-10 px-4 text-left align-middle font-medium">İşlemler</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-4">Ana Sayfa</td>
                            <td className="p-4">/</td>
                            <td className="p-4">
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Yayında
                              </span>
                            </td>
                            <td className="p-4">12.05.2023</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Settings className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4">Hakkımızda</td>
                            <td className="p-4">/hakkimizda</td>
                            <td className="p-4">
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Yayında
                              </span>
                            </td>
                            <td className="p-4">10.05.2023</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Settings className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4">İletişim</td>
                            <td className="p-4">/iletisim</td>
                            <td className="p-4">
                              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                <AlertCircle className="mr-1 h-3 w-3" />
                                Taslak
                              </span>
                            </td>
                            <td className="p-4">08.05.2023</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Settings className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4">Blog</td>
                            <td className="p-4">/blog</td>
                            <td className="p-4">
                              <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                <XCircle className="mr-1 h-3 w-3" />
                                Devre Dışı
                              </span>
                            </td>
                            <td className="p-4">05.05.2023</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Settings className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="navigation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Navigasyon Ayarları</CardTitle>
                    <CardDescription>
                      Web sitenizin menü yapısını buradan düzenleyebilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Ana Menü</h3>
                        <Button variant="outline" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Menü Öğesi Ekle
                        </Button>
                      </div>
                      
                      <div className="rounded-md border">
                        <div className="p-4 border-b">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Ana Sayfa</span>
                              <span className="text-xs text-muted-foreground">/</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border-b">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Hakkımızda</span>
                              <span className="text-xs text-muted-foreground">/hakkimizda</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border-b">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Hizmetler</span>
                              <span className="text-xs text-muted-foreground">/hizmetler</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">İletişim</span>
                              <span className="text-xs text-muted-foreground">/iletisim</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Değişiklikleri Kaydet
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="seo" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Ayarları</CardTitle>
                    <CardDescription>
                      Web sitenizin arama motoru optimizasyonunu buradan yapılandırabilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="metaTitle">Meta Başlık</Label>
                      <Input id="metaTitle" placeholder="Web sitenizin meta başlığı" />
                      <p className="text-xs text-muted-foreground">
                        Arama sonuçlarında görünecek başlık (50-60 karakter arası önerilir)
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">Meta Açıklama</Label>
                      <textarea
                        id="metaDescription"
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                        placeholder="Web sitenizin meta açıklaması"
                      />
                      <p className="text-xs text-muted-foreground">
                        Arama sonuçlarında görünecek açıklama (150-160 karakter arası önerilir)
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="metaKeywords">Meta Anahtar Kelimeler</Label>
                      <Input id="metaKeywords" placeholder="anahtar, kelimeler, virgülle, ayrılmış" />
                      <p className="text-xs text-muted-foreground">
                        Arama motorları için anahtar kelimeler (virgülle ayrılmış)
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="robotsTxt">Robots.txt</Label>
                      <textarea
                        id="robotsTxt"
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 font-mono text-xs"
                        defaultValue="User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sitemapXml">Sitemap.xml</Label>
                      <div className="flex items-center gap-2">
                        <Input id="sitemapXml" value="https://example.com/sitemap.xml" readOnly />
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Değişiklikleri Kaydet
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="integrations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Entegrasyonlar</CardTitle>
                    <CardDescription>
                      Web sitenize çeşitli hizmetleri entegre edebilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-bold">F</span>
                            </div>
                            <div>
                              <h3 className="font-medium">Facebook</h3>
                              <p className="text-sm text-muted-foreground">Facebook entegrasyonu</p>
                            </div>
                          </div>
                          <Switch />
                        </div>
                      </div>
                      
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-bold">T</span>
                            </div>
                            <div>
                              <h3 className="font-medium">Twitter</h3>
                              <p className="text-sm text-muted-foreground">Twitter entegrasyonu</p>
                            </div>
                          </div>
                          <Switch />
                        </div>
                      </div>
                      
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                              <span className="text-red-600 font-bold">G</span>
                            </div>
                            <div>
                              <h3 className="font-medium">Google Analytics</h3>
                              <p className="text-sm text-muted-foreground">Ziyaretçi istatistikleri</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                      
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <span className="text-green-600 font-bold">M</span>
                            </div>
                            <div>
                              <h3 className="font-medium">Mailchimp</h3>
                              <p className="text-sm text-muted-foreground">E-posta pazarlama</p>
                            </div>
                          </div>
                          <Switch />
                        </div>
                      </div>
                      
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                              <span className="text-purple-600 font-bold">S</span>
                            </div>
                            <div>
                              <h3 className="font-medium">Stripe</h3>
                              <p className="text-sm text-muted-foreground">Ödeme işlemleri</p>
                            </div>
                          </div>
                          <Switch />
                        </div>
                      </div>
                      
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                              <span className="text-yellow-600 font-bold">C</span>
                            </div>
                            <div>
                              <h3 className="font-medium">Calendly</h3>
                              <p className="text-sm text-muted-foreground">Randevu planlama</p>
                            </div>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Gelişmiş Ayarlar</CardTitle>
                    <CardDescription>
                      Web sitenizin gelişmiş ayarlarını buradan yapılandırabilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customCss">Özel CSS</Label>
                      <textarea
                        id="customCss"
                        className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 font-mono text-xs"
                        placeholder="/* Özel CSS kodlarınızı buraya yazın */"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="customJs">Özel JavaScript</Label>
                      <textarea
                        id="customJs"
                        className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 font-mono text-xs"
                        placeholder="// Özel JavaScript kodlarınızı buraya yazın"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="headerCode">Header Kodu</Label>
                      <textarea
                        id="headerCode"
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 font-mono text-xs"
                        placeholder="<head> etiketine eklenecek kodlar"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="footerCode">Footer Kodu</Label>
                      <textarea
                        id="footerCode"
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 font-mono text-xs"
                        placeholder="</body> etiketinden önce eklenecek kodlar"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="enableCache">Önbellek</Label>
                        <Switch id="enableCache" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Web sitenizin performansını artırmak için önbellek kullanın.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="enableCompression">Sıkıştırma</Label>
                        <Switch id="enableCompression" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Web sitenizin yüklenme hızını artırmak için dosyaları sıkıştırın.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Değişiklikleri Kaydet
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  )
} 