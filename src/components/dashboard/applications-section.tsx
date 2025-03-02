import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Button } from '@/ui/button'
import { ExternalLink } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

interface Application {
  id: string
  name: string
  description: string
  url: string
  icon: React.ReactNode
}

export function ApplicationsSection() {
  const { data: session } = useSession()
  const router = useRouter()

  const applications: Application[] = [
    {
      id: 'visa',
      name: 'Quickesta Visa',
      description: 'Vize başvuru ve takip sistemi',
      url: 'https://dashboard.visa.quickesta.com',
      icon: <ExternalLink className="h-5 w-5" />,
    },
    // Diğer uygulamalar buraya eklenebilir
  ]

  const handleApplicationClick = (app: Application) => {
    if (!session) return

    // JWT token'ı alıyoruz
    const token = session.user?.accessToken

    // Hedef URL'i oluşturuyoruz ve token'ı query parametresi olarak ekliyoruz
    const targetUrl = `${app.url}/auth/sso?token=${encodeURIComponent(token || '')}&redirect=/dashboard`
    
    // Yeni pencerede açıyoruz
    window.open(targetUrl, '_blank')
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Uygulamalar</CardTitle>
        <CardDescription>
          Quickesta ekosistemindeki diğer uygulamalara erişin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((app) => (
            <Card key={app.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 flex items-center justify-between" onClick={() => handleApplicationClick(app)}>
                <div>
                  <h3 className="font-medium">{app.name}</h3>
                  <p className="text-sm text-muted-foreground">{app.description}</p>
                </div>
                <Button variant="ghost" size="icon">
                  {app.icon}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 