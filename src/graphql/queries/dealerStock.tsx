import { gql } from '@apollo/client'

export const GET_DEALERS = gql`
  query GetDealers {
    Customer(where: { ReferenceSourceID: { _eq: 2 } }) {
      CustomerID
      Title
      Identifier
      Description
      PhoneNumber
      Mail
      TaxOffice
    }
  }
`

export const GET_DEALER_STOCKS = gql`
  query GetDealerStocks($dealerId: Int!) {
    DealerStock(where: { DealerID: { _eq: $dealerId } }) {
      DealerStockID
      DealerID
      StockID
    }
  }
`

export const GET_STOCKS = gql`
  query GetStocks {
    Stock(where: { IsActive: { _eq: true } }) {
      StockID
      StockName
      Description
      StockCode
    }
  }
`

export const GET_STOCK_IMAGES = gql`
  query GetStockImages($stockIds: [Int!]) {
    FileBox(where: { FormID: { _eq: 5 }, RecordID: { _in: $stockIds } }) {
      FileBoxID
      RecordID
      Content
      ContentType
      FileName
    }
  }
`
