import { Order } from '../../models'

/**
 * Response type for getting order list from API
 */
export interface OrderList_ApiResponse {
  data: Order[]
  recordsTotal: number
  recordsFiltered: number
}

/**
 * Response type for getting single order from API
 */
export interface OrderById_ApiResponse {
  data: Order
}
