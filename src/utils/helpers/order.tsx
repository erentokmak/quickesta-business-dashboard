import { DetailSection } from '@/types/components/forms/detail'
import { formatCurrency, formatDate } from '@/utils/formatters/formatters'
import formatPhoneNumber from '@/utils/helpers/regex'
import { PaymentTypeID } from '@/types'

export const getInitialOrderData = () => ({
  OrderID: 0,
  OrderNumber: '',
  CustomerID: 0,
  CustomerAdressID: 0,
  Description: '',
  DeliveryTime: '',
  DeliveryDate: '',
  DeliveryInformation: '',
  GrandTotal: 0,
  GrandTotalWithVatRate: 0,
  ErpNumber: '',
  DiscountAmount: 0,
  DiscountRate: 0,
  GrandGrossTotal: 0,
  IsSendToPool: false,
  IsClosed: false,
  Guid: '',
  OrderDate: '',
  OperationType: '',
  OperationDate: '',
  OfferID: 0,
  OfferChanceID: 0,
  IsSendToPurchaseOrder: false,
  OrderStatusID: 0,
  Customer: {
    Title: '',
    PhoneNumber: '',
    CustomerAdresses: [],
  },
  OrderDetails: [],
  OrderPaymentDetails: {
    PaymentTypeID: 0,
  },
})

export const getOrderSections = (): DetailSection[] => [
  {
    id: 'details',
    title: 'Sipariş Detayları',
    fields: [
      {
        name: 'OrderDetails',
        type: 'custom',
        disabled: true,
        customRender: (field, value) => {
          if (!value?.length) {
            return (
              <div className="text-gray-500">Sipariş detayı bulunamadı.</div>
            )
          }

          return (
            <div className="overflow-x-auto">
              <table className="table table-row-bordered table-row-gray-300 align-middle gs-0 gy-4">
                <thead>
                  <tr className="fw-bold text-muted bg-light">
                    <th>Sıra No</th>
                    <th>Açıklama</th>
                    <th>Miktar</th>
                    <th>Birim Fiyat</th>
                    <th>Toplam</th>
                  </tr>
                </thead>
                <tbody>
                  {value.map((detail: any) => (
                    <tr key={detail.OrderDetailID}>
                      <td>{detail.OrderNo}</td>
                      <td>{detail.Description}</td>
                      <td>{detail.Quantity}</td>
                      <td>{formatCurrency(detail.GrossPrice)}</td>
                      <td>{formatCurrency(detail.GrossAmount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        },
      },
    ],
  },
  {
    id: 'customer',
    title: 'Müşteri Detayları',
    customRender: (data: any) => {
      const formatFullAddress = (address: any) => {
        if (!address) return ''
        const parts: string[] = []
        if (address.IL?.IlAd) parts.push(address.IL.IlAd)
        if (address.Ilce?.IlceAd) parts.push(address.Ilce.IlceAd)
        if (address.Neighborhoods?.NeighborhoodName)
          parts.push(address.Neighborhoods.NeighborhoodName)
        if (address.FullAddress) parts.push(address.FullAddress)
        return parts.join(' / ') || ''
      }

      return (
        <div className="overflow-x-auto">
          <table className="table table-row-bordered table-row-gray-300 align-middle gs-0 gy-4">
            <tbody>
              <tr>
                <td
                  className="fw-bold text-muted bg-light"
                  style={{ width: '200px' }}
                >
                  Müşteri No
                </td>
                <td>{data.Customer?.CustomerID}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted bg-light">Müşteri Adı</td>
                <td>{data.Customer?.Title}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted bg-light">Telefon</td>
                <td>{formatPhoneNumber(data.Customer?.PhoneNumber)}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted bg-light">E-posta</td>
                <td>{data.Customer?.Mail}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted bg-light">Adres</td>
                <td>
                  {formatFullAddress(data.Customer?.CustomerAdresses?.[0])}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
  },
  {
    id: 'general',
    title: 'Genel Bilgiler',
    fields: [
      {
        name: 'OrderPaymentDetails',
        label: 'Ödeme Türü',
        type: 'custom',
        disabled: true,
        customRender: (field, value) => {
          const paymentType = value?.[0]?.PaymentTypeID
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
          if (!paymentType) return '-'
          return (
            <span
              className={`badge badge-outline ${paymentTypeMap[paymentType]}`}
            >
              {paymentTypeText[paymentType]}
            </span>
          )
        },
      },
      {
        name: 'OrderID',
        label: 'Sipariş No',
        type: 'text',
        disabled: true,
      },
      {
        name: 'OrderDate',
        label: 'Sipariş Tarihi',
        type: 'text',
        disabled: true,
        customRender: (field, value) => formatDate(value),
      },
      {
        name: 'DeliveryDate',
        label: 'Teslimat Tarihi',
        type: 'text',
        disabled: true,
        customRender: (field, value) => formatDate(value),
      },
      {
        name: 'Customer.Title',
        label: 'Müşteri',
        type: 'text',
        disabled: true,
      },
      {
        name: 'Customer.PhoneNumber',
        label: 'Telefon',
        type: 'text',
        disabled: true,
        customRender: (field, value) => formatPhoneNumber(value),
      },
      {
        name: 'DeliveryInformation',
        label: 'Teslimat Notu',
        type: 'text',
        disabled: true,
      },
    ],
  },
  {
    id: 'payment',
    title: 'Ödeme Bilgileri',
    fields: [
      {
        name: 'GrandTotal',
        label: 'Ara Toplam',
        type: 'text',
        disabled: true,
        customRender: (field, value) => formatCurrency(value),
      },
      {
        name: 'DiscountAmount',
        label: 'İndirim',
        type: 'text',
        disabled: true,
        customRender: (field, value) => formatCurrency(value),
      },
      {
        name: 'GrandTotalWithVatRate',
        label: 'Genel Toplam (KDV Dahil)',
        type: 'text',
        disabled: true,
        customRender: (field, value) => formatCurrency(value),
      },
    ],
  },
]
