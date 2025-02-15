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
} from 'lucide-react'
import { useSession } from 'next-auth/react'

import { NavMain } from '@/components/dashboard/nav-main'
import { NavProjects } from '@/components/dashboard/nav-projects'
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
const getDefaultData = (sessionUser: any) => ({
  user: {
    name: `${sessionUser?.name || ''} ${sessionUser?.surname || ''}`.trim(),
    email: sessionUser?.email || '',
    avatar: '/avatars/default.jpg', // You might want to add avatar to your session data
  },
  teams: [
    {
      name: 'Hesaplar Merkezi',
      logo: Store,
      plan: 'Enterprise',
    },
    {
      name: 'QPay',
      logo: Wallet,
      plan: 'Business',
    },
    {
      name: 'QPos',
      logo: CreditCard,
      plan: 'Pro',
    },
  ],
  navMain: [
    {
      title: 'Genel Bakış',
      url: '/dashboard',
      icon: BarChart3,
      isActive: true,
      items: [
        {
          title: 'İstatistikler',
          url: '/dashboard/statistics',
        },
        {
          title: 'Raporlar',
          url: '/dashboard/reports',
        },
        {
          title: 'Analiz',
          url: '/dashboard/analysis',
        },
      ],
    },
    {
      title: 'Hesap Yönetimi',
      url: '/accounts',
      icon: Users,
      items: [
        {
          title: 'Müşteriler',
          url: '/accounts/customers',
        },
        {
          title: 'İşletmeler',
          url: '/accounts/businesses',
        },
        {
          title: 'Kullanıcılar',
          url: '/accounts/users',
        },
      ],
    },
    {
      title: 'Finansal İşlemler',
      url: '/transactions',
      icon: CreditCard,
      items: [
        {
          title: 'Ödemeler',
          url: '/transactions/payments',
        },
        {
          title: 'Transferler',
          url: '/transactions/transfers',
        },
        {
          title: 'Faturalar',
          url: '/transactions/invoices',
        },
      ],
    },
    {
      title: 'Belgeler',
      url: '/documents',
      icon: FileText,
      items: [
        {
          title: 'Sözleşmeler',
          url: '/documents/contracts',
        },
        {
          title: 'Raporlar',
          url: '/documents/reports',
        },
        {
          title: 'Faturalar',
          url: '/documents/invoices',
        },
      ],
    },
    {
      title: 'Ayarlar',
      url: '/settings',
      icon: Settings2,
      items: [
        {
          title: 'Genel',
          url: '/settings/general',
        },
        {
          title: 'Güvenlik',
          url: '/settings/security',
        },
        {
          title: 'Bildirimler',
          url: '/settings/notifications',
        },
        {
          title: 'Entegrasyonlar',
          url: '/settings/integrations',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Müşteri Yönetimi',
      url: '/projects/customer-management',
      icon: Users,
    },
    {
      name: 'İşletme Yönetimi',
      url: '/projects/business-management',
      icon: Building2,
    },
    {
      name: 'Destek Merkezi',
      url: '/projects/support',
      icon: HelpCircle,
    },
  ],
})

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  const data = React.useMemo(
    () => getDefaultData(session?.user),
    [session?.user],
  )

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
