'use client'

import {
  Bell,
  ChevronsUpDown,
  LogOut,
  Settings,
  User,
  Moon,
  Sun,
  Plus,
  Check,
  Users,
} from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import {
  selectAccounts,
  selectActiveAccount,
  setActiveAccount,
  removeAccount,
} from '@/store/accountsSlice'

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
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
import Link from 'next/link'

export function NavUser() {
  const { isMobile } = useSidebar()
  const { toast } = useToast()
  const { data: session, update } = useSession()
  const { setTheme } = useTheme()
  const router = useRouter()
  const dispatch = useDispatch()

  const accounts = useSelector(selectAccounts)
  const activeAccount = useSelector(selectActiveAccount)

  const handleLogout = async () => {
    try {
      toast({
        title: 'Çıkış yapılıyor...',
      })

      if (session?.user?.accessToken) {
        await logout(session.user.accessToken)
      }

      // Remove account from Redux store
      if (activeAccount) {
        dispatch(removeAccount(activeAccount.id))
      }

      // If there are other accounts, switch to the first one
      if (accounts.length > 1) {
        const nextAccount = accounts.find((acc) => acc.id !== activeAccount?.id)
        if (nextAccount) {
          dispatch(setActiveAccount(nextAccount.id))
          // Re-login with next account
          await signIn('credentials', {
            email: nextAccount.email,
            password: '', // You might need to handle this differently
            redirect: false,
          })
          return
        }
      }

      // If no other accounts, sign out completely
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

  const handleAccountSwitch = async (accountId: string) => {
    try {
      const targetAccount = accounts.find((acc) => acc.id === accountId)
      if (!targetAccount) return

      // First update Redux store
      dispatch(setActiveAccount(accountId))

      // Update NextAuth.js session
      await update({
        ...targetAccount,
        id: targetAccount.id,
        email: targetAccount.email,
        name: targetAccount.name,
        surname: targetAccount.surname,
        phoneNumber: targetAccount.phoneNumber,
        username: targetAccount.username,
        accessToken: targetAccount.accessToken,
        refreshToken: targetAccount.refreshToken,
        expiresIn: targetAccount.expiresIn,
        roles: targetAccount.roles,
        permissions: targetAccount.permissions,
      })

      toast({
        title: 'Hesap değiştirildi',
        description: `${targetAccount.name} hesabına geçiş yapıldı.`,
      })
    } catch (error) {
      console.error('Account switch error:', error)
      toast({
        variant: 'destructive',
        title: 'Hesap değiştirme başarısız',
        description: 'Bir hata oluştu. Lütfen tekrar deneyin.',
      })
    }
  }

  const handleAddAccount = () => {
    router.push('/auth/sign-in?mode=add')
  }

  // If no accounts, don't render the user menu
  if (accounts.length === 0) return null

  const otherAccounts = accounts.filter((acc) => acc.id !== activeAccount?.id)

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
                <AvatarImage
                  src={activeAccount?.avatar}
                  alt={activeAccount?.name}
                />
                <AvatarFallback className="rounded-lg">
                  {activeAccount?.name && activeAccount?.surname
                    ? `${activeAccount.name[0]}${activeAccount.surname[0]}`
                    : activeAccount?.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeAccount?.name && activeAccount?.surname
                    ? `${activeAccount.name} ${activeAccount.surname}`
                    : activeAccount?.name}
                </span>
                <span className="truncate text-xs">{activeAccount?.email}</span>
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
                  <AvatarImage
                    src={activeAccount?.avatar}
                    alt={activeAccount?.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {activeAccount?.name && activeAccount?.surname
                      ? `${activeAccount.name[0]}${activeAccount.surname[0]}`
                      : activeAccount?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeAccount?.name && activeAccount?.surname
                      ? `${activeAccount.name} ${activeAccount.surname}`
                      : activeAccount?.name}
                  </span>
                  <span className="truncate text-xs">
                    {activeAccount?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {otherAccounts.length > 0 && (
              <>
                <DropdownMenuGroup>
                  {otherAccounts.map((account) => (
                    <DropdownMenuItem
                      key={account.id}
                      onClick={() => handleAccountSwitch(account.id)}
                    >
                      <Avatar className="h-4 w-4 mr-2">
                        <AvatarImage src={account.avatar} />
                        <AvatarFallback>
                          {account.name && account.surname
                            ? `${account.name[0]}${account.surname[0]}`
                            : account.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      {account.name && account.surname
                        ? `${account.name} ${account.surname}`
                        : account.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/settings/profile">
                  <User className="text-muted-foreground" />
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/accounts">
                  <Users className="text-muted-foreground" />
                  Hesap Yönetimi
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  Tema
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    Açık
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Koyu
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('system')}>
                    Sistem
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem onClick={handleAddAccount}>
                <Plus className="text-muted-foreground" />
                Hesap Ekle
              </DropdownMenuItem>
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
