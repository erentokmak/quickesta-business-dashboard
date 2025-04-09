"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import { Switch } from "@/ui/switch"
import { Textarea } from "@/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select"
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'
import { FileText, Save, Eye, ArrowLeft, Settings, Layout, Image, Code, Globe, Lock, Unlock, Calendar, User, Tag, Link, EyeOff, Trash2, Copy, ExternalLink, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCw, RotateCcw, FlipHorizontal, FlipVertical, Grid, List, Columns, Rows, AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline, Strikethrough, Code as CodeIcon, Quote, ListOrdered, Indent, Outdent, AlignStartVertical, AlignEndVertical, AlignCenterVertical, AlignStartHorizontal, AlignEndHorizontal, AlignCenterHorizontal, AlignJustifyIcon, AlignStartHorizontalIcon, AlignEndHorizontalIcon, AlignCenterHorizontalIcon, AlignStartVerticalIcon, AlignEndVerticalIcon, AlignCenterVerticalIcon } from "lucide-react"

// Örnek sayfa verisi
const pageData = {
  id: 1,
  title: "Ana Sayfa",
  slug: "/",
  content: "<h1>Hoş Geldiniz</h1><p>Bu bir örnek içeriktir.</p>",
  status: "published",
  lastModified: "2024-02-20",
  author: "Admin",
  template: "Home",
  meta: {
    title: "Ana Sayfa | Şirket Adı",
    description: "Şirketimizin ana sayfasına hoş geldiniz.",
    keywords: "ana sayfa, şirket, hizmetler",
  },
  settings: {
    showHeader: true,
    showFooter: true,
    showSidebar: false,
    isHomepage: true,
    allowComments: false,
  },
}

export default function PageEditorPage() {
  const [activeTab, setActiveTab] = useState("content")
  const [page, setPage] = useState(pageData)
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center gap-2 px-4 py-2 border-b">
          <FileText className="h-5 w-5" />
          <h1 className="text-xl font-semibold">Sayfa Düzenle</h1>
        </div>
        <ScrollArea className="h-full">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{page.title}</h2>
                  <p className="text-muted-foreground">
                    Sayfa içeriğini ve ayarlarını buradan düzenleyebilirsiniz.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Önizle
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Kaydet
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="content">
                  <Layout className="mr-2 h-4 w-4" />
                  İçerik
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Ayarlar
                </TabsTrigger>
                <TabsTrigger value="meta">
                  <Code className="mr-2 h-4 w-4" />
                  Meta
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sayfa İçeriği</CardTitle>
                    <CardDescription>
                      Sayfanızın ana içeriğini buradan düzenleyebilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Başlık</Label>
                        <Input
                          id="title"
                          value={page.title}
                          onChange={(e) => setPage({ ...page, title: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="slug">URL</Label>
                        <Input
                          id="slug"
                          value={page.slug}
                          onChange={(e) => setPage({ ...page, slug: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="content">İçerik</Label>
                        <Textarea
                          id="content"
                          value={page.content}
                          onChange={(e) => setPage({ ...page, content: e.target.value })}
                          className="min-h-[400px] font-mono"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sayfa Ayarları</CardTitle>
                    <CardDescription>
                      Sayfanızın görünüm ve davranış ayarlarını buradan yapılandırabilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="template">Şablon</Label>
                        <Select
                          value={page.template}
                          onValueChange={(value) => setPage({ ...page, template: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Şablon seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Home">Ana Sayfa</SelectItem>
                            <SelectItem value="About">Hakkımızda</SelectItem>
                            <SelectItem value="Services">Hizmetler</SelectItem>
                            <SelectItem value="Contact">İletişim</SelectItem>
                            <SelectItem value="Blog">Blog</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Durum</Label>
                        <Select
                          value={page.status}
                          onValueChange={(value) => setPage({ ...page, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Durum seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="published">Yayında</SelectItem>
                            <SelectItem value="draft">Taslak</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Header Göster</Label>
                            <p className="text-sm text-muted-foreground">
                              Sayfanın üst kısmında header'ı göster
                            </p>
                          </div>
                          <Switch
                            checked={page.settings.showHeader}
                            onCheckedChange={(checked) =>
                              setPage({
                                ...page,
                                settings: { ...page.settings, showHeader: checked },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Footer Göster</Label>
                            <p className="text-sm text-muted-foreground">
                              Sayfanın alt kısmında footer'ı göster
                            </p>
                          </div>
                          <Switch
                            checked={page.settings.showFooter}
                            onCheckedChange={(checked) =>
                              setPage({
                                ...page,
                                settings: { ...page.settings, showFooter: checked },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Sidebar Göster</Label>
                            <p className="text-sm text-muted-foreground">
                              Sayfanın yan kısmında sidebar'ı göster
                            </p>
                          </div>
                          <Switch
                            checked={page.settings.showSidebar}
                            onCheckedChange={(checked) =>
                              setPage({
                                ...page,
                                settings: { ...page.settings, showSidebar: checked },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Ana Sayfa</Label>
                            <p className="text-sm text-muted-foreground">
                              Bu sayfayı ana sayfa olarak ayarla
                            </p>
                          </div>
                          <Switch
                            checked={page.settings.isHomepage}
                            onCheckedChange={(checked) =>
                              setPage({
                                ...page,
                                settings: { ...page.settings, isHomepage: checked },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Yorumlar</Label>
                            <p className="text-sm text-muted-foreground">
                              Sayfada yorumlara izin ver
                            </p>
                          </div>
                          <Switch
                            checked={page.settings.allowComments}
                            onCheckedChange={(checked) =>
                              setPage({
                                ...page,
                                settings: { ...page.settings, allowComments: checked },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="meta" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Meta Bilgileri</CardTitle>
                    <CardDescription>
                      Sayfanızın SEO ve meta bilgilerini buradan düzenleyebilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="meta-title">Meta Başlık</Label>
                        <Input
                          id="meta-title"
                          value={page.meta.title}
                          onChange={(e) =>
                            setPage({
                              ...page,
                              meta: { ...page.meta, title: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="meta-description">Meta Açıklama</Label>
                        <Textarea
                          id="meta-description"
                          value={page.meta.description}
                          onChange={(e) =>
                            setPage({
                              ...page,
                              meta: { ...page.meta, description: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="meta-keywords">Meta Anahtar Kelimeler</Label>
                        <Input
                          id="meta-keywords"
                          value={page.meta.keywords}
                          onChange={(e) =>
                            setPage({
                              ...page,
                              meta: { ...page.meta, keywords: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  )
} 