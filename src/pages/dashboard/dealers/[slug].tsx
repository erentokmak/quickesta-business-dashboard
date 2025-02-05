import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client'
import { GET_DEALER } from '@/graphql/queries/users'
import { UPDATE_DEALER } from '@/graphql/mutations/users'
import { DetailField } from '@/types/components/forms/detail'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { toast } from 'sonner'
import { BaseDetailCard } from '@/ui/card'
import { createFormChangeHandler } from '@/utils/helpers/form'
import { useSession } from 'next-auth/react'
import {
  getInitialDealerData,
  getDealerSections,
  DealerFieldTypes,
} from '@/utils/helpers/dealer'

const saveRef = { current: null as (() => Promise<void>) | null }

const DealerDetailPage = () => {
  const router = useRouter()
  const { slug } = router.query
  const { data: session } = useSession()

  // State
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState(getInitialDealerData())

  // Queries
  const { data, loading, error } = useQuery(GET_DEALER, {
    variables: { CustomerID: parseInt(slug as string) },
    skip: !slug,
    fetchPolicy: 'network-only',
  })

  // Mutations
  const [updateDealer] = useMutation(UPDATE_DEALER)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDelete = async () => {
    try {
      //await deleteDealer({
      //variables: { dealerId: parseInt(slug as string) },
      //})
      toast.success('Bayi silindi')
      //router.push('/dashboard/dealers')
    } catch (error) {
      toast.error('Hata oluştu')
    }
  }

  const handleChange = createFormChangeHandler(setFormData, DealerFieldTypes)

  const handleSave = useCallback(async () => {
    try {
      const now = new Date().toISOString()
      const currentUser = parseInt(session?.user?.id || '0')

      const dealerInput = {
        IsEInvoice: formData.IsEInvoice,
        IsPassive: formData.IsPassive,
        UpdateDate: now,
        UpdateUser: currentUser,
        OperationType: 2,
        OperationDate: now,
      }

      await updateDealer({
        variables: {
          customerId: parseInt(slug as string),
          input: dealerInput,
        },
      })

      toast.success('Değişiklikler kaydedildi')
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Bayi bilgileri kaydedilirken bir hata oluştu')
    }
  }, [formData, updateDealer, slug, session])

  // Update saveRef when handleSave changes
  useEffect(() => {
    saveRef.current = handleSave
  }, [handleSave])

  // Load initial data
  useEffect(() => {
    if (data?.Customer?.[0]) {
      setFormData({
        ...getInitialDealerData(),
        ...data.Customer[0],
      })
    }
    setIsLoading(loading)
  }, [data, loading])

  const detailSections = useMemo(
    () => getDealerSections(false, handleDelete),
    [handleDelete],
  )

  return (
    <BaseDetailCard
      title="Bayi Detay"
      sections={detailSections}
      data={formData}
      loading={isLoading}
      onChange={handleChange}
      onSave={handleSave}
    />
  )
}

// Add static properties
DealerDetailPage.title = 'Bayi Detay'
DealerDetailPage.breadcrumbs = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Bayiler', href: '/dashboard/dealers' },
  { label: 'Bayi Detay' },
]
DealerDetailPage.hasDetailPageActions = true
DealerDetailPage.isHaveSaveButton = true
DealerDetailPage.sections = getDealerSections(false, async () => {}).map(
  (section) => ({
    title: section.title,
    id: section.id,
  }),
)
DealerDetailPage.onSave = () => saveRef.current?.()

export default DealerDetailPage
