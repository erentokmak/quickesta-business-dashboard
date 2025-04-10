"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select"
import { Textarea } from "@/ui/textarea"
import { Building2, MapPin, Phone, Mail, Globe, FileText } from "lucide-react"
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'

export default function CreateBusinessPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center gap-2 px-4 py-2 border-b">
          <Building2 className="h-5 w-5" />
          <h1 className="text-xl font-semibold">İşletme Oluştur</h1>
        </div>
        <ScrollArea className="h-full">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>İşletme Bilgileri</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">İşletme Adı</Label>
                      <div className="relative">
                        <Building2 className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="businessName"
                          placeholder="İşletmenizin adını girin"
                          className="pl-8"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="businessType">İşletme Türü</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="İşletme türü seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restaurant">Restoran</SelectItem>
                          <SelectItem value="cafe">Kafe</SelectItem>
                          <SelectItem value="bar">Bar</SelectItem>
                          <SelectItem value="hotel">Otel</SelectItem>
                          <SelectItem value="retail">Perakende</SelectItem>
                          <SelectItem value="service">Hizmet</SelectItem>
                          <SelectItem value="other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adres</Label>
                      <div className="relative">
                        <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          placeholder="İşletmenizin adresini girin"
                          className="pl-8"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <div className="relative">
                        <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="+90 555 123 4567"
                          className="pl-8"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="isletme@example.com"
                          className="pl-8"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Web Sitesi</Label>
                      <div className="relative">
                        <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="website"
                          placeholder="www.isletmeniz.com"
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">İşletme Açıklaması</Label>
                    <div className="relative">
                      <FileText className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="description"
                        placeholder="İşletmeniz hakkında kısa bir açıklama yazın"
                        className="pl-8 min-h-[100px]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button variant="outline">İptal</Button>
                    <Button>İşletmeyi Oluştur</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  )
} 