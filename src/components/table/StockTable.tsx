import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Stock } from '@/types/models'
import { StockTableProps } from '@/types/components/tables'
import { Column } from '@/types/components/tables'
import BaseTable from '@/ui/table/BaseTable'

const StockTable: React.FC<StockTableProps> = ({
  stocks,
  searchTerm,
  onSearchChange,
  activePageNo,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  totalStockCount,
  isLoading,
  error,
}) => {
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'passive'
  >('all')

  const columns: Column<Stock>[] = [
    {
      key: 'StockName',
      title: 'Stok',
      visible: true,
      render: (stock) => (
        <div className="flex items-center gap-2.5">
          <div className="rounded size-9 shrink-0 overflow-hidden">
            {stock.image ? (
              <Image
                src={stock.image}
                alt={stock.StockName}
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <i className="ki-duotone ki-picture fs-2 text-gray-500">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <Link
              href={`/dashboard/stocks/${stock.StockID}`}
              className="text-sm font-medium text-gray-900 hover:text-primary-active mb-px"
            >
              {stock.StockName}
            </Link>
            <span className="text-2sm text-gray-700 font-normal">
              {stock.Description}
            </span>
          </div>
        </div>
      ),
    },
    { key: 'StockCode', title: 'Stok Kodu', visible: true },
    { key: 'SalesVatRate', title: 'KDV', visible: true },
    {
      key: 'price',
      title: 'Fiyat',
      visible: true,
      render: (stock) =>
        stock.price
          ? `${stock.price.toLocaleString('tr-TR', {
              minimumFractionDigits: 2,
            })}`
          : '-',
    },
    {
      key: 'IsActive',
      title: 'Durum',
      visible: true,
      render: (stock) => (
        <span
          className={`badge badge-${stock.IsActive ? 'success' : 'danger'} badge-outline rounded-[30px]`}
        >
          {stock.IsActive ? 'Aktif' : 'Pasif'}
        </span>
      ),
    },
    {
      key: 'actions',
      title: 'İşlemler',
      visible: true,
      render: (stock) => (
        <div className="menu flex-inline" data-menu="true">
          <div
            className="menu-item"
            data-menu-item-offset="0, 10px"
            data-menu-item-placement="bottom-end"
            data-menu-item-toggle="dropdown"
            data-menu-item-trigger="click|lg:click"
          >
            <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
              <i className="ki-filled ki-dots-vertical"></i>
            </button>
            <div
              className="menu-dropdown menu-default w-full max-w-[175px]"
              data-menu-dismiss="true"
            >
              <div className="menu-item">
                <Link
                  className="menu-link"
                  href={`/dashboard/stocks/${stock.StockID}`}
                >
                  <span className="menu-icon">
                    <i className="ki-filled ki-pencil"></i>
                  </span>
                  <span className="menu-title">Düzenle</span>
                </Link>
              </div>
              {/*<div className="menu-separator"></div>
              <div className="menu-item">
                <button className="menu-link" onClick={() => {}}>
                  <span className="menu-icon">
                    <i className="ki-filled ki-trash"></i>
                  </span>
                  <span className="menu-title">Sil</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      ),
    },
  ]

  const filteredStocks = stocks.filter((stock) => {
    if (statusFilter === 'all') return true
    if (statusFilter === 'active') return stock.IsActive
    return !stock.IsActive
  })

  return (
    <BaseTable
      data={filteredStocks}
      columns={columns}
      keyExtractor={(stock) => stock.StockID?.toString() || ''}
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      activePageNo={activePageNo}
      itemsPerPage={itemsPerPage}
      onPageChange={onPageChange}
      onItemsPerPageChange={onItemsPerPageChange}
      totalCount={totalStockCount}
      searchPlaceholder="Stok ara"
      statusFilter={{
        value: statusFilter,
        onChange: (value) =>
          setStatusFilter(value as 'all' | 'active' | 'passive'),
        options: [
          { value: 'all', label: 'Tümü' },
          { value: 'active', label: 'Aktif' },
          { value: 'passive', label: 'Pasif' },
        ],
      }}
      isLoading={isLoading}
      error={error}
      entityName="Stoklar"
      searchableFields={['StockName', 'StockCode', 'Description', 'price']}
    />
  )
}

export default StockTable
