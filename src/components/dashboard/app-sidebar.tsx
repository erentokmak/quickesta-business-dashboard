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
  AppWindow,
  Plane,
  CheckCircle,
  XCircle,
  Globe,
  Calendar,
  CreditCard as CreditCardIcon,
  FileCheck,
  ClipboardList,
  UserPlus,
  FileText as FileTextIcon,
  Send,
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

// This is the actual data for Quickesta Visa Dashboard
const getDefaultData = (sessionUser: any, currentPath: string) => ({
  user: {
    name: `${sessionUser?.name || ''} ${sessionUser?.surname || ''}`.trim(),
    email: sessionUser?.email || '',
    avatar: '/avatars/default.jpg',
  },
  teams: [
    {
      name: 'Quickesta Business',
      logo: Store,
      plan: 'Enterprise',
    },
  ],
  navMain: [
    {
      title: 'Genel',
      url: '/dashboard',
      icon: Home,
      isActive: currentPath === '/dashboard',
      items: [
        {
          title: 'Ana Sayfa',
          url: '/dashboard',
        },
        {
          title: 'İstatistikler',
          url: '/dashboard/analytics',
        }
      ],
    },
    {
      title: 'Yönetim',
      url: '/management',
      icon: Building2,
      isActive: currentPath.startsWith('/management'),
      items: [
        {
          title: 'Müşteriler',
          url: '/dashboard/customers',
        },
        {
          title: 'Ürünler',
          url: '/dashboard/products',
        },
        {
          title: 'Siparişler',
          url: '/dashboard/orders',
        },
        {
          title: 'Faturalar',
          url: '/dashboard/invoices',
        }
      ],
    },
    {
      title: 'Finans',
      url: '/finance',
      icon: CreditCard,
      isActive: currentPath.startsWith('/finance'),
      items: [
        {
          title: 'Ödemeler',
          url: '/dashboard/payments',
        },
        {
          title: 'Raporlar',
          url: '/dashboard/reports',
        }
      ],
    },
    {
      title: 'Ayarlar',
      url: '/settings',
      icon: Settings2,
      isActive: currentPath.startsWith('/settings'),
      items: [
        {
          title: 'Şirket',
          url: '/dashboard/company',
        },
        {
          title: 'Takvim',
          url: '/dashboard/calendar',
        },
        {
          title: 'Ayarlar',
          url: '/dashboard/settings',
        }
      ],
    }
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
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

