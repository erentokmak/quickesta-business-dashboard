export type Order = {
  OrderID: number
  OrderNumber: string
  GrandTotalWithVatRate: number
  IsClosed: boolean
  DeliveryInformation: string
  OrderDetails: Array<{
    StockID: number
    OrderDetailID: number
    OrderNo: number
    Description: string
    Quantity: number
    GrossPrice: number
    GrossAmount: number
  }>
  OrderPaymentDetails: {
    PaymentTypeID: number
  }
  CustomPurchaseOrders: {
    CustomerID: number
  }
  PurchaseOrder: {
    CustomerID: number
  }
  Customer: {
    CustomerID: number
    Title: string
    PhoneNumber: string
    Mail: string
    CustomerAdresses: {
      CustomerAdressID: number
      IL: {
        Id: number
      }
      Ilce: {
        Id: number
      }
      Neighborhoods: {
        NeighborhoodID: number
      }
    }
  }
  OrderDate: string
  DeliveryDate: string
  SubTotal: number
  OrderStatusID: number
  CustomerAddressName: string
  IsFirstOrderByCustomer: boolean
  recordsTotal: number
}

export type PurchaseOrder = {
  CustomerID: number
  Title: string
  NickName: string
  Description: string
  PhoneNumber: string
}

export type CallCenterNotes = {
  OrderID: number
  Notes: string
}
