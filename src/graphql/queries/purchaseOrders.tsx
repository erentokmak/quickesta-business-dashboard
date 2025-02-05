import { gql } from '@apollo/client'

export const GET_PURCHASE_ORDER_DETAILS = gql`
  query GetPurchaseOrderDetails($orderId: Int!) {
    PurchaseOrders(where: { OrderID: { _eq: $orderId } }) {
      CustomerAdress {
        CustomerAdressID
        IL {
          IlAd
        }
        Ilce {
          IlceAd
        }
        Neighborhoods {
          NeighborhoodName
        }
        FullAddress
      }
      Customer {
        CustomerID
        Title
        PhoneNumber
      }
      DeliveryInformation
    }
  }
`

export const ASSIGN_DEALER_TO_ORDER = gql`
  mutation AssignDealerToOrder(
    $orderId: Int!
    $customerId: Int!
    $customerAddressId: Int!
  ) {
    update_PurchaseOrders(
      where: { OrderID: { _eq: $orderId } }
      _set: { CustomerID: $customerId, CustomerAdressID: $customerAddressId }
    ) {
      affected_rows
      returning {
        OrderID
        CustomerID
        CustomerAdressID
      }
    }
  }
`
