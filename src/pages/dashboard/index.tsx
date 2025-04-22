"use client"

import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { BusinessCards } from '@/components/dashboard/business-cards'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'
import { ScrollArea } from "@/ui/scroll-area"
import { Building2 } from "lucide-react"
import { useSession } from 'next-auth/react'

export default function DashboardPage() {
  const { data: session } = useSession()
  console.log(session)
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center gap-2 px-4 py-2 border-b">
          <Building2 className="h-5 w-5" />
          <h1 className="text-xl font-semibold">İşletmelerim</h1>
        </div>
        <ScrollArea className="h-full">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <BusinessCards />
          </div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  )
}
