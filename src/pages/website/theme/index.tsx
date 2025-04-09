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
import { Palette, Layout, Type, Image, Save, Eye, RefreshCw, CheckCircle, XCircle, AlertCircle, Plus, Trash2, Upload, Download, Copy, ExternalLink, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCw, RotateCcw, FlipHorizontal, FlipVertical, Grid, List, Columns, Rows, AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline, Strikethrough, Code, Quote, ListOrdered, ListUnordered, Indent, Outdent, AlignStartVertical, AlignEndVertical, AlignCenterVertical, AlignStartHorizontal, AlignEndHorizontal, AlignCenterHorizontal, AlignJustifyHorizontal, AlignJustifyVertical, AlignStartHorizontalIcon, AlignEndHorizontalIcon, AlignCenterHorizontalIcon, AlignJustifyHorizontalIcon, AlignStartVerticalIcon, AlignEndVerticalIcon, AlignCenterVerticalIcon, AlignJustifyVerticalIcon } from "lucide-react"

export default function ThemeSettingsPage() {
  const [activeTab, setActiveTab] = useState("colors")
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center gap-2 px-4 py-2 border-b">
          <Palette className="h-5 w-5" />
          <h1 className="text-xl font-semibold">Tema Ayarları</h1>
        </div>
        <ScrollArea className="h-full">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Tema Özelleştirme</h2>
                <p className="text-muted-foreground">
                  Web sitenizin görünümünü buradan özelleştirebilirsiniz.
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

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tema Seçimi</CardTitle>
                  <CardDescription>
                    Web siteniz için bir tema seçin veya özel bir tema oluşturun.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-md mb-2"></div>
                      <p className="text-xs text-center">Mavi Tema</p>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-md mb-2"></div>
                      <p className="text-xs text-center">Yeşil Tema</p>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-md mb-2"></div>
                      <p className="text-xs text-center">Mor Tema</p>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-md mb-2"></div>
                      <p className="text-xs text-center">Kırmızı Tema</p>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="h-20 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-md mb-2"></div>
                      <p className="text-xs text-center">Sarı Tema</p>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="h-20 bg-gradient-to-br from-gray-500 to-gray-700 rounded-md mb-2"></div>
                      <p className="text-xs text-center">Gri Tema</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="customTheme">Özel Tema</Label>
                    <div className="flex items-center gap-2">
                      <Input id="customTheme" placeholder="Özel tema adı" />
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Renk Şeması</CardTitle>
                  <CardDescription>
                    Web sitenizin renk şemasını özelleştirin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Ana Renk</Label>
                    <div className="flex">
                      <Input id="primaryColor" type="color" className="h-10 w-20 p-1" defaultValue="#3b82f6" />
                      <Input id="primaryColorHex" className="ml-2" defaultValue="#3b82f6" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">İkincil Renk</Label>
                    <div className="flex">
                      <Input id="secondaryColor" type="color" className="h-10 w-20 p-1" defaultValue="#10b981" />
                      <Input id="secondaryColorHex" className="ml-2" defaultValue="#10b981" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Vurgu Rengi</Label>
                    <div className="flex">
                      <Input id="accentColor" type="color" className="h-10 w-20 p-1" defaultValue="#f59e0b" />
                      <Input id="accentColorHex" className="ml-2" defaultValue="#f59e0b" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor">Arka Plan Rengi</Label>
                    <div className="flex">
                      <Input id="backgroundColor" type="color" className="h-10 w-20 p-1" defaultValue="#ffffff" />
                      <Input id="backgroundColorHex" className="ml-2" defaultValue="#ffffff" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="textColor">Metin Rengi</Label>
                    <div className="flex">
                      <Input id="textColor" type="color" className="h-10 w-20 p-1" defaultValue="#1f2937" />
                      <Input id="textColorHex" className="ml-2" defaultValue="#1f2937" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="colors" className="space-y-4">
              <TabsList>
                <TabsTrigger value="colors">Renkler</TabsTrigger>
                <TabsTrigger value="typography">Tipografi</TabsTrigger>
                <TabsTrigger value="layout">Düzen</TabsTrigger>
                <TabsTrigger value="components">Bileşenler</TabsTrigger>
                <TabsTrigger value="animations">Animasyonlar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="colors" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Renk Ayarları</CardTitle>
                    <CardDescription>
                      Web sitenizin renk paletini buradan özelleştirebilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="headerBgColor">Başlık Arka Plan Rengi</Label>
                        <div className="flex">
                          <Input id="headerBgColor" type="color" className="h-10 w-20 p-1" defaultValue="#ffffff" />
                          <Input id="headerBgColorHex" className="ml-2" defaultValue="#ffffff" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="footerBgColor">Alt Bilgi Arka Plan Rengi</Label>
                        <div className="flex">
                          <Input id="footerBgColor" type="color" className="h-10 w-20 p-1" defaultValue="#f3f4f6" />
                          <Input id="footerBgColorHex" className="ml-2" defaultValue="#f3f4f6" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkColor">Bağlantı Rengi</Label>
                        <div className="flex">
                          <Input id="linkColor" type="color" className="h-10 w-20 p-1" defaultValue="#3b82f6" />
                          <Input id="linkColorHex" className="ml-2" defaultValue="#3b82f6" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkHoverColor">Bağlantı Hover Rengi</Label>
                        <div className="flex">
                          <Input id="linkHoverColor" type="color" className="h-10 w-20 p-1" defaultValue="#2563eb" />
                          <Input id="linkHoverColorHex" className="ml-2" defaultValue="#2563eb" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Renk Paleti</Label>
                      <div className="grid grid-cols-5 gap-2">
                        <div className="h-10 rounded-md bg-red-500"></div>
                        <div className="h-10 rounded-md bg-orange-500"></div>
                        <div className="h-10 rounded-md bg-yellow-500"></div>
                        <div className="h-10 rounded-md bg-green-500"></div>
                        <div className="h-10 rounded-md bg-blue-500"></div>
                        <div className="h-10 rounded-md bg-indigo-500"></div>
                        <div className="h-10 rounded-md bg-purple-500"></div>
                        <div className="h-10 rounded-md bg-pink-500"></div>
                        <div className="h-10 rounded-md bg-gray-500"></div>
                        <div className="h-10 rounded-md bg-slate-500"></div>
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
              
              <TabsContent value="typography" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tipografi Ayarları</CardTitle>
                    <CardDescription>
                      Web sitenizin yazı tiplerini ve metin stillerini buradan özelleştirebilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="headingFont">Başlık Yazı Tipi</Label>
                        <select id="headingFont" className="w-full rounded-md border border-input bg-background px-3 py-2">
                          <option value="inter">Inter</option>
                          <option value="roboto">Roboto</option>
                          <option value="open-sans">Open Sans</option>
                          <option value="montserrat">Montserrat</option>
                          <option value="poppins">Poppins</option>
                          <option value="raleway">Raleway</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bodyFont">Gövde Yazı Tipi</Label>
                        <select id="bodyFont" className="w-full rounded-md border border-input bg-background px-3 py-2">
                          <option value="inter">Inter</option>
                          <option value="roboto">Roboto</option>
                          <option value="open-sans">Open Sans</option>
                          <option value="montserrat">Montserrat</option>
                          <option value="poppins">Poppins</option>
                          <option value="raleway">Raleway</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="baseFontSize">Temel Yazı Boyutu</Label>
                        <select id="baseFontSize" className="w-full rounded-md border border-input bg-background px-3 py-2">
                          <option value="14px">14px</option>
                          <option value="16px" selected>16px</option>
                          <option value="18px">18px</option>
                          <option value="20px">20px</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lineHeight">Satır Yüksekliği</Label>
                        <select id="lineHeight" className="w-full rounded-md border border-input bg-background px-3 py-2">
                          <option value="1.2">1.2</option>
                          <option value="1.5" selected>1.5</option>
                          <option value="1.8">1.8</option>
                          <option value="2">2</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Başlık Boyutları</Label>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="h1Size" className="text-sm">H1 Boyutu</Label>
                          <div className="flex items-center gap-2">
                            <Input id="h1Size" type="number" className="w-20" defaultValue="32" />
                            <span className="text-sm text-muted-foreground">px</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="h2Size" className="text-sm">H2 Boyutu</Label>
                          <div className="flex items-center gap-2">
                            <Input id="h2Size" type="number" className="w-20" defaultValue="24" />
                            <span className="text-sm text-muted-foreground">px</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="h3Size" className="text-sm">H3 Boyutu</Label>
                          <div className="flex items-center gap-2">
                            <Input id="h3Size" type="number" className="w-20" defaultValue="20" />
                            <span className="text-sm text-muted-foreground">px</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="h4Size" className="text-sm">H4 Boyutu</Label>
                          <div className="flex items-center gap-2">
                            <Input id="h4Size" type="number" className="w-20" defaultValue="18" />
                            <span className="text-sm text-muted-foreground">px</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="h5Size" className="text-sm">H5 Boyutu</Label>
                          <div className="flex items-center gap-2">
                            <Input id="h5Size" type="number" className="w-20" defaultValue="16" />
                            <span className="text-sm text-muted-foreground">px</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="h6Size" className="text-sm">H6 Boyutu</Label>
                          <div className="flex items-center gap-2">
                            <Input id="h6Size" type="number" className="w-20" defaultValue="14" />
                            <span className="text-sm text-muted-foreground">px</span>
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
              
              <TabsContent value="layout" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Düzen Ayarları</CardTitle>
                    <CardDescription>
                      Web sitenizin düzenini ve yapısını buradan özelleştirebilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="containerWidth">Konteyner Genişliği</Label>
                        <select id="containerWidth" className="w-full rounded-md border border-input bg-background px-3 py-2">
                          <option value="full">Tam Genişlik</option>
                          <option value="wide">Geniş</option>
                          <option value="default" selected>Varsayılan</option>
                          <option value="narrow">Dar</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sidebarPosition">Kenar Çubuğu Konumu</Label>
                        <select id="sidebarPosition" className="w-full rounded-md border border-input bg-background px-3 py-2">
                          <option value="left">Sol</option>
                          <option value="right">Sağ</option>
                          <option value="none">Yok</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="headerStyle">Başlık Stili</Label>
                        <select id="headerStyle" className="w-full rounded-md border border-input bg-background px-3 py-2">
                          <option value="standard">Standart</option>
                          <option value="centered">Ortalanmış</option>
                          <option value="minimal">Minimal</option>
                          <option value="transparent">Şeffaf</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="footerStyle">Alt Bilgi Stili</Label>
                        <select id="footerStyle" className="w-full rounded-md border border-input bg-background px-3 py-2">
                          <option value="standard">Standart</option>
                          <option value="centered">Ortalanmış</option>
                          <option value="minimal">Minimal</option>
                          <option value="dark">Koyu</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Kenar Boşlukları</Label>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="marginTop" className="text-sm">Üst Kenar Boşluğu</Label>
                          <div className="flex items-center gap-2">
                            <Input id="marginTop" type="number" className="w-20" defaultValue="0" />
                            <span className="text-sm text-muted-foreground">px</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="marginRight" className="text-sm">Sağ Kenar Boşluğu</Label>
                          <div className="flex items-center gap-2">
                            <Input id="marginRight" type="number" className="w-20" defaultValue="0" />
                            <span className="text-sm text-muted-foreground">px</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="marginBottom" className="text-sm">Alt Kenar Boşluğu</Label>
                          <div className="flex items-center gap-2">
                            <Input id="marginBottom" type="number" className="w-20" defaultValue="0" />
                            <span className="text-sm text-muted-foreground">px</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="marginLeft" className="text-sm">Sol Kenar Boşluğu</Label>
                          <div className="flex items-center gap-2">
                            <Input id="marginLeft" type="number" className="w-20" defaultValue="0" />
                            <span className="text-sm text-muted-foreground">px</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>İç Boşluklar</Label>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="paddingTop" className="text-sm">Üst İç Boşluk</Label>
                          <div className="flex items-center gap-2">
                            <Input id="paddingTop" type="number" className="w-20" defaultValue="0" />
                            <span className="text-sm text-muted-foreground">px</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="paddingRight" className="text-sm">Sağ İç Boşluk</Label>
                          <div className="flex items-center gap-2">
                            <Input id="paddingRight" type="number" className="w-20" defaultValue="0" />
                            <span className="text-sm text-muted-foreground">px</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="paddingBottom" className="text-sm">Alt İç Boşluk</Label>
                          <div className="flex items-center gap-2">
                            <Input id="paddingBottom" type="number" className="w-20" defaultValue="0" />
                            <span className="text-sm text-muted-foreground">px</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="paddingLeft" className="text-sm">Sol İç Boşluk</Label>
                          <div className="flex items-center gap-2">
                            <Input id="paddingLeft" type="number" className="w-20" defaultValue="0" />
                            <span className="text-sm text-muted-foreground">px</span>
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
              
              <TabsContent value="components" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Bileşen Ayarları</CardTitle>
                    <CardDescription>
                      Web sitenizin bileşenlerinin görünümünü buradan özelleştirebilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="buttonStyle">Buton Stili</Label>
                      <select id="buttonStyle" className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option value="filled">Dolu</option>
                        <option value="outlined">Çerçeveli</option>
                        <option value="text">Metin</option>
                        <option value="rounded">Yuvarlak</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="buttonRadius">Buton Köşe Yuvarlaklığı</Label>
                      <select id="buttonRadius" className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option value="none">Yok</option>
                        <option value="small">Küçük</option>
                        <option value="medium" selected>Orta</option>
                        <option value="large">Büyük</option>
                        <option value="full">Tam</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="inputStyle">Form Alanı Stili</Label>
                      <select id="inputStyle" className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option value="standard">Standart</option>
                        <option value="outlined">Çerçeveli</option>
                        <option value="filled">Dolu</option>
                        <option value="minimal">Minimal</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardStyle">Kart Stili</Label>
                      <select id="cardStyle" className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option value="standard">Standart</option>
                        <option value="elevated">Yükseltilmiş</option>
                        <option value="outlined">Çerçeveli</option>
                        <option value="flat">Düz</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tableStyle">Tablo Stili</Label>
                      <select id="tableStyle" className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option value="standard">Standart</option>
                        <option value="bordered">Çerçeveli</option>
                        <option value="striped">Çizgili</option>
                        <option value="minimal">Minimal</option>
                      </select>
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
              
              <TabsContent value="animations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Animasyon Ayarları</CardTitle>
                    <CardDescription>
                      Web sitenizin animasyonlarını buradan özelleştirebilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="enableAnimations">Animasyonları Etkinleştir</Label>
                        <Switch id="enableAnimations" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Web sitenizde animasyonları etkinleştirin veya devre dışı bırakın.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="animationSpeed">Animasyon Hızı</Label>
                      <select id="animationSpeed" className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option value="slow">Yavaş</option>
                        <option value="normal" selected>Normal</option>
                        <option value="fast">Hızlı</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pageTransition">Sayfa Geçiş Efekti</Label>
                      <select id="pageTransition" className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option value="fade">Solma</option>
                        <option value="slide">Kayma</option>
                        <option value="zoom">Yakınlaşma</option>
                        <option value="none">Yok</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="scrollBehavior">Kaydırma Davranışı</Label>
                      <select id="scrollBehavior" className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option value="smooth">Yumuşak</option>
                        <option value="auto">Otomatik</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="enableHoverEffects">Hover Efektleri</Label>
                        <Switch id="enableHoverEffects" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Öğelerin üzerine gelindiğinde görsel efektleri etkinleştirin.
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