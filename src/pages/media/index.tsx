"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { SidebarProvider, SidebarInset } from "@/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { 
  Upload, 
  Search, 
  Image as ImageIcon,
  Folder,
  MoreVertical,
  Grid,
  List,
  Trash,
  Download,
  Share
} from "lucide-react"

// Sample media data
const mediaItems = [
  {
    id: 1,
    name: "logo.png",
    type: "image",
    size: "2.4 MB",
    url: "https://example.com/logo.png",
    uploadedAt: "2024-04-09T10:30:00Z"
  },
  {
    id: 2,
    name: "hero-banner.jpg",
    type: "image",
    size: "1.8 MB",
    url: "https://example.com/hero-banner.jpg",
    uploadedAt: "2024-04-08T15:45:00Z"
  },
  {
    id: 3,
    name: "product-1.jpg",
    type: "image",
    size: "3.2 MB",
    url: "https://example.com/product-1.jpg",
    uploadedAt: "2024-04-07T09:15:00Z"
  },
  {
    id: 4,
    name: "product-2.jpg",
    type: "image",
    size: "2.9 MB",
    url: "https://example.com/product-2.jpg",
    uploadedAt: "2024-04-06T14:20:00Z"
  },
  {
    id: 5,
    name: "brochure.pdf",
    type: "document",
    size: "4.5 MB",
    url: "https://example.com/brochure.pdf",
    uploadedAt: "2024-04-05T11:30:00Z"
  }
]

export default function MediaLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredMedia = mediaItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full">
        <div className="flex flex-col h-full">
          <div className="border-b">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Medya Kütüphanesi</h2>
                <p className="text-sm text-muted-foreground">
                  Tüm medya dosyalarınızı buradan yönetebilirsiniz
                </p>
              </div>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Dosya Yükle
              </Button>
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Dosya ara..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredMedia.map((item) => (
                    <Card key={item.id} className="group">
                      <CardContent className="p-4">
                        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                          {item.type === "image" ? (
                            <img
                              src={item.url}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Folder className="w-12 h-12 text-muted-foreground" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button variant="secondary" size="icon">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="secondary" size="icon">
                              <Share className="w-4 h-4" />
                            </Button>
                            <Button variant="secondary" size="icon">
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.size}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-[1fr,100px,100px,100px] gap-4 p-4 border-b">
                      <div className="font-medium">Dosya Adı</div>
                      <div className="font-medium">Boyut</div>
                      <div className="font-medium">Yüklenme Tarihi</div>
                      <div className="font-medium">İşlemler</div>
                    </div>
                    {filteredMedia.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-[1fr,100px,100px,100px] gap-4 p-4 border-b last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          {item.type === "image" ? (
                            <ImageIcon className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Folder className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="truncate">{item.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{item.size}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(item.uploadedAt).toLocaleDateString("tr-TR")}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Share className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 