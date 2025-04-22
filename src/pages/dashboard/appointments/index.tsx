"use client"

import { useEffect } from "react"
import { useQuery } from "@apollo/client"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import { ScrollArea } from "@/ui/scroll-area"
import { SidebarProvider, SidebarInset } from "@/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/ui/table"
import { GET_DAILY_APPOINTMENTS, GET_BUSINESS_BY_OWNER } from "@/graphql/queries/appointment"
import { useSession } from "next-auth/react"
import { Calendar, Clock, User } from "lucide-react"

interface SessionUser {
    id: string // UUID string olarak kalabilir, GraphQL otomatik dönüşüm yapacak
    email: string
    name: string
    surname: string
    phoneNumber: string
    username: string
    accessToken: string
    refreshToken: string
    expiresIn: number
    roles: string[]
    permissions: string[]
}

const AppointmentTable = ({ appointments, date }: { appointments: any[], date: Date }) => {
    // Toplam randevu sayısı
    const totalAppointments = appointments.length

    // Toplam gelir
    const totalRevenue = appointments.reduce((sum, apt) => sum + apt.price_charged, 0)

    return (
        <Table>
            <TableCaption>
                {format(date, 'd MMMM yyyy', { locale: tr })} tarihli randevular
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Saat</TableHead>
                    <TableHead>Müşteri</TableHead>
                    <TableHead>Hizmet</TableHead>
                    <TableHead>Personel</TableHead>
                    <TableHead className="text-right">Ücret</TableHead>
                    <TableHead>Durum</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {format(new Date(`2000-01-01T${appointment.start_time}`), 'HH:mm')}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <div>
                                    <div className="font-medium">{appointment.customer.full_name}</div>
                                    <div className="text-sm text-muted-foreground">{appointment.customer.phone}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>{appointment.service.name}</TableCell>
                        <TableCell>{appointment.team_member.full_name}</TableCell>
                        <TableCell className="text-right">{appointment.price_charged.toLocaleString('tr-TR')} ₺</TableCell>
                        <TableCell>
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${appointment.status === "scheduled"
                                ? "bg-blue-100 text-blue-700"
                                : appointment.status === "completed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}>
                                {appointment.status === "scheduled" ? "Planlandı"
                                    : appointment.status === "completed" ? "Tamamlandı"
                                        : "İptal Edildi"}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
                {appointments.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                            Randevu bulunmamaktadır
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            {appointments.length > 0 && (
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4}>Toplam</TableCell>
                        <TableCell className="text-right font-medium">{totalRevenue.toLocaleString('tr-TR')} ₺</TableCell>
                        <TableCell>{totalAppointments} Randevu</TableCell>
                    </TableRow>
                </TableFooter>
            )}
        </Table>
    )
}

export default function AppointmentsPage() {
    const { data: session, status } = useSession()
    const userId = (session?.user as SessionUser)?.id

    // Debug için session bilgilerini kontrol edelim
    useEffect(() => {
        console.log('Session:', session)
        console.log('User ID:', userId)
    }, [session, userId])

    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    // Önce business'ı çekelim
    const { data: businessData, error: businessError } = useQuery(GET_BUSINESS_BY_OWNER, {
        variables: {
            owner_id: userId
        },
        skip: !userId
    })

    // Business error'unu kontrol edelim
    useEffect(() => {
        if (businessError) {
            console.error('Business Error:', businessError)
        }
    }, [businessError])

    const businessId = businessData?.businesses[0]?.id

    // Sonra appointments'ları çekelim
    const { data, loading, error } = useQuery(GET_DAILY_APPOINTMENTS, {
        variables: {
            business_id: businessId,
            start_date: format(today, 'yyyy-MM-dd'),
            end_date: format(tomorrow, 'yyyy-MM-dd')
        },
        skip: !businessId
    })

    // Debug için loglar
    useEffect(() => {
        console.log('Business Data:', businessData)
        console.log('Business ID:', businessId)
        console.log('Appointments:', data)
        if (error) {
            console.error('Appointments Error:', error)
        }
    }, [businessData, businessId, data, error])

    const todayAppointments = data?.appointments.filter(
        (apt: any) => apt.appointment_date === format(today, 'yyyy-MM-dd')
    ) || []

    const tomorrowAppointments = data?.appointments.filter(
        (apt: any) => apt.appointment_date === format(tomorrow, 'yyyy-MM-dd')
    ) || []

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="w-full">
                <div className="flex flex-col h-full">
                    <div className="border-b mt-3">
                        <div className="flex items-center p-4">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-semibold tracking-tight">Randevular</h2>
                                <p className="text-sm text-muted-foreground">
                                    Bugün ve yarınki randevular
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Bugünün Randevuları
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <AppointmentTable appointments={todayAppointments} date={today} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Yarının Randevuları
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <AppointmentTable appointments={tomorrowAppointments} date={tomorrow} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
} 