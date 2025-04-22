"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Textarea } from "@/ui/textarea"
import { SidebarProvider, SidebarInset } from "@/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Form, FormField, FormItem, FormLabel, FormDescription, FormMessage } from "@/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowLeft, Plus, Trash } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select"

// Form şeması
const formSchema = z.object({
    name: z.string().min(2, "Davranış adı en az 2 karakter olmalıdır"),
    description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
    criteria: z.array(z.object({
        field: z.string(),
        operator: z.string(),
        value: z.string()
    })).min(1, "En az bir kriter eklemelisiniz"),
    frequency: z.string(),
    color: z.string().optional(),
    notes: z.string().optional()
})

// Sıklık seçenekleri
const frequencyOptions = [
    { value: "daily", label: "Günlük" },
    { value: "weekly", label: "Haftalık" },
    { value: "monthly", label: "Aylık" },
    { value: "quarterly", label: "3 Aylık" },
    { value: "yearly", label: "Yıllık" }
]

// Alan seçenekleri
const fieldOptions = [
    { value: "purchase_frequency", label: "Satın Alma Sıklığı" },
    { value: "total_spent", label: "Toplam Harcama" },
    { value: "last_purchase_date", label: "Son Satın Alma Tarihi" },
    { value: "cart_value", label: "Sepet Değeri" },
    { value: "product_category", label: "Ürün Kategorisi" },
    { value: "customer_age", label: "Müşteri Yaşı" },
    { value: "customer_location", label: "Müşteri Konumu" },
    { value: "customer_gender", label: "Müşteri Cinsiyeti" },
    { value: "customer_loyalty", label: "Müşteri Sadakati" },
    { value: "customer_satisfaction", label: "Müşteri Memnuniyeti" },
    { value: "website_visits", label: "Web Sitesi Ziyaretleri" },
    { value: "email_open_rate", label: "E-posta Açma Oranı" },
    { value: "email_click_rate", label: "E-posta Tıklama Oranı" },
    { value: "social_media_engagement", label: "Sosyal Medya Etkileşimi" },
    { value: "customer_feedback", label: "Müşteri Geri Bildirimi" }
]

// Operatör seçenekleri (alan tipine göre)
const operatorOptions = {
    // Sayısal alanlar için operatörler
    numeric: [
        { value: "equals", label: "Eşittir" },
        { value: "not_equals", label: "Eşit Değildir" },
        { value: "greater_than", label: "Büyüktür" },
        { value: "less_than", label: "Küçüktür" },
        { value: "greater_than_or_equal", label: "Büyük veya Eşittir" },
        { value: "less_than_or_equal", label: "Küçük veya Eşittir" },
        { value: "between", label: "Arasında" },
        { value: "not_between", label: "Arasında Değil" }
    ],
    // Tarih alanları için operatörler
    date: [
        { value: "equals", label: "Eşittir" },
        { value: "not_equals", label: "Eşit Değildir" },
        { value: "before", label: "Öncesinde" },
        { value: "after", label: "Sonrasında" },
        { value: "between", label: "Arasında" },
        { value: "not_between", label: "Arasında Değil" },
        { value: "last_days", label: "Son X Gün" },
        { value: "next_days", label: "Gelecek X Gün" }
    ],
    // Metin alanları için operatörler
    text: [
        { value: "equals", label: "Eşittir" },
        { value: "not_equals", label: "Eşit Değildir" },
        { value: "contains", label: "İçerir" },
        { value: "not_contains", label: "İçermez" },
        { value: "starts_with", label: "İle Başlar" },
        { value: "ends_with", label: "İle Biter" },
        { value: "regex", label: "Regex Eşleşmesi" }
    ],
    // Kategori alanları için operatörler
    category: [
        { value: "equals", label: "Eşittir" },
        { value: "not_equals", label: "Eşit Değildir" },
        { value: "in", label: "İçinde" },
        { value: "not_in", label: "İçinde Değil" }
    ],
    // Boolean alanlar için operatörler
    boolean: [
        { value: "equals", label: "Eşit Değildir" },
        { value: "not_equals", label: "Eşit Değildir" }
    ]
}

// Alan tipine göre operatörleri belirle
const getOperatorsForField = (field: string) => {
    // Alan tipine göre operatörleri belirle
    if (["total_spent", "cart_value", "customer_age", "website_visits", "email_open_rate", "email_click_rate", "social_media_engagement"].includes(field)) {
        return operatorOptions.numeric
    } else if (["last_purchase_date"].includes(field)) {
        return operatorOptions.date
    } else if (["customer_location", "customer_feedback"].includes(field)) {
        return operatorOptions.text
    } else if (["product_category"].includes(field)) {
        return operatorOptions.category
    } else if (["customer_gender"].includes(field)) {
        return operatorOptions.boolean
    } else {
        // Varsayılan olarak metin operatörlerini döndür
        return operatorOptions.text
    }
}

// Form tipi
type FormValues = z.infer<typeof formSchema>

export default function CreateCustomerBehaviorPage() {
    const router = useRouter()
    const [criteria, setCriteria] = useState([{ field: "", operator: "", value: "" }])
    const [operators, setOperators] = useState<{ [key: number]: typeof operatorOptions.text }>({})

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            criteria: [{ field: "", operator: "", value: "" }],
            frequency: "daily",
            color: "#000000",
            notes: ""
        }
    })

    const onSubmit = (data: FormValues) => {
        router.push("/customers/behaviors")
    }

    const addCriterion = () => {
        setCriteria([...criteria, { field: "", operator: "", value: "" }])
    }

    const removeCriterion = (index: number) => {
        const newCriteria = criteria.filter((_, i) => i !== index)
        setCriteria(newCriteria)

        // Operatörleri güncelle
        const newOperators = { ...operators }
        delete newOperators[index]
        setOperators(newOperators)
    }

    const updateCriterion = (index: number, field: string, value: string) => {
        const newCriteria = criteria.map((criterion, i) => {
            if (i === index) {
                return { ...criterion, [field]: value }
            }
            return criterion
        })
        setCriteria(newCriteria)

        // Alan değiştiğinde operatörleri güncelle
        if (field === "field") {
            const newOperators = { ...operators }
            newOperators[index] = getOperatorsForField(value)
            setOperators(newOperators)

            // Operatör değerini sıfırla
            if (newCriteria[index].operator && !newOperators[index].some(op => op.value === newCriteria[index].operator)) {
                newCriteria[index].operator = ""
            }
        }
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
                                        onClick={() => router.push("/customers/behaviors")}
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                    </Button>
                                    <h2 className="text-2xl font-semibold tracking-tight">Yeni Müşteri Davranışı</h2>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Yeni bir müşteri davranışı tanımlayın
                                </p>
                            </div>
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="p-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Davranış Adı</FormLabel>
                                                        <FormDescription>
                                                            Davranışı tanımlayan kısa bir isim
                                                        </FormDescription>
                                                        <Input {...field} />
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
                                                        <FormDescription>
                                                            Davranışın detaylı açıklaması
                                                        </FormDescription>
                                                        <Textarea {...field} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-medium">Kriterler</h3>
                                                    <Button type="button" variant="outline" onClick={addCriterion}>
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Kriter Ekle
                                                    </Button>
                                                </div>
                                                {criteria.map((criterion, index) => (
                                                    <div key={index} className="flex items-center gap-4">
                                                        <Select
                                                            value={criterion.field}
                                                            onValueChange={(value) => updateCriterion(index, "field", value)}
                                                        >
                                                            <SelectTrigger className="w-[200px]">
                                                                <SelectValue placeholder="Alan Seçin" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {fieldOptions.map((option) => (
                                                                    <SelectItem key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>

                                                        <Select
                                                            value={criterion.operator}
                                                            onValueChange={(value) => updateCriterion(index, "operator", value)}
                                                            disabled={!criterion.field}
                                                        >
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Operatör Seçin" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {(operators[index] || []).map((option) => (
                                                                    <SelectItem key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>

                                                        <Input
                                                            placeholder="Değer"
                                                            value={criterion.value}
                                                            onChange={(e) => updateCriterion(index, "value", e.target.value)}
                                                            disabled={!criterion.operator}
                                                        />

                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeCriterion(index)}
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="frequency"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Sıklık</FormLabel>
                                                        <FormDescription>
                                                            Davranışın ne sıklıkla kontrol edileceği
                                                        </FormDescription>
                                                        <select
                                                            {...field}
                                                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                                                        >
                                                            {frequencyOptions.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </select>
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
                                                        <FormDescription>
                                                            Davranışı temsil eden renk
                                                        </FormDescription>
                                                        <Input type="color" {...field} />
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
                                                        <FormDescription>
                                                            Davranış hakkında ek notlar
                                                        </FormDescription>
                                                        <Textarea {...field} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="flex justify-end gap-4">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => router.push("/customers/behaviors")}
                                                >
                                                    İptal
                                                </Button>
                                                <Button type="submit">Kaydet</Button>
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