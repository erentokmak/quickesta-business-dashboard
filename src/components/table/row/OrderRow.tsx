import React from 'react'
import { renderBadge } from '@/utils/components/badges'
import moment from 'moment'

const OrderRow = ({ order, index }) => {
  return (
    <tr key={index}>
      <td>{/* Detay düğmesi veya gösterge */}</td>
      <td>{order.OrderID}</td>
      <td>{order.Customer.Title}</td>
      <td>{moment(order.OrderDate).format('DD.MM.YYYY hh:mm')}</td>
      <td>{moment(order.DeliveryDate).format('DD.MM.YYYY hh:mm')}</td>
      <td>{order.SubTotal} TL</td>
      <td>{renderBadge(order.OrderStatus.Name, 'status')}</td>
      <td>
        {renderBadge(order.OrderPaymentDetails[0]?.PaymentTypeID, 'platform')}
      </td>
      <td>{/* Notlar için alan */}</td>
    </tr>
  )
}

export default OrderRow
