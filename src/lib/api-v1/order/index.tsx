import { OrderStatusID } from '@/types'
import axiosInstance from '../client'

export const getOrderStatus = async () => {
  const response = await axiosInstance.post('/getorderstatuslist')
  return response.data.Data
}

export const getOrderListForCallCenter = async (
  orderCountPerPage: number,
  searchStartDate: string,
  searchEndDate: string,
  searchOrderStatus: OrderStatusID,
  activePage: number,
  searchTerm: string,
) => {
  const requestBody = {
    draw: activePage,
    columns: [
      { data: 0 },
      { data: 'OrderID' },
      { data: 'OrderNumber' },
      { data: 3 },
      { data: 'OrderDate' },
      { data: 'DeliveryDate' },
      { data: 'DeliveryInformation' },
      { data: 7 },
      { data: 8 },
      { data: 9 },
    ],
    order: [{ column: 0, dir: 'asc' }],
    start: activePage === 1 ? 0 : orderCountPerPage * (activePage - 1),
    length: orderCountPerPage,
    search: { value: '', regex: false },
    additionalParameterObject: {
      IsClosed: false,
      MinDate: searchStartDate,
      MaxDate: searchEndDate,
      Term: searchTerm,
      OrderStatusID: searchOrderStatus.toString(),
    },
  }
  const response = await axiosInstance.post(
    '/getorderlistforcallcenter',
    requestBody,
  )
  return response.data.Data
}

export const getPurchaseOrderCustomerList = async (OrderID: number) => {
  const response = await axiosInstance.post(
    `/GetPurchaseOrderCustomerList/${OrderID}`,
  )
  return response.data.Data
}

// TODO Change OrderID type
export const getOrderByOrderIDForCampaign = async (OrderID: any) => {
  const response = await axiosInstance.get(
    `/api/Order/GetOrderByOrderIDForCampaign?OrderID=${OrderID}`,
  )
  return response.data.Data
}

export const getOrderByOrderID = async (OrderID: any) => {
  const response = await axiosInstance.post(`/getorderbyorderid/${OrderID}`)
  return response.data.Data
}
