import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_CUSTOMER } from '@/graphql/queries/users'
import { toast } from 'sonner'
import { BaseDetailCard } from '@/ui/card'
import { getCustomerSections } from '@/utils/helpers/customer'

const CustomerDetailPage = () => {
  const router = useRouter()
  const { slug } = router.query
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({})

  const { data, loading, error } = useQuery(GET_CUSTOMER, {
    variables: { CustomerID: parseInt(slug as string) },
    skip: !slug,
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setIsLoading(false)
      setFormData(data?.Customer?.[0] || {})
      toast.success('Müşteri bilgileri başarıyla yüklendi')
    },
    onError: (error) => {
      setIsLoading(false)
      toast.error(`Hata: ${error.message}`)
    },
  })

  const detailSections = getCustomerSections()

  if (loading) return null
  if (error) return null

  return (
    <BaseDetailCard
      title="Müşteri Detay"
      sections={detailSections}
      data={formData}
      loading={isLoading}
      isNew={false}
      onChange={() => {}}
    />
  )
}

CustomerDetailPage.title = 'Müşteri Detay'
CustomerDetailPage.breadcrumbs = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Müşteriler', href: '/dashboard/customers' },
  { label: 'Müşteri Detay' },
]
CustomerDetailPage.hasDetailPageActions = true
CustomerDetailPage.isHaveSaveButton = false
CustomerDetailPage.sections = getCustomerSections().map((section) => ({
  title: section.title,
  id: section.id,
}))

export default CustomerDetailPage // Add static properties
