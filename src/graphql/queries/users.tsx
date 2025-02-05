import { gql } from '@apollo/client'
import { ReferenceSourceID } from '@/types'

export interface CustomersQueryVariables {
  offset: number
  limit: number
  isPassive?: boolean
  ReferenceSourceID: number
  searchTerm?: string
}

export const GET_CUSTOMERS_WITHOUT_SEARCH = gql`
  query GET_CUSTOMERS_WITHOUT_SEARCH(
    $limit: Int!
    $offset: Int!
    $isPassive: Boolean
    $ReferenceSourceID: Int!
  ) {
    Customer(
      limit: $limit
      offset: $offset
      where: {
        ReferenceSourceID: { _eq: $ReferenceSourceID }
        IsPassive: { _eq: $isPassive }
      }
      order_by: { CustomerID: desc }
    ) {
      CustomerID
      Title
      Nickname
      PhoneNumber
      IsPassive
    }
    Customer_aggregate(
      where: {
        ReferenceSourceID: { _eq: $ReferenceSourceID }
        IsPassive: { _eq: $isPassive }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`

export const GET_CUSTOMERS_WITH_SEARCH = gql`
  query GET_CUSTOMERS_WITH_SEARCH(
    $limit: Int!
    $offset: Int!
    $searchTerm: String!
    $isPassive: Boolean
    $ReferenceSourceID: Int!
  ) {
    Customer(
      limit: $limit
      offset: $offset
      where: {
        ReferenceSourceID: { _eq: $ReferenceSourceID }
        IsPassive: { _eq: $isPassive }
        _or: [
          { Title: { _like: $searchTerm } }
          { PhoneNumber: { _like: $searchTerm } }
          { Nickname: { _like: $searchTerm } }
        ]
      }
      order_by: { CustomerID: desc }
    ) {
      CustomerID
      Title
      Nickname
      PhoneNumber
      IsPassive
    }
    Customer_aggregate(
      where: {
        ReferenceSourceID: { _eq: $ReferenceSourceID }
        IsPassive: { _eq: $isPassive }
        _or: [
          { Title: { _like: $searchTerm } }
          { PhoneNumber: { _like: $searchTerm } }
          { Nickname: { _like: $searchTerm } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`

export const GET_CUSTOMER = gql`
  query GetCustomerDetail($CustomerID: Int!) {
    Customer(where: { CustomerID: { _eq: $CustomerID } }) {
      CustomerID
      Title
      Nickname
      Description
      PhoneNumber
      Mail
      CustomerAdresses {
        CustomerAdressID
        Alias
        FullAddress
        CityID
        TelephoneNumber
        Fax
        EmailAddress
        IsDefault
        TaxIdentifier
        TaxTitle
        TaxOffice
        IsIndividual
        IL {
          Id
          IlAd
        }
        Ilce {
          Id
          IlceAd
        }
        Neighborhoods {
          NeighborhoodID
          NeighborhoodName
        }
      }
      Orders(order_by: { OrderDate: desc }) {
        OrderID
        OrderNumber
        OrderDate
        DeliveryDate
        SubTotal
        GrandTotalWithVatRate
        IsClosed
        DeliveryInformation
        OrderStatusID
        OrderPaymentDetails {
          PaymentTypeID
        }
        OrderDetails {
          StockID
          OrderDetailID
          OrderNo
          Description
          Quantity
          GrossPrice
          GrossAmount
        }
      }
    }
  }
`

export const GET_DEALERS = gql`
  query GetDealers {
    Customer(where: { ReferenceSourceID: { _eq: ${ReferenceSourceID.BAYİ} } }) {
      CustomerID
      Title
      Nickname
      PhoneNumber
      IsPassive
      IsIncludedInExpressPurchase
      IsEInvoice
      IsEDespatch
      IsBlockade
      Mail
    }
  }
`

export const GET_DEALER = gql`
  query GetDealer($CustomerID: Int!) {
    Customer(where: { ReferenceSourceID: { _eq: ${ReferenceSourceID.BAYİ} }, CustomerID: { _eq: $CustomerID } }) {
      CustomerID
      Title
      Nickname
      PhoneNumber
      IsPassive
      IsIncludedInExpressPurchase
      IsEInvoice
      IsEDespatch
      IsBlockade
      Mail
      Description
      CustomerAdresses {
        CustomerAdressID
        FullAddress
        IL {
          Id
          IlAd
        }
        Ilce {
          Id
          IlceAd
        }
        Neighborhoods {
          NeighborhoodID
          NeighborhoodName
        }
      }
    }
  }
`
