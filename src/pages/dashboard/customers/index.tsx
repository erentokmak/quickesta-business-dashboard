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
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/ui/table"
import { GET_BUSINESS_CUSTOMERS, GET_BUSINESS_BY_OWNER } from "@/graphql/queries/customer"
import { useSession } from "next-auth/react"
import { User, Mail, Phone, Calendar } from "lucide-react"

interface SessionUser {
  id: string
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

const CustomerTable = ({ customers }: { customers: any[] }) => {
  // Toplam müşteri sayısı
  const totalCustomers = customers.length

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableCaption>
          Toplam {totalCustomers} müşteri
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="min-w-[200px]">Müşteri</TableHead>
            <TableHead className="min-w-[150px]">İletişim</TableHead>
            <TableHead className="min-w-[150px]">Notlar</TableHead>
            <TableHead className="min-w-[150px]">Kayıt Tarihi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {customer.id}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{customer.full_name}</div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {customer.email && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="h-3 w-3 mr-1" />
                      {customer.email}
                    </div>
                  )}
                  {customer.phone && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-3 w-3 mr-1" />
                      {customer.phone}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>{customer.notes || "-"}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(customer.created_at), 'd MMMM yyyy', { locale: tr })}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {customers.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                Müşteri bulunmamaktadır
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {customers.length > 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Toplam</TableCell>
              <TableCell>{totalCustomers} Müşteri</TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  )
}

export default function CustomersPage() {
  const { data: session, status } = useSession()
  const userId = (session?.user as SessionUser)?.id

  // Debug için session bilgilerini kontrol edelim
  useEffect(() => {
  }, [session, userId])

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

  // Sonra customers'ları çekelim
  const { data, loading, error } = useQuery(GET_BUSINESS_CUSTOMERS, {
    variables: {
      business_id: businessId
    },
    skip: !businessId
  })

  // Debug için loglar
  useEffect(() => {
    if (error) {
      console.error('Customers Error:', error)
    }
  }, [businessData, businessId, data, error])

  const customers = data?.customers || []

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full">
        <div className="flex flex-col h-full">
          <div className="border-b mt-3">
            <div className="flex items-center p-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Müşteriler</h2>
                <p className="text-sm text-muted-foreground">
                  Müşteri listesi
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Müşteriler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CustomerTable customers={customers} />
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 