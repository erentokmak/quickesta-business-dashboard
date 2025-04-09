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
import { FileText, Plus, Search, Edit, Trash2, Eye, MoreVertical, ArrowUpDown, CheckCircle, XCircle, AlertCircle, Save, RefreshCw, Copy, ExternalLink, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCw, RotateCcw, FlipHorizontal, FlipVertical, Grid, List, Columns, Rows, AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline, Strikethrough, Code, Quote, ListOrdered, Indent, Outdent, AlignStartVertical, AlignEndVertical, AlignCenterVertical, AlignStartHorizontal, AlignEndHorizontal, AlignCenterHorizontal, AlignJustifyIcon, AlignStartHorizontalIcon, AlignEndHorizontalIcon, AlignCenterHorizontalIcon, AlignStartVerticalIcon, AlignEndVerticalIcon, AlignCenterVerticalIcon } from "lucide-react"

// Örnek sayfa verileri
const pages = [
  {
    id: 1,
    title: "Ana Sayfa",
    slug: "/",
    status: "published",
    lastModified: "2024-02-20",
    author: "Admin",
    template: "Home",
  },
  {
    id: 2,
    title: "Hakkımızda",
    slug: "/hakkimizda",
    status: "published",
    lastModified: "2024-02-19",
    author: "Admin",
    template: "About",
  },
  {
    id: 3,
    title: "Hizmetler",
    slug: "/hizmetler",
    status: "draft",
    lastModified: "2024-02-18",
    author: "Admin",
    template: "Services",
  },
  {
    id: 4,
    title: "İletişim",
    slug: "/iletisim",
    status: "published",
    lastModified: "2024-02-17",
    author: "Admin",
    template: "Contact",
  },
  {
    id: 5,
    title: "Blog",
    slug: "/blog",
    status: "published",
    lastModified: "2024-02-16",
    author: "Admin",
    template: "Blog",
  },
]

export default function PagesManagementPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Sayfa durumuna göre filtreleme
  const filteredPages = pages.filter(page => {
    if (activeTab === "all") return true
    return page.status === activeTab
  })
  
  // Arama sorgusuna göre filtreleme
  const searchedPages = filteredPages.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center gap-2 px-4 py-2 border-b">
          <FileText className="h-5 w-5" />
          <h1 className="text-xl font-semibold">Sayfa Yönetimi</h1>
        </div>
        <ScrollArea className="h-full">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Sayfalar</h2>
                <p className="text-muted-foreground">
                  Web sitenizin sayfalarını buradan yönetebilirsiniz.
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Sayfa
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Sayfa ara..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">Tümü</TabsTrigger>
                  <TabsTrigger value="published">Yayında</TabsTrigger>
                  <TabsTrigger value="draft">Taslak</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          <div className="flex items-center gap-2">
                            Başlık
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          <div className="flex items-center gap-2">
                            URL
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          <div className="flex items-center gap-2">
                            Durum
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          <div className="flex items-center gap-2">
                            Son Düzenleme
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          <div className="flex items-center gap-2">
                            Yazar
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          <div className="flex items-center gap-2">
                            Şablon
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          İşlemler
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {searchedPages.map((page) => (
                        <tr
                          key={page.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              {page.title}
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                              {page.slug}
                            </code>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              {page.status === "published" ? (
                                <>
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span className="text-green-500">Yayında</span>
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                                  <span className="text-yellow-500">Taslak</span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="p-4 align-middle">{page.lastModified}</td>
                          <td className="p-4 align-middle">{page.author}</td>
                          <td className="p-4 align-middle">{page.template}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  )
} 