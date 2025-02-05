import { gql } from '@apollo/client'

export const CHECK_DEALER_STOCK = gql`
  query CheckDealerStock($dealerId: Int!, $stockId: Int!) {
    DealerStock(
      where: { DealerID: { _eq: $dealerId }, StockID: { _eq: $stockId } }
    ) {
      DealerStockID
    }
  }
`

export const ASSIGN_STOCK_TO_DEALER = gql`
  mutation AssignStockToDealer($dealerId: Int!, $stockId: Int!) {
    insert_DealerStock_one(object: { DealerID: $dealerId, StockID: $stockId }) {
      DealerStockID
    }
  }
`

export const REMOVE_DEALER_STOCK = gql`
  mutation RemoveDealerStock($dealerId: Int!, $stockId: Int!) {
    delete_DealerStock(
      where: { DealerID: { _eq: $dealerId }, StockID: { _eq: $stockId } }
    ) {
      affected_rows
    }
  }
`
