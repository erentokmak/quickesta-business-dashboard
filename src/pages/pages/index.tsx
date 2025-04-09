"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { SidebarProvider, SidebarInset } from "@/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table"
import { 
  Plus, 
  Search, 
  FileText, 
  MoreVertical,
  Eye,
  Edit,
  Trash,
  Globe
} from "lucide-react"

// Sample page data
const pages = [
  {
    id: 1,
    title: "Ana Sayfa",
    slug: "/",
    status: "published",
    lastModified: "2024-04-09T10:30:00Z",
    author: "Admin",
    template: "Home"
  },
  {
    id: 2,
    title: "Hakkımızda",
    slug: "/about",
    status: "draft",
    lastModified: "2024-04-08T15:45:00Z",
    author: "Admin",
    template: "About"
  },
  {
    id: 3,
    title: "İletişim",
    slug: "/contact",
    status: "published",
    lastModified: "2024-04-07T09:15:00Z",
    author: "Admin",
    template: "Contact"
  },
  {
    id: 4,
    title: "Blog",
    slug: "/blog",
    status: "published",
    lastModified: "2024-04-06T14:20:00Z",
    author: "Admin",
    template: "Blog"
  },
  {
    id: 5,
    title: "Ürünler",
    slug: "/products",
    status: "draft",
    lastModified: "2024-04-05T11:30:00Z",
    author: "Admin",
    template: "Products"
  }
]

export default function PagesManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || 
                      (activeTab === "published" && page.status === "published") ||
                      (activeTab === "drafts" && page.status === "draft")
    return matchesSearch && matchesTab
  })

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full">
        <div className="flex flex-col h-full">
          <div className="border-b">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Sayfa Yönetimi</h2>
                <p className="text-sm text-muted-foreground">
                  Web sitenizin sayfalarını buradan yönetebilirsiniz
                </p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Sayfa
              </Button>
            </div>
            <div className="p-4 border-t">
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
                <div className="flex items-center gap-2">
                  <Button
                    variant={activeTab === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("all")}
                  >
                    Tümü
                  </Button>
                  <Button
                    variant={activeTab === "published" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("published")}
                  >
                    Yayında
                  </Button>
                  <Button
                    variant={activeTab === "drafts" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("drafts")}
                  >
                    Taslaklar
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Başlık</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead>Son Düzenleme</TableHead>
                        <TableHead>Yazar</TableHead>
                        <TableHead>Şablon</TableHead>
                        <TableHead className="w-[100px]">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPages.map((page) => (
                        <TableRow key={page.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              {page.title}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Globe className="w-3 h-3" />
                              {page.slug}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                              page.status === "published"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {page.status === "published" ? "Yayında" : "Taslak"}
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(page.lastModified).toLocaleDateString("tr-TR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </TableCell>
                          <TableCell>{page.author}</TableCell>
                          <TableCell>{page.template}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="w-4 h-4" />
                              </Button>
                            </div>
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