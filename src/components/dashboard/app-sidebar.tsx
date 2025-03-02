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
      name: 'Visa Dashboard',
      logo: Plane,
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
      title: 'İstatistikler',
      url: '/statistics',
      icon: BarChart3,
      isActive: currentPath.startsWith('/statistics'),
      items: [
        {
          title: 'Onay/Red Oranları',
          url: '/statistics/approval-rates',
        },
        {
          title: 'Tercih Edilen Ülkeler',
          url: '/statistics/popular-countries',
        },
        {
          title: 'Başvuru Sayıları',
          url: '/statistics/application-counts',
        },
      ],
    },
    {
      title: 'Başvurular',
      url: '/applications',
      icon: FileCheck,
      isActive: currentPath.startsWith('/applications'),
      items: [
        {
          title: 'Tüm Başvurular',
          url: '/applications',
        },
        {
          title: 'Son Randevular',
          url: '/applications/recent-appointments',
        },
        {
          title: 'Yeni Başvuru',
          url: '/applications/new',
        },
      ],
    },
    {
      title: 'Ülkeler',
      url: '/countries',
      icon: Globe,
      isActive: currentPath.startsWith('/countries'),
      items: [
        {
          title: 'Ülke Listesi',
          url: '/countries',
        },
      ],
    },
    {
      title: 'Ödemeler',
      url: '/payments',
      icon: CreditCardIcon,
      isActive: currentPath.startsWith('/payments'),
      items: [
        {
          title: 'Ödeme Durumu',
          url: '/payments/status',
        },
        {
          title: 'Ödeme Geçmişi',
          url: '/payments/history',
        },
      ],
    },
    {
      title: 'Müşteriler',
      url: '/customers',
      icon: Users,
      isActive: currentPath.startsWith('/customers'),
      items: [
        {
          title: 'Müşteri Listesi',
          url: '/customers',
        },
        {
          title: 'Yeni Müşteri',
          url: '/customers/new',
        },
        {
          title: 'Bilgilendirme Formları',
          url: '/customers/forms',
        },
      ],
    },
    {
      title: 'Şirketler',
      url: '/companies',
      icon: Building2,
      isActive: currentPath.startsWith('/companies'),
      items: [
        {
          title: 'Şirket Listesi',
          url: '/companies',
        },
      ],
    },
    {
      title: 'Ayarlar',
      url: '/settings',
      icon: Settings2,
      isActive: currentPath.startsWith('/settings'),
      items: [
        {
          title: 'Profil Ayarları',
          url: '/settings/profile',
        },
        {
          title: 'Güvenlik',
          url: '/settings/security',
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
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
