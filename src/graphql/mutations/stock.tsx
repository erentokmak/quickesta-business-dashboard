import { gql } from '@apollo/client'

export const CREATE_STOCK = gql`
  mutation CreateStock($input: Stock_insert_input!) {
    insert_Stock_one(object: $input) {
      StockID
      StockCode
      StockName
      StockNameEng
      BuyingVatRate
      SalesVatRate
      ErpStockCode
      Discountable
      StockType
      StockGroupID
      WastageRate
      MaxDiscountableRate
      IsBlockade
      CanBeMinusBalance
      IsLotNumberActive
      CustomerID
      Description
      StandardInformation
      UnitID
      RecipeType
      WareHouseID
      Guid
      CreateDate
      CreateUser
      UpdateDate
      UpdateUser
      DefaultSupplierCustomerID
      IsActive
      CategoryID
      Gtip
      Barcode
      OperationType
      OperationDate
      Origin
      SearchTags
      ShelfNumber
      IsWarehouseTracingAvailable
      SurveyTypeID
      VatGroupCode
    }
  }
`

export const CREATE_STOCK_PRICE = gql`
  mutation CreateStockPrice($input: StockPrices_insert_input!) {
    insert_StockPrices_one(object: $input) {
      StockPriceID
      PriceTypeID
      UnitID
      CurrencyID
      Price
      StockID
      Description
      IsBuyingPrice
      ProfitRate
      ListPriceRate
      ExchangeRate
      Guid
      CreateDate
      CreateUser
      UpdateDate
      UpdateUser
      OperationType
      OperationDate
    }
  }
`

export const CREATE_FILE_BOX = gql`
  mutation CreateFileBox($input: FileBox_insert_input!) {
    insert_FileBox_one(object: $input) {
      FileBoxID
      RecordID
      FileName
      Content
      ContentType
      ContentLenght
      Description
      FormID
      RelationID
      Guid
      CreateDate
      CreateUser
      UpdateDate
      UpdateUser
      OperationType
      OperationDate
      FileBoxDocumentTypeID
    }
  }
`

export const UPDATE_STOCK = gql`
  mutation UpdateStock($stockId: Int!, $input: Stock_set_input!) {
    update_Stock_by_pk(pk_columns: { StockID: $stockId }, _set: $input) {
      StockID
      StockCode
      StockName
      StockNameEng
      BuyingVatRate
      SalesVatRate
      ErpStockCode
      Discountable
      StockType
      StockGroupID
      WastageRate
      MaxDiscountableRate
      IsBlockade
      CanBeMinusBalance
      IsLotNumberActive
      CustomerID
      Description
      StandardInformation
      UnitID
      RecipeType
      WareHouseID
      Guid
      CreateDate
      CreateUser
      UpdateDate
      UpdateUser
      DefaultSupplierCustomerID
      IsActive
      CategoryID
      Gtip
      Barcode
      OperationType
      OperationDate
      Origin
      SearchTags
      ShelfNumber
      IsWarehouseTracingAvailable
      SurveyTypeID
      VatGroupCode
    }
  }
`

export const UPDATE_STOCK_PRICE = gql`
  mutation UpdateStockPrice(
    $stockPriceId: Int!
    $input: StockPrices_set_input!
  ) {
    update_StockPrices_by_pk(
      pk_columns: { StockPriceID: $stockPriceId }
      _set: $input
    ) {
      StockPriceID
      Price
      UpdateDate
      UpdateUser
      OperationType
      OperationDate
    }
  }
`

export const UPDATE_FILE_BOX = gql`
  mutation UpdateFileBox($fileBoxId: Int!, $input: FileBox_set_input!) {
    update_FileBox_by_pk(pk_columns: { FileBoxID: $fileBoxId }, _set: $input) {
      FileBoxID
      Content
      ContentType
      FileName
      UpdateDate
      UpdateUser
      OperationType
      OperationDate
    }
  }
`
