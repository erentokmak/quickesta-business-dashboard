"use client"

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useQuery } from '@apollo/client'
import { GET_TEAM_MEMBERS_BY_USER_ID, GetTeamMembersByUserIdResponse, GetTeamMembersByUserIdVariables } from '@/graphql/queries/team'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'
import { ScrollArea } from "@/ui/scroll-area"
import { Building2 } from "lucide-react"
import { BusinessCards } from '@/components/dashboard/business-cards'

export default function DashboardPage() {
  const { data: session } = useSession()
  const userId = session?.user?.id

  const { data: teamData } = useQuery<GetTeamMembersByUserIdResponse, GetTeamMembersByUserIdVariables>(
    GET_TEAM_MEMBERS_BY_USER_ID,
    {
      variables: { userId: userId || '' },
      skip: !userId,
    }
  )

  useEffect(() => {
    if (teamData?.team_members && teamData.team_members.length > 0) {
      const businessId = teamData.team_members[0].business_id
      console.log('Business ID:', businessId)
    }
  }, [teamData])

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
