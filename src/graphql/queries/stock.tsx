import { gql } from '@apollo/client'

export const GET_STOCKS = gql`
  query GetStocks {
    Stock {
      StockID
      StockName
      StockCode
      StockNameEng
      Description
      SalesVatRate
      ErpStockCode
      IsActive
      UpdateDate
    }
  }
`

export const GET_STOCK = gql`
  query GetStock($StockID: Int!) {
    Stock(where: { StockID: { _eq: $StockID } }) {
      StockID
      StockName
      StockCode
      Description
      SalesVatRate
      IsActive
    }
  }
`

export const GET_STOCK_PRICES = gql`
  query GetStockPrices {
    StockPrices(order_by: { CreateDate: desc }) {
      StockPriceID
      StockID
      Price
      CreateDate
      UpdateDate
    }
  }
`

export const GET_STOCK_PRICE = gql`
  query GetStockPrice($StockID: Int!) {
    StockPrices(
      where: { StockID: { _eq: $StockID } }
      order_by: { CreateDate: desc }
    ) {
      StockPriceID
      StockID
      Price
      CreateDate
      UpdateDate
    }
  }
`

export const GET_STOCK_IMAGES = gql`
  query GetStockImages {
    FileBox(where: { FormID: { _eq: 5 } }) {
      FileBoxID
      RecordID
      Content
      ContentType
      FileName
    }
  }
`

export const GET_STOCK_IMAGE = gql`
  query GetStockImage($StockID: Int!) {
    FileBox(where: { RecordID: { _eq: $StockID } }) {
      FileBoxID
      RecordID
      Content
      ContentType
      FileName
    }
  }
`
