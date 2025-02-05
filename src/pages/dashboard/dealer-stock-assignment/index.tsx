import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { toast } from 'sonner'
import {
  GET_DEALERS,
  GET_STOCKS,
  GET_DEALER_STOCKS,
  GET_STOCK_IMAGES,
} from '@/graphql/queries/dealerStock'
import {
  ASSIGN_STOCK_TO_DEALER,
  REMOVE_DEALER_STOCK,
  CHECK_DEALER_STOCK,
} from '@/graphql/mutations/dealerStock'
import type { Dealer } from '@/types'

const DealerStockAssignmentPage = () => {
  const [selectedDealers, setSelectedDealers] = useState<Dealer[]>([])
  const [selectedStocks, setSelectedStocks] = useState<{
    [key: number]: Set<number>
  }>({})
  const [stockImages, setStockImages] = useState<{ [key: number]: string }>({})

  const { data: dealersData } = useQuery(GET_DEALERS)
  const { data: stocksData } = useQuery(GET_STOCKS)

  const dealers =
    dealersData?.Customer?.map((dealer: any) => ({
      value: dealer.CustomerID,
      label: dealer.Title,
      identifier: dealer.Identifier,
      description: dealer.Description,
      phoneNumber: dealer.PhoneNumber,
      mail: dealer.Mail,
      taxOffice: dealer.TaxOffice,
    })) || []

  const stocks =
    stocksData?.Stock?.map((stock: any) => ({
      value: stock.StockID,
      label: stock.StockName,
      description: stock.Description,
      stockCode: stock.StockCode,
    })) || []

  const { data: stockImagesData } = useQuery(GET_STOCK_IMAGES, {
    variables: {
      stockIds: stocks.map((stock) => stock.value),
    },
    skip: !stocks.length,
  })

  const [assignStock] = useMutation(ASSIGN_STOCK_TO_DEALER)
  const [removeStock] = useMutation(REMOVE_DEALER_STOCK)
  const [checkDealerStock] = useLazyQuery(CHECK_DEALER_STOCK)

  const [getDealerStocks] = useLazyQuery(GET_DEALER_STOCKS, {
    fetchPolicy: 'network-only',
  })

  const handleDealerChange = async (values: any) => {
    setSelectedDealers(values as Dealer[])
    setSelectedStocks({})

    try {
      await Promise.all(
        values.map(async (dealer: Dealer) => {
          const { data } = await getDealerStocks({
            variables: { dealerId: dealer.value },
            fetchPolicy: 'network-only',
          })

          if (data?.DealerStock?.length > 0) {
            setSelectedStocks((prev) => ({
              ...prev,
              [dealer.value]: new Set(
                data.DealerStock.map((ds: any) => ds.StockID),
              ),
            }))
          }
        }),
      )
    } catch (error) {
      console.error('Error fetching dealer stocks:', error)
    }
  }

  const handleSelectAllStocks = (dealerId: number, checked: boolean) => {
    setSelectedStocks((prev) => ({
      ...prev,
      [dealerId]: checked ? new Set(stocks.map((s) => s.value)) : new Set(),
    }))
  }

  const handleStockToggle = (dealerId: number, stockId: number) => {
    setSelectedStocks((prev) => {
      const newSet = new Set<number>(prev[dealerId] || [])
      if (newSet.has(stockId)) {
        newSet.delete(stockId)
      } else {
        newSet.add(stockId)
      }
      return { ...prev, [dealerId]: newSet }
    })
  }

  const handleSave = async () => {
    try {
      for (const dealer of selectedDealers) {
        const { data: currentStocks } = await getDealerStocks({
          variables: { dealerId: dealer.value },
        })

        const currentStockIds = new Set(
          currentStocks?.DealerStock?.map((ds: any) => ds.StockID) || [],
        )
        const newStockIds = selectedStocks[dealer.value] || new Set()

        const stocksToAdd = Array.from(newStockIds).filter(
          (id) => !currentStockIds.has(Number(id)),
        )
        const stocksToRemove = Array.from(currentStockIds).filter(
          (id) => !newStockIds.has(Number(id)),
        )

        // Silme işlemleri
        for (const stockId of stocksToRemove) {
          await removeStock({
            variables: {
              dealerId: Number(dealer.value),
              stockId: Number(stockId),
            },
          })
        }

        // Ekleme işlemleri
        for (const stockId of stocksToAdd) {
          // Önce kontrol et
          const { data: existingStock } = await checkDealerStock({
            variables: {
              dealerId: Number(dealer.value),
              stockId: Number(stockId),
            },
          })

          // Eğer yoksa ekle
          if (!existingStock?.DealerStock?.length) {
            await assignStock({
              variables: {
                dealerId: Number(dealer.value),
                stockId: Number(stockId),
              },
            })
          }
        }
      }

      toast.success('Stoklar başarıyla güncellendi')
    } catch (error) {
      console.error('Error updating stocks:', error)
      toast.error('Stok güncelleme işlemi başarısız oldu')
    }
  }

  useEffect(() => {
    if (stockImagesData?.FileBox) {
      const images: { [key: number]: string } = {}
      stockImagesData.FileBox.forEach((file: any) => {
        images[file.RecordID] = file.Content
      })
      setStockImages(images)
    }
  }, [stockImagesData])

  return (
    <div className="card">
      <div className="card-header border-0 pt-6">
        <div className="card-toolbar">
          <Select
            isMulti
            className="min-w-[600px]"
            classNamePrefix="select"
            placeholder="Bayi Seçiniz veya Arayınız..."
            options={dealers}
            value={selectedDealers}
            onChange={handleDealerChange}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: '42px',
                fontSize: '1rem',
              }),
              placeholder: (base) => ({
                ...base,
                fontSize: '1rem',
                color: '#A1A5B7',
              }),
              option: (base) => ({
                ...base,
                fontSize: '1rem',
                padding: '10px 16px',
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: '#F1FAFF',
                borderRadius: '6px',
                padding: '2px',
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: '#009EF7',
                fontWeight: 600,
              }),
            }}
          />
        </div>
      </div>

      <div className="card-body py-4">
        <div className="flex flex-col gap-5" data-accordion="true">
          {selectedDealers.map((dealer) => (
            <div
              key={dealer.value}
              className="accordion-item border rounded-xl"
              data-accordion-item="true"
              id={`accordion_dealer_${dealer.value}`}
            >
              <button
                className="accordion-toggle p-4"
                data-accordion-toggle={`#accordion_content_${dealer.value}`}
              >
                <span className="text-base text-gray-900 font-medium">
                  {dealer.label}
                  <span className="badge badge-light-primary ms-2">
                    {selectedStocks[dealer.value]?.size || 0} Stok Seçili
                  </span>
                </span>
                <i className="ki-outline ki-plus text-gray-600 text-2sm accordion-active:hidden block"></i>
                <i className="ki-outline ki-minus text-gray-600 text-2sm accordion-active:block hidden"></i>
              </button>

              <div
                className="accordion-content hidden border-t"
                id={`accordion_content_${dealer.value}`}
              >
                <div id="kt_remote_group_check_table">
                  <div className="scrollable-x-auto">
                    <table
                      className="table table-auto table-border"
                      data-datatable-table="true"
                    >
                      <thead>
                        <tr>
                          <th className="w-14">
                            <input
                              className="checkbox checkbox-sm"
                              data-datatable-check="true"
                              type="checkbox"
                              onChange={(e) =>
                                handleSelectAllStocks(
                                  dealer.value,
                                  e.target.checked,
                                )
                              }
                            />
                          </th>
                          <th className="w-[50px]"></th>
                          <th
                            className="min-w-[250px]"
                            data-datatable-column="stockName"
                          >
                            <span className="sort">
                              <span className="sort-label">Stok Adı</span>
                              <span className="sort-icon"></span>
                            </span>
                          </th>
                          <th
                            className="w-[100px] text-center"
                            data-datatable-column="status"
                          >
                            <span className="sort">
                              <span className="sort-label">Durum</span>
                              <span className="sort-icon"></span>
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {stocks.map((stock) => {
                          const isSelected = selectedStocks[dealer.value]?.has(
                            stock.value,
                          )
                          return (
                            <tr
                              key={stock.value}
                              className={`cursor-pointer ${isSelected ? ' bg-primary-light border-black border-dashed' : ''}`}
                              onClick={() =>
                                handleStockToggle(dealer.value, stock.value)
                              }
                            >
                              <td>
                                <input
                                  className="checkbox checkbox-sm"
                                  type="checkbox"
                                  checked={isSelected}
                                  readOnly
                                />
                              </td>
                              <td>
                                <div className="symbol symbol-30px">
                                  {stockImages[stock.value] ? (
                                    <img
                                      src={`data:image/jpeg;base64,${stockImages[stock.value]}`}
                                      alt=""
                                      width={30}
                                    />
                                  ) : (
                                    <div className="symbol-label">
                                      <i className="ki-outline ki-picture text-lg"></i>
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td>{stock.label}</td>
                              <td className="text-center">
                                <span
                                  className={`badge badge-outline ${isSelected ? 'badge-primary' : ''}`}
                                >
                                  {isSelected ? 'Atandı' : 'Atanmadı'}
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-3 text-gray-600 text-2sm font-medium">
                    <div className="flex items-center gap-2">
                      Toplam {stocks.length} kayıt
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDealers.length > 0 && (
        <div className="card-footer d-flex justify-content-end py-6">
          <button className="btn btn-primary" onClick={handleSave}>
            <i className="ki-duotone ki-check fs-2 me-2">
              <span className="path1"></span>
              <span className="path2"></span>
            </i>
            Değişiklikleri Kaydet
          </button>
        </div>
      )}
    </div>
  )
}

DealerStockAssignmentPage.title = 'Bayiye Stok Atama'
DealerStockAssignmentPage.breadcrumbs = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Bayiye Stok Atama' },
]

export default DealerStockAssignmentPage
