import { useState } from 'react'
import { OrdersTable } from '@/components/table/'
import { OrderStatusID } from '@/types/enums'
import moment from 'moment'
import { useOrders } from '@/hooks/useOrders'

/**
 * Siparişler sayfası komponenti
 * Sipariş listesini görüntüler, filtreleme ve arama özelliklerini sağlar
 */
const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activePageNo, setActivePageNo] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [statusFilter, setStatusFilter] = useState({
    value: OrderStatusID.Yeni,
    onChange: (value: OrderStatusID) =>
      setStatusFilter((prev) => ({ ...prev, value })),
    options: [
      { value: OrderStatusID.Yeni, label: 'Yeni' },
      { value: OrderStatusID.Yolda, label: 'Yolda' },
      { value: OrderStatusID.TeslimEdildi, label: 'Teslim Edildi' },
      { value: OrderStatusID.Iptal, label: 'İptal' },
      { value: OrderStatusID.OdemeBasarisiz, label: 'Ödeme Başarısız' },
      { value: OrderStatusID.TeslimEdilemedi, label: 'Teslim Edilemedi' },
    ],
  })
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(
    moment().add(1, 'days').format('YYYY-MM-DD'),
  )

  const { orders, totalOrderCount, loading, error, refetch } = useOrders({
    searchTerm,
    activePageNo,
    itemsPerPage,
    statusFilter,
    startDate,
    endDate,
  })

  return (
    <OrdersTable
      orders={orders}
      isLoading={loading}
      error={error}
      totalOrderCount={totalOrderCount}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      activePageNo={activePageNo}
      itemsPerPage={itemsPerPage}
      onPageChange={setActivePageNo}
      onItemsPerPageChange={setItemsPerPage}
      statusFilter={statusFilter}
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={setStartDate}
      onEndDateChange={setEndDate}
    />
  )
}

// Sayfa meta verileri
OrdersPage.title = 'Siparişler'
OrdersPage.breadcrumbs = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Siparişler' },
]

export default OrdersPage
