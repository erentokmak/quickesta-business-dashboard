/**
 * Müşteriler Tablosu Komponenti
 * - Server-side arama ve filtreleme
 * - Aktif/Pasif durumu gösterimi
 * - Müşteri detayları
 */
import React from 'react'
import { Customer } from '@/types/models'
import { Column } from '@/types/components/tables'
import { BaseTable } from '@/ui/table'
import Link from 'next/link'
import formatPhoneNumber from '@/utils/helpers/regex'

interface CustomersTableProps {
  // Tablo verisi ve durumu
  customers: Customer[]
  isLoading: boolean
  error: any
  totalCount: number

  // Arama ve filtreleme
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: boolean
  onStatusFilterChange: (value: boolean) => void

  // Sayfalama
  activePageNo: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (count: number) => void
}

export default function CustomersTable({
  // Tablo verisi ve durumu
  customers,
  isLoading,
  error,
  totalCount,

  // Arama ve filtreleme
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,

  // Sayfalama
  activePageNo,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: CustomersTableProps) {
  /**
   * Tablo kolonları tanımı
   */
  const columns: Column<Customer>[] = [
    // Müşteri Numarası
    {
      key: 'CustomerID',
      title: 'Müşteri No',
      visible: true,
      render: (customer) => (
        <Link
          href={`/dashboard/customers/${customer.CustomerID}`}
          className="text-sm font-medium text-gray-900 hover:text-primary-active"
        >
          {customer.CustomerID}
        </Link>
      ),
    },
    // Müşteri Bilgileri
    {
      key: 'Nickname',
      title: 'Müşteri',
      visible: true,
      render: (customer) => (
        <div className="flex flex-col">
          <Link
            href={`/dashboard/customers/${customer.CustomerID}`}
            className="text-sm font-medium text-gray-900 hover:text-primary-active"
          >
            {customer.Nickname}
          </Link>
          <a className="link link-primary" href={`tel:${customer.PhoneNumber}`}>
            {formatPhoneNumber(customer.PhoneNumber)}
          </a>
        </div>
      ),
    },
    // Ünvan
    {
      key: 'Title',
      title: 'Ünvan',
      visible: true,
      render: (customer) => (
        <Link
          href={`/dashboard/customers/${customer.CustomerID}`}
          className="text-sm font-medium text-gray-900 hover:text-primary-active"
        >
          {customer.Title}
        </Link>
      ),
    },
    // Durum
    {
      key: 'IsPassive',
      title: 'Durum',
      visible: true,
      render: (customer) => (
        <span
          className={`badge badge-outline ${
            customer.IsPassive ? 'badge-warning' : 'badge-success'
          }`}
        >
          {customer.IsPassive ? 'Pasif' : 'Aktif'}
        </span>
      ),
    },
    // İşlemler
    {
      key: 'actions',
      title: 'İşlemler',
      visible: true,
      render: (customer) => (
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
                  href={`/dashboard/customers/${customer.CustomerID}`}
                >
                  <span className="menu-icon">
                    <i className="ki-filled ki-pencil"></i>
                  </span>
                  <span className="menu-title">Düzenle</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <BaseTable
      // Temel tablo özellikleri
      data={customers}
      columns={columns}
      keyExtractor={(customer) => customer.CustomerID?.toString() || ''}
      // Arama özellikleri
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder="Müşteri ara..."
      searchableFields={['Title', 'PhoneNumber', 'Nickname']}
      // Sayfalama
      activePageNo={activePageNo}
      itemsPerPage={itemsPerPage}
      onPageChange={onPageChange}
      onItemsPerPageChange={onItemsPerPageChange}
      totalCount={totalCount}
      // Filtreler ve durum
      isLoading={isLoading}
      error={error}
      entityName="Müşteriler"
      isServerSide={true}
      // Durum filtresi
      statusFilter={{
        value: statusFilter,
        onChange: onStatusFilterChange,
        options: [
          { label: 'Aktif', value: false },
          { label: 'Pasif', value: true },
        ],
      }}
    />
  )
}
