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
  Palette, 
  Type, 
  Layout, 
  Image as ImageIcon, 
  Save,
  Eye,
  Undo,
  Redo
} from "lucide-react"

export default function ThemeEditorPage() {
  const [activeTab, setActiveTab] = useState("colors")

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full">
        <div className="flex flex-col h-full">
          <div className="border-b">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Tema Düzenleyici</h2>
                <p className="text-sm text-muted-foreground">
                  Web sitenizin görünümünü özelleştirin
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Undo className="w-4 h-4 mr-2" />
                  Geri Al
                </Button>
                <Button variant="outline" size="sm">
                  <Redo className="w-4 h-4 mr-2" />
                  İleri Al
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Önizle
                </Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Kaydet
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4">
            <div className="grid grid-cols-12 gap-4 h-full">
              {/* Sol Panel - Düzenleme Araçları */}
              <div className="col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Tema Ayarları</CardTitle>
                    <CardDescription>
                      Temanızı özelleştirmek için aşağıdaki seçenekleri kullanın
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="colors">
                          <Palette className="w-4 h-4" />
                        </TabsTrigger>
                        <TabsTrigger value="typography">
                          <Type className="w-4 h-4" />
                        </TabsTrigger>
                        <TabsTrigger value="layout">
                          <Layout className="w-4 h-4" />
                        </TabsTrigger>
                        <TabsTrigger value="images">
                          <ImageIcon className="w-4 h-4" />
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="colors" className="space-y-4">
                        <div className="space-y-2">
                          <Label>Ana Renk</Label>
                          <div className="flex gap-2">
                            <Input type="color" className="w-12 h-12 p-1" />
                            <Input placeholder="#000000" className="flex-1" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>İkincil Renk</Label>
                          <div className="flex gap-2">
                            <Input type="color" className="w-12 h-12 p-1" />
                            <Input placeholder="#000000" className="flex-1" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Arka Plan Rengi</Label>
                          <div className="flex gap-2">
                            <Input type="color" className="w-12 h-12 p-1" />
                            <Input placeholder="#000000" className="flex-1" />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="typography" className="space-y-4">
                        <div className="space-y-2">
                          <Label>Başlık Fontu</Label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Inter</option>
                            <option>Roboto</option>
                            <option>Open Sans</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Metin Fontu</Label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Inter</option>
                            <option>Roboto</option>
                            <option>Open Sans</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Font Boyutu</Label>
                          <Input type="range" min="12" max="24" step="1" />
                        </div>
                      </TabsContent>
                      <TabsContent value="layout" className="space-y-4">
                        <div className="space-y-2">
                          <Label>Sayfa Genişliği</Label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Tam Genişlik</option>
                            <option>1200px</option>
                            <option>1000px</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Kenar Boşlukları</Label>
                          <Input type="range" min="0" max="100" step="4" />
                        </div>
                        <div className="space-y-2">
                          <Label>Köşe Yuvarlaklığı</Label>
                          <Input type="range" min="0" max="50" step="2" />
                        </div>
                      </TabsContent>
                      <TabsContent value="images" className="space-y-4">
                        <div className="space-y-2">
                          <Label>Logo</Label>
                          <div className="border-2 border-dashed rounded-lg p-4 text-center">
                            <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Logo yüklemek için tıklayın veya sürükleyin
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Favicon</Label>
                          <div className="border-2 border-dashed rounded-lg p-4 text-center">
                            <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Favicon yüklemek için tıklayın veya sürükleyin
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Sağ Panel - Önizleme */}
              <div className="col-span-9">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Canlı Önizleme</CardTitle>
                    <CardDescription>
                      Yaptığınız değişiklikleri anında görüntüleyin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-zinc-900">
                      <iframe
                        src="https://example.com"
                        className="w-full h-full"
                        sandbox="allow-same-origin allow-scripts"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 