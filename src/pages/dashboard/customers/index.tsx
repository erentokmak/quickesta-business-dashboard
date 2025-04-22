"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { SidebarProvider, SidebarInset } from "@/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import {
  Search,
  MoreHorizontal,
  Plus,
  Users,
  Tag,
  Activity,
  UserPlus,
  UserCog,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ShoppingBag,
  Calendar,
  ChevronRight
} from "lucide-react"

// Örnek müşteri verileri
const customers = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    phone: "+90 555 123 4567",
    status: "active",
    totalOrders: 12,
    totalSpent: 2500,
    lastOrder: "2024-02-15",
    tags: ["VIP", "Yeni Müşteri"],
  },
  {
    id: "2",
    name: "Ayşe Demir",
    email: "ayse@example.com",
    phone: "+90 555 234 5678",
    status: "active",
    totalOrders: 8,
    totalSpent: 1800,
    lastOrder: "2024-02-10",
    tags: ["Düzenli Müşteri"],
  },
  {
    id: "3",
    name: "Mehmet Kaya",
    email: "mehmet@example.com",
    phone: "+90 555 345 6789",
    status: "inactive",
    totalOrders: 3,
    totalSpent: 450,
    lastOrder: "2024-01-20",
    tags: ["Potansiyel"],
  },
  {
    id: "4",
    name: "Zeynep Şahin",
    email: "zeynep@example.com",
    phone: "+90 555 456 7890",
    status: "active",
    totalOrders: 15,
    totalSpent: 3200,
    lastOrder: "2024-02-18",
    tags: ["VIP", "Sadık Müşteri"],
  },
  {
    id: "5",
    name: "Ali Öztürk",
    email: "ali@example.com",
    phone: "+90 555 567 8901",
    status: "active",
    totalOrders: 6,
    totalSpent: 1200,
    lastOrder: "2024-02-05",
    tags: ["Yeni Müşteri"],
  },
]

export default function CustomersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Müşterileri filtrele
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full">
        <div className="flex flex-col h-full">
          <div className="border-b">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Müşteriler</h2>
                <p className="text-sm text-muted-foreground">
                  Müşteri listesi ve yönetimi
                </p>
              </div>
              {/*
              <div className="flex items-center gap-2">
                <Button onClick={() => router.push("/customers/groups")}>
                  <Users className="h-4 w-4 mr-2" />
                  Gruplar
                </Button>
                <Button onClick={() => router.push("/customers/segments")}>
                  <Tag className="h-4 w-4 mr-2" />
                  Segmentler
                </Button>
                <Button onClick={() => router.push("/customers/behaviors")}>
                  <Activity className="h-4 w-4 mr-2" />
                  Davranışlar
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Müşteri
                </Button>
              </div>
              */}
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Müşteri ara..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Müşteri</TableHead>
                        <TableHead>İletişim</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead>Sipariş</TableHead>
                        <TableHead>Toplam Harcama</TableHead>
                        <TableHead>Son Sipariş</TableHead>
                        <TableHead>Etiketler</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="font-medium">{customer.name}</div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Mail className="h-3 w-3 mr-1" />
                                {customer.email}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Phone className="h-3 w-3 mr-1" />
                                {customer.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${customer.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                              }`}>
                              {customer.status === "active" ? "Aktif" : "Pasif"}
                            </div>
                          </TableCell>
                          <TableCell>{customer.totalOrders}</TableCell>
                          <TableCell>{customer.totalSpent.toLocaleString("tr-TR")} ₺</TableCell>
                          <TableCell>{customer.lastOrder}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {customer.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <UserCog className="h-4 w-4 mr-2" />
                                  Düzenle
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <ShoppingBag className="h-4 w-4 mr-2" />
                                  Siparişler
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <CreditCard className="h-4 w-4 mr-2" />
                                  Ödemeler
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  E-posta Gönder
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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