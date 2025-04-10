"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { SidebarProvider, SidebarInset } from "@/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Globe, Plus, Search, Settings2, ExternalLink, Loader2, Circle } from "lucide-react"

// Sample website data
const websites = [
    {
        id: 1,
        name: "Padpal App",
        domain: "padpal.app",
        status: "active",
        lastUpdated: "2024-04-09T10:30:00Z",
        monthlyVisits: 12500,
        plan: "Premium"
    },
    {
        id: 2,
        name: "Quickesta Accounts",
        domain: "accounts.quickesta.com",
        status: "active",
        lastUpdated: "2024-04-08T15:45:00Z",
        monthlyVisits: 45000,
        plan: "Enterprise"
    }
]

function WebsitePreview({ domain }: { domain: string }) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    return (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-lg bg-zinc-900 p-3">
            {/* Browser Chrome */}
            <div className="absolute inset-x-0 top-0 z-10 h-8 bg-zinc-800 flex items-center px-3 rounded-t-lg">
                <div className="flex items-center gap-1.5">
                    <Circle className="w-2.5 h-2.5 text-red-500 fill-current" />
                    <Circle className="w-2.5 h-2.5 text-yellow-500 fill-current" />
                    <Circle className="w-2.5 h-2.5 text-green-500 fill-current" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center bg-zinc-700/50 px-3 py-1 rounded-full">
                    <Globe className="w-3 h-3 mr-1.5 text-zinc-400" />
                    <span className="text-xs text-zinc-300">{domain}</span>
                </div>
            </div>

            {/* Website Preview */}
            <div className="relative h-full w-full pt-8">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                        <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
                    </div>
                )}
                {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-800 gap-2">
                        <p className="text-sm text-zinc-400">Önizleme yüklenemedi</p>
                    </div>
                )}
                <iframe
                    src={`https://${domain}`}
                    className="h-full w-full rounded-b-lg"
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false)
                        setError(true)
                    }}
                    sandbox="allow-same-origin allow-scripts"
                    loading="lazy"
                />
            </div>
        </div>
    )
}

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
                                <Card key={website.id} className="overflow-hidden group">
                                    <CardHeader className="relative p-0">
                                        <WebsitePreview domain={website.domain} />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button size="sm" variant="secondary" asChild>
                                                <a href={`https://${website.domain}`} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    Ziyaret Et
                                                </a>
                                            </Button>
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
                                            <div className={`px-2 py-1 rounded-full text-xs ${website.status === "active"
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