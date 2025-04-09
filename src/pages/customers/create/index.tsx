"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { SidebarProvider, SidebarInset } from "@/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/ui/tabs"
import { 
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Tag,
  Info
} from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Form şeması
const customerFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Ad en az 2 karakter olmalıdır.",
  }),
  lastName: z.string().min(2, {
    message: "Soyad en az 2 karakter olmalıdır.",
  }),
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz.",
  }),
  phone: z.string().min(10, {
    message: "Geçerli bir telefon numarası giriniz.",
  }),
  address: z.string().min(5, {
    message: "Adres en az 5 karakter olmalıdır.",
  }),
  city: z.string().min(2, {
    message: "Şehir en az 2 karakter olmalıdır.",
  }),
  country: z.string().min(2, {
    message: "Ülke seçiniz.",
  }),
  postalCode: z.string().min(3, {
    message: "Geçerli bir posta kodu giriniz.",
  }),
  customerGroup: z.string().optional(),
  notes: z.string().optional(),
})

export default function CreateCustomerPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")

  // Form tanımlaması
  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      customerGroup: "",
      notes: "",
    },
  })

  // Form gönderimi
  function onSubmit(values: z.infer<typeof customerFormSchema>) {
    console.log(values)
    // Burada API çağrısı yapılacak
    router.push("/customers")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full">
        <div className="flex flex-col h-full">
          <div className="border-b">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => router.back()}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-2xl font-semibold tracking-tight">Yeni Müşteri Ekle</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Yeni bir müşteri eklemek için aşağıdaki formu doldurun
                </p>
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Müşteri Bilgileri</CardTitle>
                  <CardDescription>
                    Müşteri bilgilerini girin ve kaydedin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="personal">
                            <User className="h-4 w-4 mr-2" />
                            Kişisel Bilgiler
                          </TabsTrigger>
                          <TabsTrigger value="contact">
                            <Mail className="h-4 w-4 mr-2" />
                            İletişim Bilgileri
                          </TabsTrigger>
                          <TabsTrigger value="additional">
                            <Info className="h-4 w-4 mr-2" />
                            Ek Bilgiler
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="personal" className="space-y-4 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Ad</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Müşterinin adı" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Soyad</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Müşterinin soyadı" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="contact" className="space-y-4 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>E-posta</FormLabel>
                                  <FormControl>
                                    <Input placeholder="ornek@email.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Telefon</FormLabel>
                                  <FormControl>
                                    <Input placeholder="+90 555 123 4567" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Adres</FormLabel>
                                <FormControl>
                                  <Input placeholder="Tam adres" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Şehir</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Şehir" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="country"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Ülke</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Ülke seçin" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="TR">Türkiye</SelectItem>
                                      <SelectItem value="US">Amerika Birleşik Devletleri</SelectItem>
                                      <SelectItem value="GB">Birleşik Krallık</SelectItem>
                                      <SelectItem value="DE">Almanya</SelectItem>
                                      <SelectItem value="FR">Fransa</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="postalCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Posta Kodu</FormLabel>
                                  <FormControl>
                                    <Input placeholder="34000" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="additional" className="space-y-4 pt-4">
                          <FormField
                            control={form.control}
                            name="customerGroup"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Müşteri Grubu</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Müşteri grubu seçin" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="vip">VIP Müşteriler</SelectItem>
                                    <SelectItem value="regular">Düzenli Müşteriler</SelectItem>
                                    <SelectItem value="new">Yeni Müşteriler</SelectItem>
                                    <SelectItem value="inactive">İnaktif Müşteriler</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Müşteriyi bir gruba atayın
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Notlar</FormLabel>
                                <FormControl>
                                  <Input placeholder="Müşteri hakkında notlar" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Müşteri hakkında ek bilgiler
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TabsContent>
                      </Tabs>
                      
                      <div className="flex justify-end gap-2">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => router.back()}
                        >
                          İptal
                        </Button>
                        <Button type="submit">
                          <Save className="h-4 w-4 mr-2" />
                          Kaydet
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 