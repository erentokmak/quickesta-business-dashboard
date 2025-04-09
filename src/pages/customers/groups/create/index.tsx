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
  Textarea
} from "@/ui/textarea"
import { 
  ArrowLeft,
  Save,
  Users,
  Tag,
  Info
} from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Form şeması
const customerGroupFormSchema = z.object({
  name: z.string().min(2, {
    message: "Grup adı en az 2 karakter olmalıdır.",
  }),
  description: z.string().min(10, {
    message: "Açıklama en az 10 karakter olmalıdır.",
  }),
  color: z.string().optional(),
  notes: z.string().optional(),
})

export default function CreateCustomerGroupPage() {
  const router = useRouter()

  // Form tanımlaması
  const form = useForm<z.infer<typeof customerGroupFormSchema>>({
    resolver: zodResolver(customerGroupFormSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#3b82f6",
      notes: "",
    },
  })

  // Form gönderimi
  function onSubmit(values: z.infer<typeof customerGroupFormSchema>) {
    console.log(values)
    // Burada API çağrısı yapılacak
    router.push("/customers/groups")
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
                  <h2 className="text-2xl font-semibold tracking-tight">Yeni Müşteri Grubu Oluştur</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Yeni bir müşteri grubu oluşturmak için aşağıdaki formu doldurun
                </p>
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Müşteri Grubu Bilgileri</CardTitle>
                  <CardDescription>
                    Müşteri grubu bilgilerini girin ve kaydedin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Grup Adı</FormLabel>
                            <FormControl>
                              <Input placeholder="VIP Müşteriler" {...field} />
                            </FormControl>
                            <FormDescription>
                              Müşteri grubunun adı
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Açıklama</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Bu grup hakkında açıklama" 
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Müşteri grubunun amacı ve özellikleri
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Renk</FormLabel>
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <Input 
                                  type="color" 
                                  className="w-12 h-12 p-1" 
                                  {...field} 
                                />
                              </FormControl>
                              <span className="text-sm text-muted-foreground">
                                Grup için bir renk seçin
                              </span>
                            </div>
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
                              <Textarea 
                                placeholder="Grup hakkında ek notlar" 
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Grup hakkında ek bilgiler
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
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