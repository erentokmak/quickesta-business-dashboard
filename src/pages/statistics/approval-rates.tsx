import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { PageHeader } from '@/components/layout/PageHeader'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { Progress } from '@/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { BarChart3, CheckCircle, XCircle, Filter, Download } from 'lucide-react'
import { Button } from '@/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'

// Dummy data for statistics
const approvalRateData = {
  overall: 78,
  monthly: [
    { month: 'Ocak', rate: 75, approved: 156, rejected: 52 },
    { month: 'Şubat', rate: 72, approved: 144, rejected: 56 },
    { month: 'Mart', rate: 80, approved: 160, rejected: 40 },
    { month: 'Nisan', rate: 82, approved: 164, rejected: 36 },
    { month: 'Mayıs', rate: 78, approved: 156, rejected: 44 },
    { month: 'Haziran', rate: 76, approved: 152, rejected: 48 },
  ],
  countries: [
    { country: 'Fransa', rate: 82, approved: 123, rejected: 27 },
    { country: 'İtalya', rate: 76, approved: 95, rejected: 30 },
    { country: 'Almanya', rate: 85, approved: 102, rejected: 18 },
    { country: 'İspanya', rate: 79, approved: 79, rejected: 21 },
    { country: 'ABD', rate: 68, approved: 68, rejected: 32 },
    { country: 'İngiltere', rate: 72, approved: 72, rejected: 28 },
    { country: 'Hollanda', rate: 81, approved: 81, rejected: 19 },
    { country: 'Belçika', rate: 77, approved: 77, rejected: 23 },
  ],
  visaTypes: [
    { type: 'Turist', rate: 82, approved: 246, rejected: 54 },
    { type: 'İş', rate: 88, approved: 176, rejected: 24 },
    { type: 'Öğrenci', rate: 75, approved: 150, rejected: 50 },
    { type: 'Aile Birleşimi', rate: 70, approved: 140, rejected: 60 },
    { type: 'Çalışma', rate: 65, approved: 130, rejected: 70 },
  ],
}

export default function ApprovalRatesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader title="Onay/Red Oranları" />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <h2 className="text-2xl font-bold tracking-tight">Vize Onay İstatistikleri</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrele
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Rapor İndir
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Genel Onay Oranı</CardTitle>
                <CardDescription>Tüm başvuruların onay oranı</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="text-5xl font-bold">{approvalRateData.overall}%</div>
                  <Progress value={approvalRateData.overall} className="h-2 w-full" />
                  <div className="flex items-center justify-between w-full text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                      <span>Onaylanan</span>
                    </div>
                    <div className="flex items-center">
                      <XCircle className="mr-1 h-4 w-4 text-red-500" />
                      <span>Reddedilen</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Ülkelere Göre En Yüksek Onay</CardTitle>
                <CardDescription>En yüksek onay oranına sahip ülkeler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvalRateData.countries
                    .sort((a, b) => b.rate - a.rate)
                    .slice(0, 3)
                    .map((country, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{country.country}</div>
                          <div className="text-sm font-medium">{country.rate}%</div>
                        </div>
                        <Progress value={country.rate} className="h-2" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Vize Türüne Göre En Yüksek Onay</CardTitle>
                <CardDescription>En yüksek onay oranına sahip vize türleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvalRateData.visaTypes
                    .sort((a, b) => b.rate - a.rate)
                    .slice(0, 3)
                    .map((type, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{type.type}</div>
                          <div className="text-sm font-medium">{type.rate}%</div>
                        </div>
                        <Progress value={type.rate} className="h-2" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detaylı İstatistikler</CardTitle>
              <CardDescription>
                Farklı kategorilere göre onay ve red oranları
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="monthly">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="monthly">Aylık</TabsTrigger>
                    <TabsTrigger value="countries">Ülkeler</TabsTrigger>
                    <TabsTrigger value="visaTypes">Vize Türleri</TabsTrigger>
                  </TabsList>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="2023">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Yıl" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <TabsContent value="monthly" className="space-y-4">
                  {approvalRateData.monthly.map((month, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{month.month}</div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                            <span className="text-sm">{month.approved}</span>
                          </div>
                          <div className="flex items-center">
                            <XCircle className="mr-1 h-4 w-4 text-red-500" />
                            <span className="text-sm">{month.rejected}</span>
                          </div>
                          <div className="text-sm font-medium">{month.rate}%</div>
                        </div>
                      </div>
                      <Progress value={month.rate} className="h-2" />
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="countries" className="space-y-4">
                  {approvalRateData.countries.map((country, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{country.country}</div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                            <span className="text-sm">{country.approved}</span>
                          </div>
                          <div className="flex items-center">
                            <XCircle className="mr-1 h-4 w-4 text-red-500" />
                            <span className="text-sm">{country.rejected}</span>
                          </div>
                          <div className="text-sm font-medium">{country.rate}%</div>
                        </div>
                      </div>
                      <Progress value={country.rate} className="h-2" />
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="visaTypes" className="space-y-4">
                  {approvalRateData.visaTypes.map((type, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{type.type}</div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                            <span className="text-sm">{type.approved}</span>
                          </div>
                          <div className="flex items-center">
                            <XCircle className="mr-1 h-4 w-4 text-red-500" />
                            <span className="text-sm">{type.rejected}</span>
                          </div>
                          <div className="text-sm font-medium">{type.rate}%</div>
                        </div>
                      </div>
                      <Progress value={type.rate} className="h-2" />
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 