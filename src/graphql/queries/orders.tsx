import { gql } from '@apollo/client'

export interface OrdersQueryVariables {
  searchTerm?: string
  offset: number
  limit: number
  statusId: number
  startDate?: string
  endDate?: string
  order_by?: any[]
  where?: any // Dinamik where koşulu için
}

export const GET_ORDERS_WITHOUT_SEARCH = gql`
  query GetOrdersWithoutSearch(
    $limit: Int!
    $offset: Int!
    $statusId: Int!
    $startDate: datetime
    $endDate: datetime
    $order_by: [Orders_order_by!]
  ) {
    Orders(
      limit: $limit
      offset: $offset
      where: {
        OrderStatusID: { _eq: $statusId }
        OrderDate: { _gte: $startDate, _lte: $endDate }
      }
      order_by: $order_by
    ) {
      OrderID
      OrderNumber
      OrderDate
      DeliveryDate
      GrandTotalWithVatRate
      OrderStatusID
      Customer {
        Title
        PhoneNumber
        CustomerAdresses {
          CustomerAdressID
          IL {
            Id
          }
          Ilce {
            Id
          }
          Neighborhoods {
            NeighborhoodID
          }
        }
      }
      OrderPaymentDetails {
        PaymentTypeID
      }
      CustomPurchaseOrders {
        CustomerID
      }
    }
    Orders_aggregate(
      where: {
        OrderStatusID: { _eq: $statusId }
        OrderDate: { _gte: $startDate, _lte: $endDate }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`

export const GET_ORDERS_WITH_SEARCH = gql`
  query GetOrdersWithSearch(
    $limit: Int!
    $offset: Int!
    $statusId: Int!
    $startDate: datetime!
    $endDate: datetime!
    $where: Orders_bool_exp!
  ) {
    Orders(
      where: {
        OrderStatusID: { _eq: $statusId }
        OrderDate: { _gte: $startDate, _lte: $endDate }
        _and: [$where]
      }
      limit: $limit
      offset: $offset
      order_by: { OrderDate: desc }
    ) {
      OrderID
      OrderNumber
      OrderDate
      DeliveryDate
      GrandTotalWithVatRate
      OrderStatusID
      Customer {
        Title
        PhoneNumber
        CustomerAdresses {
          CustomerAdressID
          IL {
            Id
          }
          Ilce {
            Id
          }
          Neighborhoods {
            NeighborhoodID
          }
        }
      }
      OrderPaymentDetails {
        PaymentTypeID
      }
      CustomPurchaseOrders {
        CustomerID
      }
    }
    Orders_aggregate(
      where: {
        OrderStatusID: { _eq: $statusId }
        OrderDate: { _gte: $startDate, _lte: $endDate }
        _and: [$where]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`

export const GET_ORDER = gql`
  query GetOrderDetail($OrderID: Int!) {
    Orders(where: { OrderID: { _eq: $OrderID } }) {
      OrderID
      OrderNumber
      CustomerID
      CustomerAdressID
      Description
      DeliveryDate
      DeliveryInformation
      GrandTotal
      GrandTotalWithVatRate
      DiscountAmount
      OrderDate
      OrderStatusID
      Customer {
        CustomerID
        Title
        PhoneNumber
        Mail
        CustomerAdresses {
          FullAddress
          Ilce {
            IlceAd
          }
          IL {
            IlAd
          }
          Neighborhoods {
            NeighborhoodName
          }
        }
      }
      OrderDetails {
        OrderDetailID
        OrderNo
        Description
        Quantity
        GrossPrice
        GrossAmount
      }
      OrderPaymentDetails {
        PaymentTypeID
      }
    }
  }
`

export const GET_ASSIGNABLE_DEALERS_BY_ADDRESS_MATCHING = gql`
  query GET_ASSIGNABLE_DEALERS_BY_ADDRESS_MATCHING(
    $provinceId: Int!
    $countyId: Int!
    $neighborhoodId: Int!
  ) {
    AddressMatchings(
      where: {
        IlID: { _eq: $provinceId }
        IlceID: { _eq: $countyId }
        NeighborhoodID: { _eq: $neighborhoodId }
      }
    ) {
      CustomerID
      Customer {
        Title
        CustomerAdresses {
          CustomerAdressID
        }
      }
    }
  }
`
