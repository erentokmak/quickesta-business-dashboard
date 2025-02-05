import { useQuery } from '@apollo/client'
import { useState } from 'react'
import Link from 'next/link'
import { StockTable } from '@/components/table'
import {
  GET_STOCKS,
  GET_STOCK_PRICES,
  GET_STOCK_IMAGES,
} from '@/graphql/queries/stock'

const StocksPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activePageNo, setActivePageNo] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Fetch data
  const {
    data: stocksData,
    loading: stocksLoading,
    error: stocksError,
  } = useQuery(GET_STOCKS, {
    fetchPolicy: 'network-only',
  })
  const { data: pricesData, loading: pricesLoading } = useQuery(
    GET_STOCK_PRICES,
    {
      fetchPolicy: 'network-only',
    },
  )
  const { data: imagesData, loading: imagesLoading } = useQuery(
    GET_STOCK_IMAGES,
    {
      fetchPolicy: 'network-only',
    },
  )

  // Combine stock data with prices and images
  const stocks =
    stocksData?.Stock.map((stock) => {
      const stockPrice = pricesData?.StockPrices.find(
        (price) => price.StockID === stock.StockID,
      )
      const stockImage = imagesData?.FileBox.find(
        (image) => image.RecordID === stock.StockID,
      )

      return {
        ...stock,
        price: stockPrice?.Price || null,
        image: stockImage?.Content
          ? `data:${stockImage.ContentType};base64,${stockImage.Content}`
          : null,
      }
    }) || []

  const isLoading = stocksLoading || pricesLoading || imagesLoading

  return (
    <StockTable
      stocks={stocks}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      activePageNo={activePageNo}
      itemsPerPage={itemsPerPage}
      onPageChange={setActivePageNo}
      onItemsPerPageChange={setItemsPerPage}
      totalStockCount={stocks.length}
      isLoading={isLoading}
      error={stocksError}
    />
  )
}

// Page metadata
StocksPage.title = 'Stoklar'
StocksPage.breadcrumbs = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Stoklar' },
]
StocksPage.actions = (
  <Link href="/dashboard/stocks/new" className="btn btn-sm btn-primary">
    <i className="ki-filled ki-plus-squared !text-base"></i>
    Yeni Stok Ekle
  </Link>
)

export default StocksPage
