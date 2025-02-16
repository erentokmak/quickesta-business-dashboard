'use client'

import {
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings,
  User,
  Moon,
  Sun,
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/ui/sidebar'
import { useToast } from '@/hooks/use-toast'
import { logout } from '@/lib/api-v1/auth'

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const { toast } = useToast()
  const { data: session } = useSession()
  const { setTheme } = useTheme()

  const handleLogout = async () => {
    try {
      toast({
        title: 'Çıkış yapılıyor...',
      })

      await logout(session?.user?.accessToken as string)

      await signOut({
        callbackUrl: '/auth/sign-in',
        redirect: true,
      })
    } catch (error) {
      console.error('Logout error:', error)
      toast({
        variant: 'destructive',
        title: 'Çıkış yapılırken bir hata oluştu',
        description: 'Lütfen daha sonra tekrar deneyiniz.',
      })
    }
  }

  // If no session, don't render the user menu
  if (!session) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <a href="/profile">
                  <User className="text-muted-foreground" />
                  Profil
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <a href="/settings">
                  <Settings className="text-muted-foreground" />
                  Hesap Ayarları
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/billing">
                  <CreditCard className="text-muted-foreground" />
                  Fatura Yönetimi
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/notifications">
                  <Bell className="text-muted-foreground" />
                  Bildirimler
                </a>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  Tema
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Açık
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Koyu
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    Sistem
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-500 focus:text-red-500 focus:bg-red-50"
            >
              <LogOut className="text-red-500" />
              Çıkış Yap
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
