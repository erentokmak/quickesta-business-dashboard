import { DetailSection } from '@/types/components/forms/detail'
import { Customer, CustomerAddress } from '@/types/models/customer'
import { Order } from '@/types/models/order'
import { OrderStatus, OrderStatusID, PaymentTypeID } from '@/types'
import { renderBadge } from '@/utils/components/badges'
import moment from 'moment'
import React from 'react'

interface CustomerData extends Customer {
  CustomerAdresses: Array<
    CustomerAddress & {
      IL: {
        Id: number
        IlAd: string
      }
      Ilce: {
        Id: number
        IlceAd: string
      }
      Neighborhoods: {
        NeighborhoodID: number
        NeighborhoodName: string
      }
    }
  >
  Orders: Order[]
}

export const getCustomerSections = (): DetailSection[] => [
  {
    id: 'basic-info',
    title: 'Temel Bilgiler',
    fields: [
      {
        name: 'CustomerID',
        label: 'Müşteri No',
        type: 'text',
        disabled: true,
      },
      {
        name: 'Title',
        label: 'Ünvan',
        type: 'text',
        disabled: true,
      },
      {
        name: 'Nickname',
        label: 'Görünen Ad',
        type: 'text',
        disabled: true,
      },
      {
        name: 'Description',
        label: 'Açıklama',
        type: 'text',
        disabled: true,
      },
      {
        name: 'PhoneNumber',
        label: 'Telefon',
        type: 'text',
        disabled: true,
      },
      {
        name: 'Mail',
        label: 'E-posta',
        type: 'text',
        disabled: true,
      },
    ],
  },
  {
    id: 'addresses',
    title: 'Adresler',
    customRender: (data: CustomerData) => {
      if (!data?.CustomerAdresses?.length) {
        return <div className="text-gray-500">Kayıtlı adres bulunamadı.</div>
      }

      const formatAddress = (
        address: CustomerAddress & {
          IL?: { Id: number; IlAd: string }
          Ilce?: { Id: number; IlceAd: string }
          Neighborhoods?: { NeighborhoodID: number; NeighborhoodName: string }
        },
      ) => {
        const parts: string[] = []

        if (address.IL?.IlAd) parts.push(address.IL.IlAd)
        if (address.Ilce?.IlceAd) parts.push(address.Ilce.IlceAd)
        if (address.Neighborhoods?.NeighborhoodName)
          parts.push(address.Neighborhoods.NeighborhoodName)
        if (address.FullAddress) parts.push(address.FullAddress)

        return parts.join(' / ') || '-'
      }

      return (
        <div className="overflow-x-auto">
          <table className="table table-row-bordered table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted bg-light">
                <th>Adres Adı</th>
                <th>Adres</th>
                <th>Varsayılan</th>
              </tr>
            </thead>
            <tbody>
              {data.CustomerAdresses.map((address) => (
                <tr key={address.CustomerAdressID}>
                  <td>{address.Alias || '-'}</td>
                  <td>{formatAddress(address)}</td>
                  <td>
                    <span
                      className={`badge badge-${
                        address.IsDefault === true ? 'success' : 'light'
                      } badge-outline rounded-[30px]`}
                    >
                      {address.IsDefault === true ? 'Evet' : 'Hayır'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
  },
  {
    id: 'orders',
    title: 'Siparişler',
    customRender: (data: CustomerData) => {
      const OrdersTable: React.FC<{ data: CustomerData }> = ({ data }) => {
        const [expandedOrderId, setExpandedOrderId] = React.useState<
          number | null
        >(null)

        const getOrderStatusName = (statusId: number): string => {
          switch (statusId) {
            case OrderStatusID.Yeni:
              return OrderStatus.Yeni
            case OrderStatusID.Yolda:
              return OrderStatus.Yolda
            case OrderStatusID.TeslimEdildi:
              return OrderStatus.TeslimEdildi
            case OrderStatusID.Iptal:
              return OrderStatus.Iptal
            case OrderStatusID.OdemeBasarisiz:
              return OrderStatus.OdemeBasarisiz
            case OrderStatusID.TeslimEdilemedi:
              return OrderStatus.TeslimEdilemedi
            default:
              return 'Bilinmiyor'
          }
        }

        const toggleOrder = (orderId: number) => {
          setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
        }

        if (!data?.Orders?.length) {
          return (
            <div className="text-gray-500">Kayıtlı sipariş bulunamadı.</div>
          )
        }

        return (
          <div className="overflow-x-auto">
            <table className="table table-row-bordered table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bold text-muted bg-light">
                  <th></th>
                  <th>Sipariş No</th>
                  <th>Sipariş Tarihi</th>
                  <th>Teslim Tarihi</th>
                  <th>Tutar</th>
                  <th>Durum</th>
                  <th>Ödeme Tipi</th>
                  <th>Sipariş Notu</th>
                </tr>
              </thead>
              <tbody>
                {data.Orders.map((order) => (
                  <React.Fragment key={order.OrderID}>
                    <tr>
                      <td>
                        <button
                          onClick={() => toggleOrder(order.OrderID)}
                          className="btn btn-sm btn-icon btn-light-primary"
                        >
                          <i
                            className={`ki-duotone ki-arrow-${expandedOrderId === order.OrderID ? 'up' : 'down'} fs-2`}
                          ></i>
                        </button>
                      </td>
                      <td>
                        <a
                          href={`/dashboard/orders/${order.OrderID}`}
                          className="text-primary hover:text-primary-dark"
                        >
                          {order.OrderID}
                        </a>
                      </td>
                      <td>
                        {moment(order.OrderDate).format('DD.MM.YYYY HH:mm')}
                      </td>
                      <td>
                        {moment(order.DeliveryDate).format('DD.MM.YYYY HH:mm')}
                        {moment().diff(moment(order.DeliveryDate), 'minutes') >
                          0 && (
                          <div className="mt-1">
                            <span className="badge badge-danger badge-outline badge-sm">
                              Gecikmiş Teslimat
                            </span>
                          </div>
                        )}
                      </td>
                      <td>{Math.round(order.GrandTotalWithVatRate)} TL</td>
                      <td>
                        {renderBadge(
                          getOrderStatusName(order.OrderStatusID),
                          'status',
                        )}
                      </td>
                      <td>
                        {order.OrderPaymentDetails?.[0]?.PaymentTypeID &&
                          renderBadge(
                            order.OrderPaymentDetails[0].PaymentTypeID,
                            'platform',
                          )}
                      </td>
                      <td>{order.DeliveryInformation || ''}</td>
                    </tr>
                    {expandedOrderId === order.OrderID && (
                      <tr>
                        <td colSpan={8}>
                          <div className="bg-gray-100 p-4 rounded">
                            <h4 className="font-medium mb-3">
                              Sipariş Detayları
                            </h4>
                            <table className="table table-row-bordered table-row-gray-200 align-middle gs-0 gy-2">
                              <thead>
                                <tr className="fw-bold text-muted bg-light">
                                  <th>Ürün No</th>
                                  <th>Ürün</th>
                                  <th>Adet</th>
                                  <th>Birim Fiyat</th>
                                  <th>Toplam Tutar</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.OrderDetails.map((detail) => (
                                  <tr key={detail.OrderDetailID}>
                                    <td>{detail.OrderNo}</td>
                                    <td>{detail.Description}</td>
                                    <td>{detail.Quantity}</td>
                                    <td>{Math.round(detail.GrossPrice)} TL</td>
                                    <td>{Math.round(detail.GrossAmount)} TL</td>
                                  </tr>
                                ))}
                                <tr className="fw-bold">
                                  <td colSpan={4} className="text-end">
                                    Toplam Tutar:
                                  </td>
                                  <td>
                                    {Math.round(order.GrandTotalWithVatRate)} TL
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )
      }

      return <OrdersTable data={data} />
    },
  },
]
