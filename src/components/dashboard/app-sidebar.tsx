import * as React from 'react'
import {
  CreditCard,
  Users,
  Building2,
  Command,
  Wallet,
  FileText,
  Settings2,
  BarChart3,
  HelpCircle,
  Bell,
  Store,
  User,
  Shield,
  Smartphone,
  Home,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

import { NavMain } from '@/components/dashboard/nav-main'
import { NavUser } from '@/components/dashboard/nav-user'
import { TeamSwitcher } from '@/components/dashboard/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/ui/sidebar'

// This is the actual data for Quickesta Accounts Dashboard
const getDefaultData = (sessionUser: any, currentPath: string) => ({
  user: {
    name: `${sessionUser?.name || ''} ${sessionUser?.surname || ''}`.trim(),
    email: sessionUser?.email || '',
    avatar: '/avatars/default.jpg',
  },
  teams: [
    {
      name: 'Hesaplar Merkezi',
      logo: Store,
      plan: 'Enterprise',
    },
  ],
  navMain: [
    {
      title: 'Genel Bakış',
      url: '/dashboard',
      icon: BarChart3,
      isActive: currentPath === '/dashboard',
      items: [
        {
          title: 'Anasayfa',
          url: '/dashboard',
        },
        {
          title: 'Profil Ayarları',
          url: '/settings/profile',
        },
      ],
    },
    {
      title: 'Güvenlik',
      url: '/settings/security',
      icon: Shield,
      isActive: currentPath.startsWith('/settings'),
      items: [
        {
          title: 'Güvenlik Ayarları',
          url: '/settings/security',
        },
        {
          title: 'Cihaz Yönetimi',
          url: '/settings/devices',
        },
        {
          title: 'Hesaplarım',
          url: '/settings/accounts',
        },
      ],
    },
  ],
})

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const data = React.useMemo(
    () => getDefaultData(session?.user, pathname || ''),
    [session?.user, pathname],
  )

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
