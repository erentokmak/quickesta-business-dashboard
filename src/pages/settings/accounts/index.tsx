import { useSession, signOut, signIn } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import {
  selectAccounts,
  selectActiveAccount,
  setActiveAccount,
  removeAccount,
} from '@/store/accountsSlice'

import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { PageHeader } from '@/components/layout/PageHeader'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { Button } from '@/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { logout } from '@/lib/api-v1/auth'

export default function AccountsSettingsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const dispatch = useDispatch()

  const accounts = useSelector(selectAccounts)
  const activeAccount = useSelector(selectActiveAccount)

  const handleAccountSwitch = async (accountId: string) => {
    try {
      const targetAccount = accounts.find((acc) => acc.id === accountId)
      if (!targetAccount) return

      // Re-login with the selected account
      const result = await signIn('credentials', {
        email: targetAccount.email,
        password: '', // You might need to handle this differently
        redirect: false,
      })

      if (result?.error) {
        toast({
          variant: 'destructive',
          title: 'Hesap değiştirme başarısız',
          description: 'Lütfen tekrar giriş yapın.',
        })
        return
      }

      dispatch(setActiveAccount(accountId))

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

  const handleRemoveAccount = async (accountId: string) => {
    const accountToRemove = accounts.find((acc) => acc.id === accountId)
    if (!accountToRemove) return

    try {
      // Logout from the account using its access token
      if (accountToRemove.accessToken) {
        await logout(accountToRemove.accessToken)
      }

      // If removing active account
      if (accountId === activeAccount?.id) {
        // If there are other accounts, switch to the first one
        if (accounts.length > 1) {
          const nextAccount = accounts.find((acc) => acc.id !== accountId)
          if (nextAccount) {
            // Update Redux store
            dispatch(setActiveAccount(nextAccount.id))

            // Update the session by re-authenticating with the API
            const response = await fetch('/api/auth/refresh-session', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${nextAccount.accessToken}`,
              },
            })

            if (!response.ok) {
              throw new Error('Session refresh failed')
            }
          }
        } else {
          // If this was the last account, sign out completely
          await signOut({ callbackUrl: '/auth/sign-in' })
          return
        }
      }

      // Remove account from Redux store
      dispatch(removeAccount(accountId))

      toast({
        title: 'Hesap kaldırıldı',
        description: `${accountToRemove.name} hesabı kaldırıldı.`,
      })
    } catch (error) {
      console.error('Remove account error:', error)
      toast({
        variant: 'destructive',
        title: 'Hesap kaldırma başarısız',
        description: 'Bir hata oluştu. Lütfen tekrar deneyin.',
      })
    }
  }

  const handleAddAccount = () => {
    router.push('/auth/sign-in?mode=add')
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader
          title="Hesap Yönetimi"
          items={[{ title: 'Ayarlar', href: '/settings' }]}
        />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Bağlı Hesaplar</CardTitle>
              <CardDescription>
                Hesaplarınızı görüntüleyin ve yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-end">
                <Button onClick={handleAddAccount}>Yeni Hesap Ekle</Button>
              </div>

              <div className="space-y-4">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={account.avatar} />
                        <AvatarFallback>
                          {account.name && account.surname
                            ? `${account.name[0]}${account.surname[0]}`
                            : account.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">
                            {account.name} {account.surname}
                          </p>
                          {account.id === activeAccount?.id && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                              Aktif Hesap
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {account.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {account.id !== activeAccount?.id && (
                        <Button
                          variant="outline"
                          onClick={() => handleAccountSwitch(account.id)}
                        >
                          Hesaba Geç
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        onClick={() => handleRemoveAccount(account.id)}
                      >
                        Hesabı Kaldır
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
