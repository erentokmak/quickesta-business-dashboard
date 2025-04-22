import { useQuery } from "@apollo/client"
import { GET_USER_BUSINESSES, GetUserBusinessesResponse, GetUserBusinessesVariables } from "@/graphql/queries/business"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import { Building2, Mail, Phone } from "lucide-react"
import { useSession } from "next-auth/react"

export function BusinessCards() {
  const { data: session } = useSession()
  const { data, loading, error } = useQuery<GetUserBusinessesResponse, GetUserBusinessesVariables>(
    GET_USER_BUSINESSES,
    {
      variables: {
        owner_id: session?.user?.id as string
      },
      skip: !session?.user?.id
    }
  )

  if (loading) {
    return <div>Yükleniyor...</div>
  }

  if (error) {
    return <div>Bir hata oluştu: {error.message}</div>
  }

  if (!data?.businesses.length) {
    return <div>Henüz işletme bulunmuyor.</div>
  }

  return (
    <div className="space-y-4">
      {data.businesses.map((business) => (
        <Card key={business.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {business.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {business.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {business.phone}
              </div>
              <div className="text-sm text-muted-foreground">
                {business.address}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 