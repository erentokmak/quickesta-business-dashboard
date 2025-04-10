import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { PageHeader } from '@/components/layout/PageHeader'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Separator } from '@/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import {
  FileCheck,
  ArrowLeft,
  Save,
  Calendar,
  Upload,
  CheckCircle,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// Dummy data for form options
const countries = [
  { value: 'france', label: 'Fransa' },
  { value: 'italy', label: 'İtalya' },
  { value: 'germany', label: 'Almanya' },
  { value: 'spain', label: 'İspanya' },
  { value: 'usa', label: 'ABD' },
  { value: 'uk', label: 'İngiltere' },
  { value: 'netherlands', label: 'Hollanda' },
  { value: 'belgium', label: 'Belçika' },
]

const visaTypes = [
  { value: 'tourist', label: 'Turist Vizesi' },
  { value: 'business', label: 'İş Vizesi' },
  { value: 'student', label: 'Öğrenci Vizesi' },
  { value: 'family', label: 'Aile Birleşimi Vizesi' },
  { value: 'work', label: 'Çalışma Vizesi' },
]

const documentTypes = [
  { id: 'passport', name: 'Pasaport', required: true },
  { id: 'photo', name: 'Fotoğraf (Biometrik)', required: true },
  { id: 'application', name: 'Başvuru Formu', required: true },
  { id: 'financial', name: 'Mali Durum Belgesi', required: true },
  { id: 'insurance', name: 'Seyahat Sigortası', required: true },
  { id: 'invitation', name: 'Davetiye (Varsa)', required: false },
  { id: 'accommodation', name: 'Konaklama Belgesi', required: true },
  { id: 'flight', name: 'Uçuş Rezervasyonu', required: true },
  { id: 'employment', name: 'İş/Çalışma Belgesi', required: false },
]

export default function NewApplicationPage() {
  const [activeTab, setActiveTab] = useState('personal')
  const [documents, setDocuments] = useState<Record<string, boolean>>({})

  const handleDocumentChange = (id: string, checked: boolean) => {
    setDocuments((prev) => ({
      ...prev,
      [id]: checked,
    }))
  }

  const isDocumentsComplete = () => {
    return documentTypes
      .filter((doc) => doc.required)
      .every((doc) => documents[doc.id])
  }

  const handleNextTab = () => {
    if (activeTab === 'personal') setActiveTab('visa')
    else if (activeTab === 'visa') setActiveTab('documents')
    else if (activeTab === 'documents') setActiveTab('payment')
  }

  const handlePrevTab = () => {
    if (activeTab === 'payment') setActiveTab('documents')
    else if (activeTab === 'documents') setActiveTab('visa')
    else if (activeTab === 'visa') setActiveTab('personal')
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Yeni Başvuru" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileCheck className="h-5 w-5" />
              <h2 className="text-2xl font-bold tracking-tight">
                Vize Başvuru Formu
              </h2>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/applications">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Başvurulara Dön
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Yeni Vize Başvurusu</CardTitle>
              <CardDescription>
                Vize başvurusu için gerekli bilgileri doldurun
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">Kişisel Bilgiler</TabsTrigger>
                  <TabsTrigger value="visa">Vize Bilgileri</TabsTrigger>
                  <TabsTrigger value="documents">Belgeler</TabsTrigger>
                  <TabsTrigger value="payment">Ödeme</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Ad</Label>
                      <Input id="firstName" placeholder="Adınız" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Soyad</Label>
                      <Input id="lastName" placeholder="Soyadınız" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Doğum Tarihi</Label>
                      <Input id="birthDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthPlace">Doğum Yeri</Label>
                      <Input id="birthPlace" placeholder="Doğum yeriniz" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Uyruk</Label>
                      <Input id="nationality" placeholder="Uyruğunuz" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passportNumber">Pasaport Numarası</Label>
                      <Input
                        id="passportNumber"
                        placeholder="Pasaport numaranız"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="passportIssueDate">
                        Pasaport Veriliş Tarihi
                      </Label>
                      <Input id="passportIssueDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passportExpiryDate">
                        Pasaport Geçerlilik Tarihi
                      </Label>
                      <Input id="passportExpiryDate" type="date" />
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="E-posta adresiniz"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input id="phone" placeholder="Telefon numaranız" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adres</Label>
                    <Input id="address" placeholder="Adresiniz" />
                  </div>
                </TabsContent>

                <TabsContent value="visa" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Ülke</Label>
                      <Select>
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Ülke seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem
                              key={country.value}
                              value={country.value}
                            >
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="visaType">Vize Türü</Label>
                      <Select>
                        <SelectTrigger id="visaType">
                          <SelectValue placeholder="Vize türü seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {visaTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="entryDate">Giriş Tarihi</Label>
                      <Input id="entryDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exitDate">Çıkış Tarihi</Label>
                      <Input id="exitDate" type="date" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Kalış Süresi (Gün)</Label>
                      <Input id="duration" type="number" min="1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="entryCount">Giriş Sayısı</Label>
                      <Select>
                        <SelectTrigger id="entryCount">
                          <SelectValue placeholder="Giriş sayısı seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Tek Giriş</SelectItem>
                          <SelectItem value="double">Çift Giriş</SelectItem>
                          <SelectItem value="multiple">Çoklu Giriş</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Seyahat Amacı</Label>
                    <Input id="purpose" placeholder="Seyahat amacınız" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accommodation">Konaklama Bilgileri</Label>
                    <Input
                      id="accommodation"
                      placeholder="Konaklama bilgileriniz"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="text-sm font-medium">Gerekli Belgeler</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {documentTypes.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={doc.id}
                            className="h-4 w-4 rounded border-gray-300"
                            checked={documents[doc.id] || false}
                            onChange={(e) =>
                              handleDocumentChange(doc.id, e.target.checked)
                            }
                          />
                          <Label htmlFor={doc.id} className="flex items-center">
                            {doc.name}
                            {doc.required && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </Label>
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-auto"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Yükle
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-md bg-muted p-4 mt-4">
                    <div className="text-sm font-medium mb-2">
                      Belge Gereksinimleri
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                      <li>
                        Tüm belgeler PDF, JPG veya PNG formatında olmalıdır.
                      </li>
                      <li>Dosya boyutu 5MB&apos;ı geçmemelidir.</li>
                      <li>
                        Pasaport taraması renkli ve tüm sayfaları içermelidir.
                      </li>
                      <li>Fotoğraflar son 6 ay içinde çekilmiş olmalıdır.</li>
                      <li>
                        Tüm belgeler orijinal veya noter onaylı olmalıdır.
                      </li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="payment" className="space-y-4 mt-4">
                  <div className="rounded-md border p-4">
                    <div className="text-lg font-medium mb-4">Ödeme Özeti</div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Vize Ücreti</span>
                        <span>€80.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Servis Ücreti</span>
                        <span>€40.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sigorta</span>
                        <span>€20.00</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Toplam</span>
                        <span>€140.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mt-4">
                    <div className="text-sm font-medium">Ödeme Yöntemi</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-md p-4 cursor-pointer hover:bg-muted">
                        <div className="font-medium">Kredi Kartı</div>
                        <div className="text-sm text-muted-foreground">
                          Visa, Mastercard, AMEX
                        </div>
                      </div>
                      <div className="border rounded-md p-4 cursor-pointer hover:bg-muted">
                        <div className="font-medium">Banka Havalesi</div>
                        <div className="text-sm text-muted-foreground">
                          EFT veya Havale
                        </div>
                      </div>
                      <div className="border rounded-md p-4 cursor-pointer hover:bg-muted">
                        <div className="font-medium">Online Ödeme</div>
                        <div className="text-sm text-muted-foreground">
                          PayPal, Stripe
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md bg-muted p-4 mt-4">
                    <div className="text-sm font-medium mb-2">
                      Ödeme Bilgileri
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                      <li>
                        Ödeme işlemi güvenli bir şekilde gerçekleştirilecektir.
                      </li>
                      <li>
                        Başvurunuz onaylanmasa bile servis ücreti iade edilmez.
                      </li>
                      <li>Vize reddi durumunda vize ücreti iade edilmez.</li>
                      <li>Tüm ödemeler Euro (€) üzerinden yapılmaktadır.</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevTab}
                disabled={activeTab === 'personal'}
              >
                Geri
              </Button>
              <div className="flex space-x-2">
                {activeTab === 'payment' ? (
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Başvuruyu Tamamla
                  </Button>
                ) : (
                  <Button onClick={handleNextTab}>
                    {activeTab === 'documents' && !isDocumentsComplete()
                      ? 'Devam Et (Eksik Belgeler)'
                      : 'Devam Et'}
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
