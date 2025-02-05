import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client'
import {
  GET_STOCK,
  GET_STOCK_PRICE,
  GET_STOCK_IMAGE,
} from '@/graphql/queries/stock'
import {
  CREATE_STOCK,
  UPDATE_STOCK,
  CREATE_STOCK_PRICE,
  UPDATE_STOCK_PRICE,
  CREATE_FILE_BOX,
  UPDATE_FILE_BOX,
} from '@/graphql/mutations/stock'
import { DetailField } from '@/types/components/forms/detail'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { toast } from 'sonner'
import { BaseDetailCard } from '@/ui/card'
import { createFormChangeHandler } from '@/utils/helpers/form'
import { useSession } from 'next-auth/react'
import {
  getInitialStockData,
  handleStockImageChange,
  getStockSections,
  StockFieldTypes,
} from '@/utils/helpers/stock'

const saveRef = { current: null as (() => Promise<void>) | null }

const StockDetailPage = () => {
  const router = useRouter()
  const { slug } = router.query
  const isNewStock = slug === 'new'
  const { data: session } = useSession()

  // State
  const [isLoading, setIsLoading] = useState(true)
  const [previewImages, setPreviewImages] = useState<
    Array<{ Content: string; ContentType: string }>
  >([])
  const [formData, setFormData] = useState(getInitialStockData())

  // Queries
  const { data, loading, error } = useQuery(GET_STOCK, {
    variables: { StockID: parseInt(slug as string) },
    skip: isNewStock || !slug,
    fetchPolicy: 'network-only',
  })
  const { data: imageData } = useQuery(GET_STOCK_IMAGE, {
    variables: { StockID: parseInt(slug as string) },
    skip: isNewStock || !slug,
    fetchPolicy: 'network-only',
  })
  const { data: priceData } = useQuery(GET_STOCK_PRICE, {
    variables: { StockID: parseInt(slug as string) },
    skip: isNewStock || !slug,
    fetchPolicy: 'network-only',
  })

  // Mutations
  const [createStock] = useMutation(CREATE_STOCK)
  const [updateStock] = useMutation(UPDATE_STOCK)
  const [createStockPrice] = useMutation(CREATE_STOCK_PRICE)
  const [updateStockPrice] = useMutation(UPDATE_STOCK_PRICE)
  const [createFileBox] = useMutation(CREATE_FILE_BOX)
  const [updateFileBox] = useMutation(UPDATE_FILE_BOX)

  // Handlers
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDelete = async () => {
    try {
      //await deleteStock({
      //variables: { stockId: parseInt(slug as string) },
      //})
      toast.success('Stok silindi')
      //router.push('/dashboard/stocks')
    } catch (error) {
      toast.error('Hata oluştu')
    }
  }

  const handleSave = useCallback(async () => {
    try {
      const now = new Date().toISOString()
      const currentUser = parseInt(session?.user?.id || '0')

      if (isNewStock) {
        // Create new stock
        const stockInput = {
          StockCode: formData.StockCode || '',
          StockName: formData.StockName || '',
          StockNameEng: formData.StockNameEng || '',
          BuyingVatRate: formData.BuyingVatRate || 0,
          SalesVatRate: formData.SalesVatRate || 0,
          ErpStockCode: '',
          Discountable: 1,
          StockType: 0,
          StockGroupID: 1,
          WastageRate: 0,
          MaxDiscountableRate: null,
          IsBlockade: null,
          CanBeMinusBalance: null,
          IsLotNumberActive: false,
          CustomerID: null,
          Description: formData.Description || '',
          StandardInformation: '',
          UnitID: 1,
          RecipeType: 0,
          WareHouseID: 2,
          Guid: crypto.randomUUID(),
          CreateDate: now,
          CreateUser: currentUser,
          UpdateDate: now,
          UpdateUser: currentUser,
          DefaultSupplierCustomerID: null,
          IsActive: formData.IsActive,
          CategoryID: null,
          Gtip: '',
          Barcode: '',
          OperationType: 1,
          OperationDate: now,
          Origin: '',
          SearchTags: '',
          ShelfNumber: '',
          IsWarehouseTracingAvailable: false,
          SurveyTypeID: null,
          VatGroupCode: null,
        }

        const { data: stockData } = await createStock({
          variables: { input: stockInput },
        })

        const stockId = stockData.insert_Stock_one.StockID

        // Create stock price
        const stockPriceInput = {
          StockID: stockId,
          Price: formData.Price || 0,
          PriceTypeID: 1,
          UnitID: 1,
          CurrencyID: 1,
          IsBuyingPrice: false,
          ProfitRate: 0,
          ListPriceRate: 0,
          ExchangeRate: 1,
          CreateDate: now,
          CreateUser: currentUser,
          UpdateDate: now,
          UpdateUser: currentUser,
          OperationType: 1,
          OperationDate: now,
          Guid: crypto.randomUUID(),
        }

        await createStockPrice({
          variables: { input: stockPriceInput },
        })

        /* FileBox mutation temporarily disabled
        // Create file box if image exists
        if (previewImages.length > 0) {
          const fileBoxInput = {
            RecordID: stockId,
            FileName: formData.StockCode,
            ContentType: previewImages[0].ContentType,
            Content: previewImages[0].Content,
            ContentLenght: previewImages[0].Content.length,
            FormID: 5,
            FileBoxDocumentTypeID: 1,
            CreateDate: now,
            CreateUser: currentUser,
            UpdateDate: now,
            UpdateUser: currentUser,
            OperationType: 1,
            OperationDate: now,
            Guid: crypto.randomUUID(),
          }

          await createFileBox({
            variables: { input: fileBoxInput },
          })
        }
        */

        toast.success('Stok başarıyla oluşturuldu')
        router.push(`/dashboard/stocks/${stockId}`)
      } else {
        // Update existing stock
        const stockInput = {
          StockCode: formData.StockCode || '',
          StockName: formData.StockName || '',
          BuyingVatRate: formData.BuyingVatRate || 0,
          SalesVatRate: formData.SalesVatRate || 0,
          Description: formData.Description || '',
          UpdateDate: now,
          UpdateUser: currentUser,
          OperationType: 2,
          OperationDate: now,
          IsActive: formData.IsActive,
        }

        await updateStock({
          variables: {
            stockId: parseInt(slug as string),
            input: stockInput,
          },
        })

        // Update stock price
        if (priceData?.StockPrices?.[0]?.StockPriceID) {
          const stockPriceInput = {
            Price: formData.Price,
            UpdateDate: now,
            UpdateUser: currentUser,
            OperationType: 2,
            OperationDate: now,
          }

          await updateStockPrice({
            variables: {
              stockPriceId: priceData.StockPrices[0].StockPriceID,
              input: stockPriceInput,
            },
          })
        }

        /* FileBox mutation temporarily disabled
        // Update file box if image changed
        if (previewImages.length > 0 && imageData?.FileBox?.[0]?.FileBoxID) {
          const fileBoxInput = {
            Content: previewImages[0].Content,
            ContentType: previewImages[0].ContentType,
            ContentLenght: previewImages[0].Content.length,
            FileName: formData.StockCode,
            UpdateDate: now,
            UpdateUser: currentUser,
            OperationType: 2,
            OperationDate: now,
          }

          try {
            await updateFileBox({
              variables: {
                fileBoxId: imageData.FileBox[0].FileBoxID,
                input: fileBoxInput,
              },
            })
          } catch (error) {
            console.error('FileBox update error:', error)
            throw error
          }
        }
        */

        toast.success('Değişiklikler kaydedildi')
      }
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Stok kaydedilirken bir hata oluştu')
    }
  }, [
    isNewStock,
    formData,
    priceData,
    createStock,
    updateStock,
    createStockPrice,
    updateStockPrice,
    slug,
    session,
    router,
  ])

  const handleChange = createFormChangeHandler(setFormData, StockFieldTypes)

  const handleImageChange = (field: DetailField, files: FileList) => {
    handleStockImageChange(field, files, setPreviewImages)
  }

  // Get sections for the page
  const detailSections = useMemo(
    () => getStockSections(isNewStock, handleDelete),
    [isNewStock, handleDelete],
  )

  // Effects
  useEffect(() => {
    if (loading) {
      setIsLoading(true)
      return
    }

    if (data?.Stock) {
      const stock = data.Stock[0]
      const price = priceData?.StockPrices?.[0]?.Price || 0
      setFormData({ ...stock, Price: price })

      if (imageData?.FileBox?.[0]) {
        setPreviewImages([
          {
            Content: imageData.FileBox[0].Content,
            ContentType: imageData.FileBox[0].ContentType,
          },
        ])
      }

      setIsLoading(false)
      toast.success('Stok bilgileri başarıyla yüklendi')
      return
    }

    if (error) {
      setIsLoading(false)
      toast.error(`Hata: ${error.message}`)
      return
    }

    if (isNewStock) {
      setIsLoading(false)
    }
  }, [loading, data, error, isNewStock, priceData, imageData])

  // Update saveRef when handleSave changes
  useEffect(() => {
    saveRef.current = handleSave
  }, [handleSave])

  return (
    <BaseDetailCard
      title={isNewStock ? 'Yeni Stok' : 'Stok Detay'}
      sections={detailSections}
      data={formData}
      loading={isLoading}
      isNew={isNewStock}
      imageData={previewImages}
      onImageChange={handleImageChange}
      onImageRemove={() => setPreviewImages([])}
      onChange={handleChange}
    />
  )
}

// Add static properties
StockDetailPage.title = 'Stok Detay'
StockDetailPage.breadcrumbs = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Stoklar', href: '/dashboard/stocks' },
  { label: 'Stok Detay' },
]
StockDetailPage.hasDetailPageActions = true
StockDetailPage.isHaveSaveButton = true
StockDetailPage.sections = getStockSections(false, () => {}).map((section) => ({
  title: section.title,
  id: section.id,
}))
StockDetailPage.onSave = () => saveRef.current?.()

export default StockDetailPage
