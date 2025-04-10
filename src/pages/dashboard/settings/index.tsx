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
  Settings,
  User,
  Lock,
  Bell,
  Globe,
  CreditCard,
  Save
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full">
        <div className="flex flex-col h-full">
          <div className="border-b">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Ayarlar</h2>
                <p className="text-sm text-muted-foreground">
                  Hesap ve uygulama ayarlarınızı buradan yönetebilirsiniz
                </p>
              </div>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Değişiklikleri Kaydet
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Profil
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Güvenlik
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Bildirimler
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Faturalandırma
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Tercihler
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profil Bilgileri</CardTitle>
                      <CardDescription>
                        Kişisel bilgilerinizi güncelleyin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Ad</Label>
                          <Input placeholder="Adınız" />
                        </div>
                        <div className="space-y-2">
                          <Label>Soyad</Label>
                          <Input placeholder="Soyadınız" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>E-posta</Label>
                        <Input type="email" placeholder="ornek@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label>Telefon</Label>
                        <Input type="tel" placeholder="+90 555 555 55 55" />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Güvenlik Ayarları</CardTitle>
                      <CardDescription>
                        Hesap güvenliğinizi yönetin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Mevcut Şifre</Label>
                        <Input type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label>Yeni Şifre</Label>
                        <Input type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label>Yeni Şifre (Tekrar)</Label>
                        <Input type="password" />
                      </div>
                      <Button>Şifreyi Güncelle</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Bildirim Ayarları</CardTitle>
                      <CardDescription>
                        Bildirim tercihlerinizi yönetin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>E-posta Bildirimleri</Label>
                          <p className="text-sm text-muted-foreground">
                            Önemli güncellemeler için e-posta alın
                          </p>
                        </div>
                        <Button variant="outline">Açık</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>SMS Bildirimleri</Label>
                          <p className="text-sm text-muted-foreground">
                            Acil durumlar için SMS alın
                          </p>
                        </div>
                        <Button variant="outline">Kapalı</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="billing" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Faturalandırma</CardTitle>
                      <CardDescription>
                        Ödeme yöntemlerinizi ve faturalarınızı yönetin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Kart Numarası</Label>
                        <Input placeholder="**** **** **** ****" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Son Kullanma Tarihi</Label>
                          <Input placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label>CVV</Label>
                          <Input placeholder="***" />
                        </div>
                      </div>
                      <Button>Ödeme Yöntemini Güncelle</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tercihler</CardTitle>
                      <CardDescription>
                        Uygulama tercihlerinizi özelleştirin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Dil</Label>
                          <p className="text-sm text-muted-foreground">
                            Uygulama dilini seçin
                          </p>
                        </div>
                        <select className="p-2 border rounded-md">
                          <option>Türkçe</option>
                          <option>English</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Saat Dilimi</Label>
                          <p className="text-sm text-muted-foreground">
                            Yerel saat diliminizi seçin
                          </p>
                        </div>
                        <select className="p-2 border rounded-md">
                          <option>İstanbul (UTC+3)</option>
                          <option>London (UTC+0)</option>
                          <option>New York (UTC-5)</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 