export interface Stock {
  StockID?: number
  StockName: string
  StockCode: string
  StockNameEng: string
  Description?: string
  BuyingVatRate: number
  SalesVatRate: number
  ErpStockCode: string
  IsActive: boolean
  CreateDate?: string
  UpdateDate?: string
  price: number | null
  image: string | null
  Price: number
}

export interface StockPrice {
  StockPriceID: number
  StockID: number
  Price: number
  CreateDate: string
  UpdateDate: string
}

export interface FileBox {
  FileBoxID: number
  RecordID: number
  Content: string
  ContentType: string
  FileName: string
}
