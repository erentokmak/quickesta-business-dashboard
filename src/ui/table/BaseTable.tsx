import React, { useState, useMemo, useEffect } from 'react'
import { Pagination, Showing } from '@/ui'
import { toast } from 'sonner'
import { Column, BaseTableProps } from '@/types/components/tables'
import moment from 'moment'

/**
 * Generic tablo komponenti. Client-side ve server-side veri yönetimini destekler.
 * Sıralama, filtreleme, sayfalama ve kolon görünürlük kontrolü sağlar.
 */
const BaseTable = <T extends object>({
  // Temel veri ve kolon yapılandırması
  data, // Tablo verisi
  columns: initialColumns, // Tablo kolonları
  keyExtractor, // Her satır için unique key üreteci

  // Arama özellikleri
  searchTerm = '',
  onSearchChange,
  searchPlaceholder = 'Ara...',
  searchableFields = [],

  // Sayfalama özellikleri
  activePageNo = 1,
  itemsPerPage = 10,
  onPageChange = () => {},
  onItemsPerPageChange = () => {},
  totalCount = 0,

  // Filtre özellikleri
  statusFilter,
  filterFn,
  dateInputs,

  // Tablo durumu
  isLoading = false,
  error = null,
  entityName = 'Kayıtlar',
  isServerSide = false,

  // Genişletilmiş satır içeriği
  renderExpandedContent,
}: BaseTableProps<T>) => {
  // State tanımlamaları
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([])
  const [sortField, setSortField] = useState<keyof T | 'actions'>(
    initialColumns[0].key,
  )
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [columns, setColumns] = useState<Column<T>[]>(initialColumns)
  const [prevLoading, setPrevLoading] = useState(isLoading)

  // Yükleme durumu değişikliklerini takip et ve bildirim göster
  useEffect(() => {
    if (prevLoading && !isLoading && !error) {
      toast.success(`${entityName} başarıyla yüklendi`)
    } else if (error) {
      toast.error(`Hata: ${error.message}`)
    }
    setPrevLoading(isLoading)
  }, [isLoading, error, entityName, prevLoading])

  // Filtreler değiştiğinde sayfalamayı sıfırla
  useEffect(() => {
    onPageChange(1)
  }, [
    searchTerm,
    statusFilter?.value,
    dateInputs?.startDate,
    dateInputs?.endDate,
    onPageChange,
  ])

  /**
   * Tüm öğeleri seç/kaldır
   */
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItems(e.target.checked ? data.map(keyExtractor) : [])
  }

  /**
   * Tek bir öğeyi seç/kaldır
   */
  const handleSelectOne = (id: string | number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  /**
   * Sıralama işlemini yönet
   * Server-side modda çalışmaz
   */
  const handleSort = (field: keyof T | 'actions') => {
    if (field === 'actions') return

    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  /**
   * Kolon görünürlüğünü değiştir
   */
  const toggleColumn = (key: keyof T | 'actions') => {
    setColumns((prev) =>
      prev.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col,
      ),
    )
  }

  /**
   * Veriyi sırala (sadece client-side)
   */
  const sortedData = useMemo(() => {
    if (!data) return []
    if (sortField === 'actions') return data
    if (isServerSide) return data

    return [...data].sort((a, b) => {
      let aValue: any = a[sortField as keyof T]
      let bValue: any = b[sortField as keyof T]

      // Özel durumları yönet
      if (sortField === 'price') {
        aValue = aValue ?? 0
        bValue = bValue ?? 0
      }

      // String değerleri yönet
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      // Sıralama yönüne göre karşılaştır
      return sortDirection === 'asc'
        ? aValue < bValue
          ? -1
          : aValue > bValue
            ? 1
            : 0
        : aValue > bValue
          ? -1
          : aValue < bValue
            ? 1
            : 0
    })
  }, [data, sortField, sortDirection, isServerSide])

  /**
   * Veriyi filtrele (sadece client-side)
   */
  const filteredData = useMemo(() => {
    if (!sortedData) return []
    if (!searchTerm) return sortedData
    if (isServerSide) return sortedData

    const filtered = sortedData.filter((item) => {
      if (filterFn) return filterFn(item, searchTerm)

      const searchLower = searchTerm.toLowerCase()
      return searchableFields.some((field) => {
        const value = item[field]
        return value && String(value).toLowerCase().includes(searchLower)
      })
    })

    // Filtrelenmiş veri mevcut sayfadan azsa ilk sayfaya dön
    if (filtered.length <= (activePageNo - 1) * itemsPerPage) {
      onPageChange(1)
    }

    return filtered
  }, [
    sortedData,
    searchTerm,
    searchableFields,
    filterFn,
    activePageNo,
    itemsPerPage,
    onPageChange,
    isServerSide,
  ])

  /**
   * Sayfalanmış veriyi hesapla
   */
  const paginatedData = useMemo(() => {
    if (isServerSide) return data
    const startIndex = (activePageNo - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredData.slice(startIndex, endIndex)
  }, [filteredData, activePageNo, itemsPerPage, isServerSide, data])

  return (
    <div className="card card-grid min-w-full">
      <div className="card-header flex-wrap gap-2">
        <h3 className="card-title font-medium text-sm">
          {new Intl.NumberFormat('tr-TR').format(data.length)} /{' '}
          {new Intl.NumberFormat('tr-TR').format(totalCount)} kayıt gösteriliyor
        </h3>
        <div className="flex flex-wrap gap-2 lg:gap-5">
          {onSearchChange && (
            <div className="flex">
              <label className="input input-sm">
                <i className="ki-filled ki-magnifier"></i>
                <input
                  placeholder={searchPlaceholder}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </label>
            </div>
          )}
          <div className="flex flex-wrap gap-2.5">
            {dateInputs && (
              <div className="flex gap-2">
                <label className="input input-sm">
                  <input
                    type="date"
                    className="date w-32"
                    value={
                      dateInputs.startDate || moment().format('YYYY-MM-DD')
                    }
                    onChange={(e) =>
                      dateInputs.onStartDateChange(e.target.value)
                    }
                    min={moment().subtract(7, 'year').format('YYYY-MM-DD')}
                    max={moment().format('YYYY-MM-DD')}
                  />
                </label>
                <label className="input input-sm">
                  <input
                    type="date"
                    className="date w-32"
                    value={
                      dateInputs.endDate ||
                      moment().add(1, 'days').format('YYYY-MM-DD')
                    }
                    onChange={(e) => dateInputs.onEndDateChange(e.target.value)}
                    max={moment().add(1, 'year').format('YYYY-MM-DD')}
                  />
                </label>
              </div>
            )}
            {statusFilter && (
              <select
                className="select select-sm w-32"
                value={statusFilter.value}
                onChange={(e) => statusFilter.onChange(e.target.value)}
              >
                {statusFilter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            <div className="menu flex-inline" data-menu="true">
              <div
                className="menu-item"
                data-menu-item-offset="0, 10px"
                data-menu-item-placement="bottom-end"
                data-menu-item-toggle="dropdown"
                data-menu-item-trigger="click|lg:click"
              >
                <button className="menu-toggle btn btn-sm btn-outline btn-primary">
                  <i className="ki-filled ki-setting-4"></i>
                  Filtreler
                </button>
                <div className="menu-dropdown menu-default w-full max-w-[200px]">
                  {columns.map((column) => (
                    <div key={column.key.toString()} className="menu-item">
                      <button
                        className="menu-link"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleColumn(column.key)
                        }}
                      >
                        <span className="menu-icon">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={column.visible}
                            onChange={(e) => {
                              e.stopPropagation()
                              toggleColumn(column.key)
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </span>
                        <span className="menu-title">{column.title}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="scrollable-x-auto">
          <table className="table table-auto table-border">
            <thead>
              <tr>
                {/*
                <th className="w-[60px] text-center">
                  <input
                    className="checkbox checkbox-sm"
                    type="checkbox"
                    checked={
                      selectedItems.length === data.length && data.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th> */}
                {columns.map(
                  (column) =>
                    column.visible && (
                      <th key={column.key.toString()}>
                        <span
                          className={`${!isServerSide ? `sort ${sortField === column.key ? sortDirection : ''}` : ''} cursor-pointer`}
                          onClick={() =>
                            !isServerSide && handleSort(column.key)
                          }
                        >
                          <span className="sort-label font-normal text-gray-700">
                            {column.title}
                          </span>
                          {!isServerSide && <span className="sort-icon"></span>}
                        </span>
                      </th>
                    ),
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    Yükleniyor...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-4 text-danger"
                  >
                    {error.message}
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    Kayıt bulunamadı
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <React.Fragment key={keyExtractor(item)}>
                    <tr>
                      {columns
                        .filter((col) => col.visible)
                        .map((column) => (
                          <td key={String(column.key)} className="align-middle">
                            {column.render
                              ? column.render(item)
                              : String(item[column.key as keyof T] ?? '')}
                          </td>
                        ))}
                    </tr>
                    {renderExpandedContent && renderExpandedContent(item)}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-3 text-gray-600 text-2sm font-medium">
        <Pagination
          activePageNo={activePageNo}
          countPerPage={itemsPerPage}
          setActivePageNo={onPageChange}
          totalCount={totalCount}
        />
        <Showing
          perPage={itemsPerPage}
          setCountPerPage={onItemsPerPageChange}
          values={[10, 25, 50, 100]}
        />
      </div>
    </div>
  )
}

export default BaseTable
