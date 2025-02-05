import { OrderStatusID } from '../../enums'

export interface GetOrderListRequest {
  countPerPage: number
  startDate: string
  endDate: string
  status: OrderStatusID
  pageNo: number
  term?: string
}

export interface GetOrderByIdRequest {
  orderId: number
}
