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
  ShoppingCart,
  Package,
  BarChart,
  FileBarChart,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  LayoutDashboard,
  CreditCard as PaymentIcon,
  MessageSquare as ChatIcon,
  Bell as NotificationIcon,
  HelpCircle as SupportIcon,
  LogOut as LogoutIcon,
  Plus as AddIcon,
  LayoutDashboard as DashboardIcon,
  CreditCard as CardIcon,
  MessageSquare as MessageIcon,
  Bell as AlertIcon,
  HelpCircle as QuestionIcon,
  LogOut as ExitIcon,
  Plus as CreateIcon,
  LayoutDashboard as HomeIcon,
  CreditCard as MoneyIcon,
  MessageSquare as InboxIcon,
  Bell as RingIcon,
  HelpCircle as InfoIcon,
  LogOut as SignOutIcon,
  Plus as NewIcon,
  LayoutDashboard as MainIcon,
  CreditCard as TransactionIcon,
  MessageSquare as CommunicationIcon,
  Bell as AlertBellIcon,
  HelpCircle as HelpIcon,
  LogOut as LogoutButtonIcon,
  Plus as AddNewIcon,
  LayoutDashboard as DashboardHomeIcon,
  CreditCard as PaymentCardIcon,
  MessageSquare as MessageInboxIcon,
  Bell as NotificationBellIcon,
  HelpCircle as SupportHelpIcon,
  LogOut as SignOutButtonIcon,
  Plus as CreateNewIcon,
  LayoutDashboard as DashboardMainIcon,
  CreditCard as PaymentTransactionIcon,
  MessageSquare as MessageCommunicationIcon,
  Bell as NotificationAlertIcon,
  HelpCircle as SupportQuestionIcon,
  LogOut as LogoutSignIcon,
  Plus as AddCreateIcon,
  LayoutDashboard as DashboardHomeMainIcon,
  CreditCard as PaymentCardTransactionIcon,
  MessageSquare as MessageInboxCommunicationIcon,
  Bell as NotificationBellAlertIcon,
  HelpCircle as SupportHelpQuestionIcon,
  LogOut as LogoutSignButtonIcon,
  Plus as AddCreateNewIcon,
  LayoutDashboard as DashboardHomeMainIcon2,
  CreditCard as PaymentCardTransactionIcon2,
  MessageSquare as MessageInboxCommunicationIcon2,
  Bell as NotificationBellAlertIcon2,
  HelpCircle as SupportHelpQuestionIcon2,
  LogOut as LogoutSignButtonIcon2,
  Plus as AddCreateNewIcon2,
  LayoutDashboard as DashboardHomeMainIcon3,
  CreditCard as PaymentCardTransactionIcon3,
  MessageSquare as MessageInboxCommunicationIcon3,
  Bell as NotificationBellAlertIcon3,
  HelpCircle as SupportHelpQuestionIcon3,
  LogOut as LogoutSignButtonIcon3,
  Plus as AddCreateNewIcon3,
  LayoutDashboard as DashboardHomeMainIcon4,
  CreditCard as PaymentCardTransactionIcon4,
  MessageSquare as MessageInboxCommunicationIcon4,
  Bell as NotificationBellAlertIcon4,
  HelpCircle as SupportHelpQuestionIcon4,
  LogOut as LogoutSignButtonIcon4,
  Plus as AddCreateNewIcon4,
  LayoutDashboard as DashboardHomeMainIcon5,
  CreditCard as PaymentCardTransactionIcon5,
  MessageSquare as MessageInboxCommunicationIcon5,
  Bell as NotificationBellAlertIcon5,
  HelpCircle as SupportHelpQuestionIcon5,
  LogOut as LogoutSignButtonIcon5,
  Plus as AddCreateNewIcon5,
  LayoutDashboard as DashboardHomeMainIcon6,
  CreditCard as PaymentCardTransactionIcon6,
  MessageSquare as MessageInboxCommunicationIcon6,
  Bell as NotificationBellAlertIcon6,
  HelpCircle as SupportHelpQuestionIcon6,
  LogOut as LogoutSignButtonIcon6,
  Plus as AddCreateNewIcon6,
  LayoutDashboard as DashboardHomeMainIcon7,
  CreditCard as PaymentCardTransactionIcon7,
  MessageSquare as MessageInboxCommunicationIcon7,
  Bell as NotificationBellAlertIcon7,
  HelpCircle as SupportHelpQuestionIcon7,
  LogOut as LogoutSignButtonIcon7,
  Plus as AddCreateNewIcon7,
  LayoutDashboard as DashboardHomeMainIcon8,
  CreditCard as PaymentCardTransactionIcon8,
  MessageSquare as MessageInboxCommunicationIcon8,
  Bell as NotificationBellAlertIcon8,
  HelpCircle as SupportHelpQuestionIcon8,
  LogOut as LogoutSignButtonIcon8,
  Plus as AddCreateNewIcon8,
  LayoutDashboard as DashboardHomeMainIcon9,
  CreditCard as PaymentCardTransactionIcon9,
  MessageSquare as MessageInboxCommunicationIcon9,
  Bell as NotificationBellAlertIcon9,
  HelpCircle as SupportHelpQuestionIcon9,
  LogOut as LogoutSignButtonIcon9,
  Plus as AddCreateNewIcon9,
  LayoutDashboard as DashboardHomeMainIcon10,
  CreditCard as PaymentCardTransactionIcon10,
  MessageSquare as MessageInboxCommunicationIcon10,
  Bell as NotificationBellAlertIcon10,
  HelpCircle as SupportHelpQuestionIcon10,
  LogOut as LogoutSignButtonIcon10,
  Plus as AddCreateNewIcon10,
  LayoutDashboard as DashboardHomeMainIcon11,
  CreditCard as PaymentCardTransactionIcon11,
  MessageSquare as MessageInboxCommunicationIcon11,
  Bell as NotificationBellAlertIcon11,
  HelpCircle as SupportHelpQuestionIcon11,
  LogOut as LogoutSignButtonIcon11,
  Plus as AddCreateNewIcon11,
  LayoutDashboard as DashboardHomeMainIcon12,
  CreditCard as PaymentCardTransactionIcon12,
  MessageSquare as MessageInboxCommunicationIcon12,
  Bell as NotificationBellAlertIcon12,
  HelpCircle as SupportHelpQuestionIcon12,
  LogOut as LogoutSignButtonIcon12,
  Plus as AddCreateNewIcon12,
  LayoutDashboard as DashboardHomeMainIcon13,
  CreditCard as PaymentCardTransactionIcon13,
  MessageSquare as MessageInboxCommunicationIcon13,
  Bell as NotificationBellAlertIcon13,
  HelpCircle as SupportHelpQuestionIcon13,
  LogOut as LogoutSignButtonIcon13,
  Plus as AddCreateNewIcon13,
  LayoutDashboard as DashboardHomeMainIcon14,
  CreditCard as PaymentCardTransactionIcon14,
  MessageSquare as MessageInboxCommunicationIcon14,
  Bell as NotificationBellAlertIcon14,
  HelpCircle as SupportHelpQuestionIcon14,
  LogOut as LogoutSignButtonIcon14,
  Plus as AddCreateNewIcon14,
  LayoutDashboard as DashboardHomeMainIcon15,
  CreditCard as PaymentCardTransactionIcon15,
  MessageSquare as MessageInboxCommunicationIcon15,
  Bell as NotificationBellAlertIcon15,
  HelpCircle as SupportHelpQuestionIcon15,
  LogOut as LogoutSignButtonIcon15,
  Plus as AddCreateNewIcon15,
  LayoutDashboard as DashboardHomeMainIcon16,
  CreditCard as PaymentCardTransactionIcon16,
  MessageSquare as MessageInboxCommunicationIcon16,
  Bell as NotificationBellAlertIcon16,
  HelpCircle as SupportHelpQuestionIcon16,
  LogOut as LogoutSignButtonIcon16,
  Plus as AddCreateNewIcon16,
  LayoutDashboard as DashboardHomeMainIcon17,
  CreditCard as PaymentCardTransactionIcon17,
  MessageSquare as MessageInboxCommunicationIcon17,
  Bell as NotificationBellAlertIcon17,
  HelpCircle as SupportHelpQuestionIcon17,
  LogOut as LogoutSignButtonIcon17,
  Plus as AddCreateNewIcon17,
  LayoutDashboard as DashboardHomeMainIcon18,
  CreditCard as PaymentCardTransactionIcon18,
  MessageSquare as MessageInboxCommunicationIcon18,
  Bell as NotificationBellAlertIcon18,
  HelpCircle as SupportHelpQuestionIcon18,
  LogOut as LogoutSignButtonIcon18,
  Plus as AddCreateNewIcon18,
  LayoutDashboard as DashboardHomeMainIcon19,
  CreditCard as PaymentCardTransactionIcon19,
  MessageSquare as MessageInboxCommunicationIcon19,
  Bell as NotificationBellAlertIcon19,
  HelpCircle as SupportHelpQuestionIcon19,
  LogOut as LogoutSignButtonIcon19,
  Plus as AddCreateNewIcon19,
  LayoutDashboard as DashboardHomeMainIcon20,
  CreditCard as PaymentCardTransactionIcon20,
  MessageSquare as MessageInboxCommunicationIcon20,
  Bell as NotificationBellAlertIcon20,
  HelpCircle as SupportHelpQuestionIcon20,
  LogOut as LogoutSignButtonIcon20,
  Plus as AddCreateNewIcon20,
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

// This is the actual data for Quickesta Business Dashboard
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
        },
        {
          title: 'Web Sitelerim',
          url: '/dashboard/websites',
        }
      ],
    },
    {
      title: 'Web Sitesi',
      url: '/dashboard/website',
      icon: Globe,
      isActive: currentPath.startsWith('/dashboard/website'),
      items: [
        {
          title: 'Tema Düzenleyici',
          url: '/dashboard/theme-editor',
        },
        {
          title: 'Sayfa Yönetimi',
          url: '/dashboard/pages',
        },
        {
          title: 'Medya Kütüphanesi',
          url: '/dashboard/media',
        }
      ],
    },
    {
      title: 'Müşteriler',
      url: '/dashboard/customers',
      icon: Users,
      isActive: currentPath.startsWith('/dashboard/customers'),
      items: [
        {
          title: 'Müşteri Listesi',
          url: '/dashboard/customers',
        },
        {
          title: 'Müşteri Grupları',
          url: '/dashboard/customers/groups',
        },
        {
          title: 'Müşteri Segmentleri',
          url: '/dashboard/customers/segments',
        },
        {
          title: 'Müşteri Davranışları',
          url: '/dashboard/customers/behaviors',
        }
      ],
    },
    {
      title: 'Siparişler',
      url: '/dashboard/orders',
      icon: ShoppingCart,
      isActive: currentPath.startsWith('/dashboard/orders'),
      items: [
        {
          title: 'Tüm Siparişler',
          url: '/dashboard/orders',
        },
        {
          title: 'Bekleyen Siparişler',
          url: '/dashboard/orders/pending',
        },
        {
          title: 'Tamamlanan Siparişler',
          url: '/dashboard/orders/completed',
        },
        {
          title: 'İptal Edilen Siparişler',
          url: '/dashboard/orders/cancelled',
        }
      ],
    },
    {
      title: 'Ürünler',
      url: '/dashboard/products',
      icon: Package,
      isActive: currentPath.startsWith('/dashboard/products'),
      items: [
        {
          title: 'Ürün Listesi',
          url: '/dashboard/products',
        },
        {
          title: 'Kategoriler',
          url: '/dashboard/products/categories',
        },
        {
          title: 'Stok Durumu',
          url: '/dashboard/products/inventory',
        },
        {
          title: 'Ürün Değerlendirmeleri',
          url: '/dashboard/products/reviews',
        }
      ],
    },
    {
      title: 'Finans',
      url: '/dashboard/finance',
      icon: CreditCard,
      isActive: currentPath.startsWith('/dashboard/finance'),
      items: [
        {
          title: 'Gelir Raporu',
          url: '/dashboard/finance/income',
        },
        {
          title: 'Gider Raporu',
          url: '/dashboard/finance/expenses',
        },
        {
          title: 'Kâr/Zarar Analizi',
          url: '/dashboard/finance/profit-loss',
        },
        {
          title: 'Vergi Raporu',
          url: '/dashboard/finance/tax',
        }
      ],
    },
    {
      title: 'Analitik',
      url: '/dashboard/analytics',
      icon: BarChart,
      isActive: currentPath.startsWith('/dashboard/analytics'),
      items: [
        {
          title: 'Satış Analizi',
          url: '/dashboard/analytics/sales',
        },
        {
          title: 'Müşteri Analizi',
          url: '/dashboard/analytics/customers',
        },
        {
          title: 'Ürün Analizi',
          url: '/dashboard/analytics/products',
        },
        {
          title: 'Pazarlama Analizi',
          url: '/dashboard/analytics/marketing',
        }
      ],
    },
    {
      title: 'Raporlar',
      url: '/dashboard/reports',
      icon: FileText,
      isActive: currentPath.startsWith('/dashboard/reports'),
      items: [
        {
          title: 'Satış Raporları',
          url: '/dashboard/reports/sales',
        },
        {
          title: 'Müşteri Raporları',
          url: '/dashboard/reports/customers',
        },
        {
          title: 'Ürün Raporları',
          url: '/dashboard/reports/products',
        },
        {
          title: 'Finansal Raporlar',
          url: '/dashboard/reports/financial',
        }
      ],
    },
    {
      title: 'İşletme',
      url: '/dashboard/business',
      icon: Building2,
      isActive: currentPath.startsWith('/dashboard/business'),
      items: [
        {
          title: 'İşletme Profili',
          url: '/dashboard/business/profile',
        },
        {
          title: 'İşletme Ayarları',
          url: '/dashboard/business/settings',
        },
        {
          title: 'Çalışanlar',
          url: '/dashboard/business/employees',
        },
        {
          title: 'Şubeler',
          url: '/dashboard/business/branches',
        }
      ],
    },
    {
      title: 'Pazarlama',
      url: '/dashboard/marketing',
      icon: Send,
      isActive: currentPath.startsWith('/dashboard/marketing'),
      items: [
        {
          title: 'Kampanyalar',
          url: '/dashboard/marketing/campaigns',
        },
        {
          title: 'E-posta Pazarlama',
          url: '/dashboard/marketing/email',
        },
        {
          title: 'SMS Pazarlama',
          url: '/dashboard/marketing/sms',
        },
        {
          title: 'Sosyal Medya',
          url: '/dashboard/marketing/social',
        }
      ],
    },
    {
      title: 'Ayarlar',
      url: '/dashboard/settings',
      icon: Settings2,
      isActive: currentPath.startsWith('/dashboard/settings'),
      items: [
        {
          title: 'Profil',
          url: '/dashboard/settings',
        },
        {
          title: 'Güvenlik',
          url: '/dashboard/settings#security',
        },
        {
          title: 'Bildirimler',
          url: '/dashboard/settings#notifications',
        },
        {
          title: 'Faturalandırma',
          url: '/dashboard/settings#billing',
        },
        {
          title: 'Tercihler',
          url: '/dashboard/settings#preferences',
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

