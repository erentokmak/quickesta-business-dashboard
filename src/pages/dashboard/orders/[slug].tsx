import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_ORDER } from '@/graphql/queries/orders'
import { toast } from 'sonner'
import { BaseDetailCard } from '@/ui/card'
import { getOrderSections, getInitialOrderData } from '@/utils/helpers/order'

const OrderDetailPage = () => {
  const router = useRouter()
  const { slug } = router.query
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState(getInitialOrderData())

  const { data, loading, error } = useQuery(GET_ORDER, {
    variables: { OrderID: parseInt(slug as string) },
    skip: !slug,
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setIsLoading(false)
      setFormData(data?.Orders?.[0] || {})
      toast.success('Sipariş bilgileri başarıyla yüklendi')
    },
    onError: (error) => {
      setIsLoading(false)
      toast.error(`Hata: ${error.message}`)
    },
  })

  const detailSections = getOrderSections()

  if (loading) return null
  if (error) return null

  return (
    <BaseDetailCard
      title="Sipariş Detay"
      sections={detailSections}
      data={formData}
      loading={isLoading}
      isNew={false}
      onChange={() => {}}
    />
  )
}

OrderDetailPage.title = 'Sipariş Detay'
OrderDetailPage.breadcrumbs = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Siparişler', href: '/dashboard/orders' },
  { label: 'Sipariş Detay' },
]
OrderDetailPage.hasDetailPageActions = true
OrderDetailPage.isHaveSaveButton = false
OrderDetailPage.sections = getOrderSections().map((section) => ({
  title: section.title,
  id: section.id,
}))

export default OrderDetailPage
