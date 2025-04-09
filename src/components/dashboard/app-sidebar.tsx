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
      url: '/',
      icon: Home,
      isActive: currentPath === '/',
      items: [
        {
          title: 'Ana Sayfa',
          url: '/',
        },
        {
          title: 'İstatistikler',
          url: '/analytics',
        }
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
          title: 'Müşteri Grupları',
          url: '/customers/groups',
        },
        {
          title: 'Müşteri Segmentleri',
          url: '/customers/segments',
        },
        {
          title: 'Müşteri Davranışları',
          url: '/customers/behaviors',
        }
      ],
    },
    {
      title: 'Siparişler',
      url: '/orders',
      icon: ShoppingCart,
      isActive: currentPath.startsWith('/orders'),
      items: [
        {
          title: 'Tüm Siparişler',
          url: '/orders',
        },
        {
          title: 'Bekleyen Siparişler',
          url: '/orders/pending',
        },
        {
          title: 'Tamamlanan Siparişler',
          url: '/orders/completed',
        },
        {
          title: 'İptal Edilen Siparişler',
          url: '/orders/cancelled',
        }
      ],
    },
    {
      title: 'Ürünler',
      url: '/products',
      icon: Package,
      isActive: currentPath.startsWith('/products'),
      items: [
        {
          title: 'Ürün Listesi',
          url: '/products',
        },
        {
          title: 'Kategoriler',
          url: '/products/categories',
        },
        {
          title: 'Stok Durumu',
          url: '/products/inventory',
        },
        {
          title: 'Ürün Değerlendirmeleri',
          url: '/products/reviews',
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
          title: 'Gelir Raporu',
          url: '/finance/income',
        },
        {
          title: 'Gider Raporu',
          url: '/finance/expenses',
        },
        {
          title: 'Kâr/Zarar Analizi',
          url: '/finance/profit-loss',
        },
        {
          title: 'Vergi Raporu',
          url: '/finance/tax',
        }
      ],
    },
    {
      title: 'Analitik',
      url: '/analytics',
      icon: BarChart,
      isActive: currentPath.startsWith('/analytics'),
      items: [
        {
          title: 'Satış Analizi',
          url: '/analytics/sales',
        },
        {
          title: 'Müşteri Analizi',
          url: '/analytics/customers',
        },
        {
          title: 'Ürün Analizi',
          url: '/analytics/products',
        },
        {
          title: 'Pazarlama Analizi',
          url: '/analytics/marketing',
        }
      ],
    },
    {
      title: 'Raporlar',
      url: '/reports',
      icon: FileText,
      isActive: currentPath.startsWith('/reports'),
      items: [
        {
          title: 'Satış Raporları',
          url: '/reports/sales',
        },
        {
          title: 'Müşteri Raporları',
          url: '/reports/customers',
        },
        {
          title: 'Ürün Raporları',
          url: '/reports/products',
        },
        {
          title: 'Finansal Raporlar',
          url: '/reports/financial',
        }
      ],
    },
    {
      title: 'İşletme',
      url: '/business',
      icon: Building2,
      isActive: currentPath.startsWith('/business'),
      items: [
        {
          title: 'İşletme Profili',
          url: '/business/profile',
        },
        {
          title: 'İşletme Ayarları',
          url: '/business/settings',
        },
        {
          title: 'Çalışanlar',
          url: '/business/employees',
        },
        {
          title: 'Şubeler',
          url: '/business/branches',
        }
      ],
    },
    {
      title: 'Web Sitesi',
      url: '/website',
      icon: Globe,
      isActive: currentPath.startsWith('/website'),
      items: [
        {
          title: 'Site Yönetimi',
          url: '/website/manage',
        },
        {
          title: 'Tema Ayarları',
          url: '/website/theme',
        },
        {
          title: 'Sayfa Yönetimi',
          url: '/website/pages',
        },
        {
          title: 'SEO Ayarları',
          url: '/website/seo',
        }
      ],
    },
    {
      title: 'Pazarlama',
      url: '/marketing',
      icon: Send,
      isActive: currentPath.startsWith('/marketing'),
      items: [
        {
          title: 'Kampanyalar',
          url: '/marketing/campaigns',
        },
        {
          title: 'E-posta Pazarlama',
          url: '/marketing/email',
        },
        {
          title: 'SMS Pazarlama',
          url: '/marketing/sms',
        },
        {
          title: 'Sosyal Medya',
          url: '/marketing/social',
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
          title: 'Genel Ayarlar',
          url: '/settings/general',
        },
        {
          title: 'Kullanıcı Yönetimi',
          url: '/settings/users',
        },
        {
          title: 'Bildirim Ayarları',
          url: '/settings/notifications',
        },
        {
          title: 'Entegrasyonlar',
          url: '/settings/integrations',
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

