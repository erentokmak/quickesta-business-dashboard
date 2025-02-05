/**
 * Müşteriler Sayfası
 * - Müşteri listesi görüntüleme
 * - Server-side arama ve filtreleme
 * - Aktif/Pasif durumu filtresi
 */
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
  GET_CUSTOMERS_WITH_SEARCH,
  GET_CUSTOMERS_WITHOUT_SEARCH,
  CustomersQueryVariables,
} from '@/graphql/queries/users'
import { Customer } from '@/types/models'
import { ReferenceSourceID } from '@/types/enums'
import { toast } from 'sonner'
import CustomersTable from '@/components/table/CustomersTable'

const CustomersPage = () => {
  // Tablo state'leri
  const [customers, setCustomers] = useState<Customer[]>([])
  const [totalCustomerCount, setTotalCustomerCount] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [activePageNo, setActivePageNo] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<boolean>(false)

  // Arama terimini temizle
  const trimmedSearchTerm = searchTerm?.trim()

  // GraphQL sorgusu için değişkenler
  const variables: CustomersQueryVariables = {
    ReferenceSourceID: ReferenceSourceID.MÜŞTERİ,
    limit: itemsPerPage,
    offset: itemsPerPage * (activePageNo - 1),
    isPassive:
      typeof statusFilter === 'string' ? statusFilter === 'true' : statusFilter,
  }

  // Arama terimi varsa sorgu değişkenlerine ekle
  if (trimmedSearchTerm) {
    variables.searchTerm = `%${trimmedSearchTerm}%`
  }

  // Arama durumuna göre sorgu seç
  const { loading, error, data } = useQuery(
    trimmedSearchTerm
      ? GET_CUSTOMERS_WITH_SEARCH
      : GET_CUSTOMERS_WITHOUT_SEARCH,
    {
      variables,
      fetchPolicy: 'network-only',
    },
  )

  // Veri değişikliklerini izle
  useEffect(() => {
    if (loading) return

    if (data?.Customer) {
      setCustomers(data.Customer)
      setTotalCustomerCount(data.Customer_aggregate?.aggregate?.count)
      toast.success('Müşteriler başarıyla yüklendi')
    }

    if (error) {
      toast.error(`Hata: ${error.message}`)
    }
  }, [loading, data, error])

  return (
    <CustomersTable
      customers={customers}
      isLoading={loading}
      error={error}
      totalCount={totalCustomerCount}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      statusFilter={statusFilter}
      onStatusFilterChange={setStatusFilter}
      activePageNo={activePageNo}
      itemsPerPage={itemsPerPage}
      onPageChange={setActivePageNo}
      onItemsPerPageChange={setItemsPerPage}
    />
  )
}

CustomersPage.title = 'Müşteriler'
CustomersPage.breadcrumbs = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Müşteriler' },
]

export default CustomersPage
