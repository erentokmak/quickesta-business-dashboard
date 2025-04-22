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
  Info,
  Plus,
  X
} from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Form şeması
const customerSegmentFormSchema = z.object({
  name: z.string().min(2, {
    message: "Segment adı en az 2 karakter olmalıdır.",
  }),
  description: z.string().min(10, {
    message: "Açıklama en az 10 karakter olmalıdır.",
  }),
  criteria: z.array(z.object({
    field: z.string(),
    operator: z.string(),
    value: z.string()
  })),
  color: z.string().optional(),
  notes: z.string().optional(),
})

// Kriter alanları
const criteriaFields = [
  { value: "age", label: "Yaş" },
  { value: "gender", label: "Cinsiyet" },
  { value: "location", label: "Konum" },
  { value: "purchase_frequency", label: "Satın Alma Sıklığı" },
  { value: "total_spent", label: "Toplam Harcama" },
  { value: "last_purchase", label: "Son Satın Alma" },
  { value: "customer_since", label: "Müşteri Olma Süresi" },
]

// Operatörler
const operators = [
  { value: "equals", label: "Eşittir" },
  { value: "not_equals", label: "Eşit Değildir" },
  { value: "greater_than", label: "Büyüktür" },
  { value: "less_than", label: "Küçüktür" },
  { value: "contains", label: "İçerir" },
  { value: "not_contains", label: "İçermez" },
  { value: "starts_with", label: "İle Başlar" },
  { value: "ends_with", label: "İle Biter" },
]

export default function CreateCustomerSegmentPage() {
  const router = useRouter()
  const [criteria, setCriteria] = useState<Array<{field: string, operator: string, value: string}>>([])

  // Form tanımlaması
  const form = useForm<z.infer<typeof customerSegmentFormSchema>>({
    resolver: zodResolver(customerSegmentFormSchema),
    defaultValues: {
      name: "",
      description: "",
      criteria: [],
      color: "#3b82f6",
      notes: "",
    },
  })

  // Kriter ekleme
  const addCriterion = () => {
    setCriteria([...criteria, { field: "", operator: "", value: "" }])
  }

  // Kriter silme
  const removeCriterion = (index: number) => {
    const newCriteria = [...criteria]
    newCriteria.splice(index, 1)
    setCriteria(newCriteria)
    form.setValue("criteria", newCriteria)
  }

  // Kriter güncelleme
  const updateCriterion = (index: number, field: string, value: string) => {
    const newCriteria = [...criteria]
    newCriteria[index] = { ...newCriteria[index], [field]: value }
    setCriteria(newCriteria)
    form.setValue("criteria", newCriteria)
  }

  // Form gönderimi
  function onSubmit(values: z.infer<typeof customerSegmentFormSchema>) {
    // Burada API çağrısı yapılacak
    router.push("/customers/segments")
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
                  <h2 className="text-2xl font-semibold tracking-tight">Yeni Müşteri Segmenti Oluştur</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Yeni bir müşteri segmenti oluşturmak için aşağıdaki formu doldurun
                </p>
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Müşteri Segmenti Bilgileri</CardTitle>
                  <CardDescription>
                    Müşteri segmenti bilgilerini girin ve kaydedin
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
                            <FormLabel>Segment Adı</FormLabel>
                            <FormControl>
                              <Input placeholder="Yüksek Değerli Müşteriler" {...field} />
                            </FormControl>
                            <FormDescription>
                              Müşteri segmentinin adı
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
                                placeholder="Bu segment hakkında açıklama" 
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Müşteri segmentinin amacı ve özellikleri
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Segment Kriterleri</Label>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={addCriterion}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Kriter Ekle
                          </Button>
                        </div>
                        
                        {criteria.map((criterion, index) => (
                          <div key={index} className="flex items-center gap-2 p-4 border rounded-lg">
                            <div className="flex-1 space-y-2">
                              <select
                                className="w-full p-2 border rounded-md"
                                value={criterion.field}
                                onChange={(e) => updateCriterion(index, "field", e.target.value)}
                              >
                                <option value="">Alan Seçin</option>
                                {criteriaFields.map((field) => (
                                  <option key={field.value} value={field.value}>
                                    {field.label}
                                  </option>
                                ))}
                              </select>
                              
                              <select
                                className="w-full p-2 border rounded-md"
                                value={criterion.operator}
                                onChange={(e) => updateCriterion(index, "operator", e.target.value)}
                              >
                                <option value="">Operatör Seçin</option>
                                {operators.map((op) => (
                                  <option key={op.value} value={op.value}>
                                    {op.label}
                                  </option>
                                ))}
                              </select>
                              
                              <Input
                                placeholder="Değer"
                                value={criterion.value}
                                onChange={(e) => updateCriterion(index, "value", e.target.value)}
                              />
                            </div>
                            
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeCriterion(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      
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
                                Segment için bir renk seçin
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
                                placeholder="Segment hakkında ek notlar" 
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Segment hakkında ek bilgiler
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