/**
 * OrdersTable Component
 *
 * Temel Özellikler:
 * - Sipariş listesini tablo halinde gösterir
 * - Server-side arama ve filtreleme
 * - Sipariş detaylarını genişletme (expand/collapse)
 * - Çağrı merkezi notları yönetimi
 * - Bayi notları yönetimi
 * - Ödeme türü ve sipariş durumu gösterimi
 *
 * @component
 */
import React, { useState, useEffect } from 'react'
import { Order } from '@/types/models'
import { Column } from '@/types'
import { BaseTable } from '@/ui/table'
import { formatCurrency, formatDate } from '@/utils/formatters/formatters'
import Link from 'next/link'
import { OrderStatusID, PaymentTypeID } from '@/types/enums'
import formatPhoneNumber from '@/utils/helpers/regex'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  where,
} from '@firebase/firestore'
import { db } from '@/lib/firebase'
import NoteHistoryModal from '@/components/callcenter/NoteHistoryModal'
import _ from 'lodash'
import { useQuery, useMutation } from '@apollo/client'
import {
  GET_PURCHASE_ORDER_DETAILS,
  ASSIGN_DEALER_TO_ORDER,
} from '@/graphql/queries/purchaseOrders'
import {
  GET_ASSIGNABLE_DEALERS_BY_ADDRESS_MATCHING,
  GET_ORDERS_WITH_SEARCH,
  GET_ORDERS_WITHOUT_SEARCH,
} from '@/graphql/queries/orders'
import { useOrders } from '@/hooks/useOrders'

// Tip tanımlamaları
interface OrdersTableProps {
  orders: Order[]
  isLoading: boolean
  error: any
  totalOrderCount: number
  searchTerm: string
  onSearchChange: (value: string) => void
  activePageNo: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (size: number) => void
  statusFilter: any
  startDate: string
  endDate: string
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
}

export default function OrdersTable({
  orders,
  isLoading,
  error,
  totalOrderCount,
  searchTerm,
  onSearchChange,
  activePageNo,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  statusFilter,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: OrdersTableProps) {
  // #region STATE MANAGEMENT
  const { data: session } = useSession()
  const [callCenterNote, setCallCenterNote] = useState('')
  const [callCenterNotes, setCallCenterNotes] = useState<{
    [key: number]: any[]
  }>({})
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null)
  const [activeModalOrderId, setActiveModalOrderId] = useState<number | null>(
    null,
  )
  const [expandedDealerNotes, setExpandedDealerNotes] = useState<{
    [key: number]: any[]
  }>({})
  // #endregion

  // #region QUERIES
  const { data: orderDetails, loading: orderDetailsLoading } = useQuery(
    GET_PURCHASE_ORDER_DETAILS,
    {
      variables: { orderId: expandedOrderId },
      skip: !expandedOrderId,
    },
  )

  const { data: assignableDealers, loading: assignableDealersLoading } =
    useQuery(GET_ASSIGNABLE_DEALERS_BY_ADDRESS_MATCHING, {
      variables: {
        provinceId: expandedOrderId
          ? orders.find((o) => o.OrderID === expandedOrderId)?.Customer
              ?.CustomerAdresses[0]?.IL?.Id
          : null,
        countyId: expandedOrderId
          ? orders.find((o) => o.OrderID === expandedOrderId)?.Customer
              ?.CustomerAdresses[0]?.Ilce?.Id
          : null,
        neighborhoodId: expandedOrderId
          ? orders.find((o) => o.OrderID === expandedOrderId)?.Customer
              ?.CustomerAdresses[0]?.Neighborhoods?.NeighborhoodID
          : null,
      },
      skip: !expandedOrderId,
    })

  const { refetch } = useOrders({
    searchTerm,
    activePageNo,
    itemsPerPage,
    statusFilter,
    startDate,
    endDate,
  })

  const [assignDealerToOrder] = useMutation(ASSIGN_DEALER_TO_ORDER, {
    refetchQueries: [
      {
        query: GET_PURCHASE_ORDER_DETAILS,
        variables: { orderId: expandedOrderId },
      },
    ],
    onCompleted: (data) => {
      if (data.update_PurchaseOrders?.affected_rows > 0) {
        toast.success('Bayi ataması başarıyla gerçekleşti')
        refetch()
      } else {
        toast.error('Bayi ataması yapılamadı. Lütfen tekrar deneyin.')
      }
    },
    onError: (error) => {
      toast.error(`Bayi atama işlemi başarısız: ${error.message}`)
    },
  })
  // #endregion

  // #region CONSTANTS
  /**
   * Ödeme türlerine göre badge stilleri ve metinleri
   */
  const paymentTypeMap = {
    [PaymentTypeID.CASH_ON_DELIVERY]: 'badge-light',
    [PaymentTypeID.CREDIT_CARD]: 'badge-light',
    [PaymentTypeID.MASTERPASS]: 'badge-light',
    [PaymentTypeID.HEPSIBURADA]: 'badge-warning',
    [PaymentTypeID.GETIR]: 'badge-info',
    [PaymentTypeID.TRENDYOL]: 'badge-warning',
  }

  const paymentTypeText = {
    [PaymentTypeID.CASH_ON_DELIVERY]: 'Kapıda Ödeme',
    [PaymentTypeID.CREDIT_CARD]: 'Kredi Kartı',
    [PaymentTypeID.MASTERPASS]: 'Masterpass',
    [PaymentTypeID.HEPSIBURADA]: 'Hepsiburada',
    [PaymentTypeID.GETIR]: 'Getir',
    [PaymentTypeID.TRENDYOL]: 'Trendyol',
  }
  // #endregion

  // #region FIREBASE FUNCTIONS
  /**
   * Firebase koleksiyon referansını oluşturur
   */
  const getSupportHistoryRef = (orderId: number) => {
    return collection(db, `kyas-callcenter/${orderId}/supportHistory`)
  }

  /**
   * Timestamp'i Date objesine çevirir
   */
  const convertTimestampToDate = (timestamp: any) => {
    return timestamp instanceof Timestamp
      ? timestamp.toDate()
      : new Date(timestamp)
  }

  /**
   * Çağrı merkezi notu kaydeder
   */
  const saveCallCenterNote = async (orderId: number) => {
    try {
      await addDoc(getSupportHistoryRef(orderId), {
        OrderID: orderId,
        AgentEmail: session?.user?.email,
        AgentNote: callCenterNote,
        NoteDate: Timestamp.now(),
      })
      await getCallCenterNotes(orderId)
      setCallCenterNote('')
      toast.success('Not başarıyla kaydedildi')
    } catch (err) {
      console.error('Not kaydedilirken bir hata oluştu:', err)
      toast.error('Not kaydedilirken bir hata oluştu')
    }
  }

  /**
   * Çağrı merkezi notlarını getirir ve sıralar
   */
  const getCallCenterNotes = async (orderId: number) => {
    try {
      const snapshot = await getDocs(getSupportHistoryRef(orderId))
      const supportHistory = snapshot.docs.map((doc) => doc.data())
      const sortedNotes = _.orderBy(
        supportHistory,
        [(note) => convertTimestampToDate(note.NoteDate).getTime()],
        ['asc'],
      )
      return new Promise<void>((resolve) => {
        setCallCenterNotes((prev) => {
          const newState = { ...prev, [orderId]: sortedNotes }
          resolve()
          return newState
        })
      })
    } catch (error) {
      console.error('Notlar yüklenirken hata:', error)
      throw error
    }
  }

  /**
   * Bayi notlarını getirir ve sıralar
   */
  const getDealerNotesOnOrder = async (orderId: number, dealerId: number) => {
    const dealerNoteRef = collection(
      db,
      `kyas-dealer/${orderId}/deliveryHistory`,
    )
    const q = query(
      dealerNoteRef,
      where('OrderID', '==', orderId),
      where('DealerID', '==', dealerId),
    )
    try {
      const snapshot = await getDocs(q)
      const dealerNotes = snapshot.docs.map((doc) => doc.data())
      return _.orderBy(
        dealerNotes,
        [
          (note) => {
            const date =
              note.NoteDate instanceof Timestamp
                ? note.NoteDate.toDate()
                : new Date(note.NoteDate)
            return date.getTime()
          },
        ],
        ['desc'],
      )
    } catch (error) {
      console.error('Bayi notu alınırken bir hata oluştu:', error)
      return []
    }
  }
  // #endregion

  // #region EVENT HANDLERS
  /**
   * Sipariş satırını genişletir/daraltır
   */
  const handleExpand = async (orderId: number) => {
    setExpandedOrderId((currentId) => (currentId === orderId ? null : orderId))
  }
  // #endregion

  // #region TABLE COLUMNS
  /**
   * Tablo kolonlarının tanımı
   */
  const columns: Column<Order>[] = [
    // Bayi Bilgileri Butonu
    {
      key: 'expand' as keyof Order,
      title: 'Bayi Bilgileri',
      visible: true,
      render: (order) => (
        <button
          type="button"
          className={`btn btn-outline ${order.CustomPurchaseOrders?.CustomerID ? 'btn-primary' : 'btn-warning'} btn-sm`}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleExpand(order.OrderID)
          }}
        >
          {order.CustomPurchaseOrders?.CustomerID
            ? 'Bayi Bilgilerini Görüntüle'
            : 'Henüz Bayi Atanamamış'}
        </button>
      ),
    },
    // Sipariş Numarası ve Ödeme Türü
    {
      key: 'OrderNumber',
      title: 'Sipariş No',
      visible: true,
      render: (order) => (
        <div className="flex flex-col">
          <Link
            href={`/dashboard/orders/${order.OrderID}`}
            className="text-sm font-medium text-gray-900 hover:text-primary-active mb-px"
          >
            {order.OrderID}
          </Link>

          {order.OrderPaymentDetails?.[0]?.PaymentTypeID && (
            <span
              className={`badge ${paymentTypeMap[order.OrderPaymentDetails[0].PaymentTypeID]} badge-xs mt-1`}
            >
              {paymentTypeText[order.OrderPaymentDetails[0].PaymentTypeID]}
            </span>
          )}
        </div>
      ),
    },
    // Müşteri Bilgileri
    {
      key: 'Customer',
      title: 'Müşteri',
      visible: true,
      render: (order) => (
        <div className="flex flex-col">
          <Link
            href={`/dashboard/orders/${order.OrderID}`}
            className="text-sm font-medium text-gray-900 hover:text-primary-active mb-px"
          >
            {order.Customer.Title}
          </Link>

          <a className="link" href={`tel:${order.Customer.PhoneNumber}`}>
            {formatPhoneNumber(order.Customer.PhoneNumber)}
          </a>
          {/* <span className="badge badge-primary badge-xs">İlk Sipariş</span> */}
        </div>
      ),
    },
    // Sipariş Tarihi
    {
      key: 'OrderDate',
      title: 'Sipariş Tarihi',
      visible: true,
      render: (order) => formatDate(order.OrderDate),
    },
    // Teslimat Tarihi ve Gecikme Durumu
    {
      key: 'DeliveryDate',
      title: 'Teslimat Tarihi',
      visible: true,
      render: (order) => {
        const isDeliveryDelayed =
          moment().diff(moment(order.DeliveryDate), 'minutes') > 0

        return (
          <div className="flex flex-col">
            <span>{formatDate(order.DeliveryDate)}</span>
            {isDeliveryDelayed && (
              <span className="label ki-pulse ki-pulse-warning mr-10">
                <span className="position-relative badge badge-outline badge-danger badge-xs">
                  Sipariş Teslimi Gecikti
                </span>
                <span className="ki-pulse-ring"></span>
              </span>
            )}
          </div>
        )
      },
    },
    // Sipariş Tutarı
    {
      key: 'GrandTotalWithVatRate',
      title: 'Tutar',
      visible: true,
      render: (order) => formatCurrency(order.GrandTotalWithVatRate),
    },
    // Sipariş Durumu
    {
      key: 'OrderStatusID',
      title: 'Durum',
      visible: true,
      render: (order) => {
        const statusMap = {
          [OrderStatusID.Yeni]: 'badge-primary',
          [OrderStatusID.Yolda]: 'badge-warning',
          [OrderStatusID.TeslimEdildi]: 'badge-success',
          [OrderStatusID.Iptal]: 'badge-danger',
          [OrderStatusID.OdemeBasarisiz]: 'badge-danger',
          [OrderStatusID.TeslimEdilemedi]: 'badge-danger',
        }

        const statusText = {
          [OrderStatusID.Yeni]: 'Yeni',
          [OrderStatusID.Yolda]: 'Yolda',
          [OrderStatusID.TeslimEdildi]: 'Teslim Edildi',
          [OrderStatusID.Iptal]: 'İptal',
          [OrderStatusID.OdemeBasarisiz]: 'Ödeme Başarısız',
          [OrderStatusID.TeslimEdilemedi]: 'Teslim Edilemedi',
        }

        return (
          <span
            className={`badge badge-outline ${statusMap[order.OrderStatusID]}`}
          >
            {statusText[order.OrderStatusID]}
          </span>
        )
      },
    },
    // İşlem Menüsü
    {
      key: 'actions',
      title: 'İşlemler',
      visible: true,
      render: (order) => (
        <div className="menu flex-inline" data-menu="true">
          <div
            className="menu-item"
            data-menu-item-offset="0, 10px"
            data-menu-item-placement="bottom-end"
            data-menu-item-toggle="dropdown"
            data-menu-item-trigger="click|lg:click"
          >
            <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
              <i className="ki-filled ki-dots-vertical"></i>
            </button>
            <div
              className="menu-dropdown menu-default w-full max-w-[175px]"
              data-menu-dismiss="true"
            >
              <div className="menu-item">
                <Link
                  className="menu-link"
                  href={`/dashboard/orders/${order.OrderID}`}
                >
                  <span className="menu-icon">
                    <i className="ki-filled ki-eye"></i>
                  </span>
                  <span className="menu-title">Detay</span>
                </Link>
              </div>
              <div className="menu-item">
                <a
                  className="menu-link"
                  data-modal-toggle={`#call_center_chat_history_${order.OrderID}`}
                  onClick={async (e) => {
                    try {
                      getCallCenterNotes(order.OrderID)
                      setActiveModalOrderId(order.OrderID)
                      setCallCenterNote('')
                    } catch (error) {
                      console.error('Notlar yüklenirken hata:', error)
                      toast.error('Notlar yüklenirken bir hata oluştu')
                    }
                  }}
                >
                  <span className="menu-icon">
                    <i className="ki-filled ki-note-2"></i>
                  </span>
                  <span className="menu-title">Notlar</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]
  // #endregion

  // #region RENDER FUNCTIONS
  /**
   * Genişletilmiş satır içeriğini render eder
   */
  const renderExpandedContent = (order: Order) => {
    const isExpanded = expandedOrderId === order.OrderID
    if (!isExpanded) return null

    if (orderDetailsLoading) {
      return (
        <tr>
          <td
            colSpan={columns.filter((col) => col.visible).length}
            className="p-0"
          >
            <div className="p-4">Bayi bilgileri yükleniyor...</div>
          </td>
        </tr>
      )
    }

    console.log(order.Customer.CustomerAdresses[0])

    const details = orderDetails?.PurchaseOrders?.[0]

    if (!details?.Customer) {
      const currentOrder = orders.find((o) => o.OrderID === order.OrderID)
      const addressInfo = currentOrder?.Customer?.CustomerAdresses[0]

      console.log('Adres Bilgileri:', {
        IL: addressInfo?.IL?.Id,
        Ilce: addressInfo?.Ilce?.Id,
        Neighborhood: addressInfo?.Neighborhoods?.NeighborhoodID,
      })

      console.log('Atanabilir Bayiler:', assignableDealers)

      return (
        <tr>
          <td
            colSpan={columns.filter((col) => col.visible).length}
            className="p-0"
          >
            <div className="p-4">
              {assignableDealersLoading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Yükleniyor...</span>
                </div>
              ) : assignableDealers?.AddressMatchings?.length > 0 ? (
                <select
                  className="select"
                  onChange={(e) => {
                    const selectedDealerId = parseInt(e.target.value)
                    if (selectedDealerId) {
                      const selectedDealer =
                        assignableDealers?.AddressMatchings?.find(
                          (dealer: any) =>
                            dealer.CustomerID === selectedDealerId,
                        )

                      if (selectedDealer) {
                        assignDealerToOrder({
                          variables: {
                            orderId: order.OrderID,
                            customerId: selectedDealer.CustomerID,
                            customerAddressId:
                              selectedDealer.Customer.CustomerAdresses[0]
                                .CustomerAdressID,
                          },
                        })
                      }
                    }
                  }}
                >
                  <option value="">Bayi Seçin</option>
                  {assignableDealers.AddressMatchings.map((dealer: any) => (
                    <option key={dealer.CustomerID} value={dealer.CustomerID}>
                      {dealer.Customer.Title}
                    </option>
                  ))}
                </select>
              ) : (
                <div>Bu bölgede atanabilecek bayi bulunmamaktadır.</div>
              )}
            </div>
          </td>
        </tr>
      )
    }

    const notes = expandedDealerNotes[order.OrderID] || []

    return (
      <tr>
        <td
          colSpan={columns.filter((col) => col.visible).length}
          className="p-0"
        >
          <div className="p-4">
            <h6 className="text-gray-900 font-medium mb-4">
              Teslimatı Yapacak Bayi Bilgileri
            </h6>
            <table className="table table-sm table-row-bordered">
              <tbody>
                <tr>
                  <td className="fw-bold w-200px">Bayi:</td>
                  <td>{details.Customer.Title}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Telefon:</td>
                  <td>{formatPhoneNumber(details.Customer.PhoneNumber)}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Adres:</td>
                  <td>{details.CustomerAdress.FullAddress}</td>
                </tr>
                <tr>
                  <td className="fw-bold">İl:</td>
                  <td>{details.CustomerAdress.IL.IlAd}</td>
                </tr>
                <tr>
                  <td className="fw-bold">İlçe:</td>
                  <td>{details.CustomerAdress.Ilce.IlceAd}</td>
                </tr>
                {details.CustomerAdress.Neighborhoods?.NeighborhoodName && (
                  <tr>
                    <td className="fw-bold">Mahalle:</td>
                    <td>
                      {details.CustomerAdress.Neighborhoods.NeighborhoodName}
                    </td>
                  </tr>
                )}
                {/* Bayi Notları satırı */}
                <tr>
                  <td className="fw-bold">Bayi Notları:</td>
                  <td>
                    {notes.length > 0 ? (
                      <div className="space-y-2">
                        {notes.map((note, index) => (
                          <div
                            key={index}
                            className="border-b pb-2 last:border-b-0"
                          >
                            <div className="text-sm text-gray-600">
                              {formatDate(
                                note.NoteDate instanceof Timestamp
                                  ? note.NoteDate.toDate()
                                  : note.NoteDate,
                              )}
                            </div>
                            <div className="text-sm">{note.Note}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500">
                        Bayi notu bulunmamaktadır.
                      </span>
                    )}
                  </td>
                </tr>
                {/* Bayi Değiştir satırı - her zaman göster */}
                <tr>
                  <td className="fw-bold">Bayi Değiştir:</td>
                  <td>
                    {assignableDealersLoading ? (
                      <div
                        className="spinner-border spinner-border-sm text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Yükleniyor...</span>
                      </div>
                    ) : assignableDealers?.AddressMatchings?.length > 0 ? (
                      <select
                        className="select select-md w-full"
                        onChange={(e) => {
                          const selectedDealerId = parseInt(e.target.value)
                          if (selectedDealerId) {
                            const selectedDealer =
                              assignableDealers?.AddressMatchings?.find(
                                (dealer: any) =>
                                  dealer.CustomerID === selectedDealerId,
                              )
                            if (selectedDealer) {
                              assignDealerToOrder({
                                variables: {
                                  orderId: order.OrderID,
                                  customerId: selectedDealer.CustomerID,
                                  customerAddressId:
                                    selectedDealer.Customer.CustomerAdresses[0]
                                      .CustomerAdressID,
                                },
                              })
                            }
                          }
                        }}
                      >
                        <option value="">Bayi Seçin</option>
                        {assignableDealers.AddressMatchings.map(
                          (dealer: any) => (
                            <option
                              key={dealer.CustomerID}
                              value={dealer.CustomerID}
                              selected={
                                dealer.CustomerID ===
                                details.Customer.CustomerID
                              }
                            >
                              {dealer.Customer.Title}
                            </option>
                          ),
                        )}
                      </select>
                    ) : (
                      <span className="text-gray-500">
                        Bu bölgede atanabilecek bayi bulunmamaktadır.
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    )
  }
  // #endregion

  // #region EFFECTS
  /**
   * Sipariş genişletildiğinde bayi notlarını yükler
   */
  useEffect(() => {
    const loadNotes = async () => {
      if (expandedOrderId && orderDetails?.PurchaseOrders?.[0]?.Customer) {
        const notes = await getDealerNotesOnOrder(
          expandedOrderId,
          orderDetails.PurchaseOrders[0].Customer.CustomerID,
        )
        setExpandedDealerNotes((prev) => ({
          ...prev,
          [expandedOrderId]: notes,
        }))
      }
    }
    loadNotes()
  }, [expandedOrderId, orderDetails])
  // #endregion

  // #region RENDER
  return (
    <>
      <BaseTable
        data={orders}
        columns={columns}
        keyExtractor={(order) => order.OrderID?.toString() || ''}
        searchTerm={searchTerm}
        onSearchChange={(value) => onSearchChange(value)}
        searchPlaceholder="Sipariş ara"
        searchableFields={[
          'OrderNumber',
          'Customer.Title',
          'Customer.PhoneNumber',
          'DeliveryInformation',
        ]}
        activePageNo={activePageNo}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
        totalCount={totalOrderCount}
        statusFilter={statusFilter}
        isLoading={isLoading}
        error={error}
        entityName="Siparişler"
        isServerSide={true}
        dateInputs={{
          startDate,
          endDate,
          onStartDateChange,
          onEndDateChange,
        }}
        renderExpandedContent={renderExpandedContent}
      />

      {activeModalOrderId && (
        <NoteHistoryModal
          callCenterNotes={callCenterNotes[activeModalOrderId] || []}
          order={orders.find((o) => o.OrderID === activeModalOrderId)!}
          saveCallCenterNote={saveCallCenterNote}
          setCallCenterNote={(note) => setCallCenterNote(note ?? '')}
        />
      )}
    </>
  )
  // #endregion
}
