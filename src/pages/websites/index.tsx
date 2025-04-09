"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { SidebarProvider, SidebarInset } from "@/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Globe, Plus, Search, Settings2, ExternalLink } from "lucide-react"

// Sample website data
const websites = [
  {
    id: 1,
    name: "Padpal App",
    domain: "padpal.app",
    preview: "/previews/padpal.png",
    status: "active",
    lastUpdated: "2024-04-09T10:30:00Z",
    monthlyVisits: 12500,
    plan: "Premium"
  },
  {
    id: 2,
    name: "Quickesta Accounts",
    domain: "accounts.quickesta.com",
    preview: "/previews/quickesta.png",
    status: "active",
    lastUpdated: "2024-04-08T15:45:00Z",
    monthlyVisits: 45000,
    plan: "Enterprise"
  },
  // Add more sample websites here
]

export default function WebsitesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredWebsites = websites.filter(website =>
    website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    website.domain.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full">
        <div className="flex flex-col h-full">
          <div className="border-b">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Web Sitelerim</h2>
                <p className="text-sm text-muted-foreground">
                  Tüm web sitelerinizi buradan yönetebilirsiniz
                </p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Web Sitesi
              </Button>
            </div>
            <div className="p-4 border-t">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Web sitesi ara..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWebsites.map((website) => (
                <Card key={website.id} className="overflow-hidden">
                  <CardHeader className="relative p-0">
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img
                        src={website.preview}
                        alt={website.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{website.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Globe className="w-3 h-3 mr-1" />
                          {website.domain}
                        </CardDescription>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        website.status === "active" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {website.status === "active" ? "Aktif" : "Pasif"}
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Aylık Ziyaret</p>
                        <p className="font-medium">{website.monthlyVisits.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Plan</p>
                        <p className="font-medium">{website.plan}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" size="sm">
                      <Settings2 className="w-4 h-4 mr-2" />
                      Yönet
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ziyaret Et
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 