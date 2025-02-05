import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Customer } from '@/types'
import { GET_DEALERS } from '@/graphql/queries/users'
import { toast } from 'sonner'
import Link from 'next/link'
import { Column } from '@/types/components/tables'
import { BaseTable } from '@/ui/table'
import formatPhoneNumber from '@/utils/helpers/regex'

const DealersPage = () => {
  const [dealers, setDealers] = useState<Customer[]>([])
  const [countPerPage, setCountPerPage] = useState(10)
  const [activePageNo, setActivePageNo] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'passive'
  >('all')

  const {
    data: GET_DEALERS_LIST,
    loading,
    error,
  } = useQuery(GET_DEALERS, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (loading) {
      return
    } else if (GET_DEALERS_LIST?.Customer) {
      setDealers(GET_DEALERS_LIST.Customer)
      toast.success('Bayiler başarıyla yüklendi')
    } else if (error) {
      toast.error(`Hata: ${error.message}`)
    }
  }, [loading, GET_DEALERS_LIST, error])

  const columns: Column<Customer>[] = [
    {
      key: 'CustomerID',
      title: 'Bayi No',
      visible: true,
      render: (dealer) => (
        <div className="flex flex-col">
          <Link
            href={`/dashboard/dealers/${dealer.CustomerID}`}
            className="text-sm font-medium text-gray-900 hover:text-primary-active mb-px"
          >
            {dealer.CustomerID}
          </Link>
          <span className="text-2sm text-gray-700 font-normal">
            {dealer.Description}
          </span>
        </div>
      ),
    },
    {
      key: 'Nickname',
      title: 'Görünen Adı',
      visible: true,
      render: (dealer) => (
        <div className="flex flex-col">
          <Link
            href={`/dashboard/dealers/${dealer.CustomerID}`}
            className="text-sm font-medium text-gray-900 hover:text-primary-active"
          >
            {dealer.Nickname}
          </Link>
          <a
            className="link text-2sm text-gray-700"
            href={`tel:${dealer.PhoneNumber}`}
          >
            {formatPhoneNumber(dealer.PhoneNumber)}
          </a>
        </div>
      ),
    },
    {
      key: 'Title',
      title: 'Ünvan',
      visible: true,
      render: (dealer) => (
        <Link
          href={`/dashboard/dealers/${dealer.CustomerID}`}
          className="text-sm font-medium text-gray-900 hover:text-primary-active"
        >
          {dealer.Title}
        </Link>
      ),
    },
    {
      key: 'TaxOffice',
      title: 'Vergi Dairesi',
      visible: true,
      render: (dealer) => (
        <span className="text-sm font-medium text-gray-900">
          {dealer.TaxOffice}
        </span>
      ),
    },
    {
      key: 'IsEInvoice',
      title: 'E-Fatura',
      visible: true,
      render: (dealer) => (
        <span
          className={`badge badge-${dealer.IsEInvoice ? 'success' : 'danger'} badge-outline rounded-[30px]`}
        >
          {dealer.IsEInvoice ? 'Var' : 'Yok'}
        </span>
      ),
    },
    {
      key: 'IsPassive',
      title: 'Durum',
      visible: true,
      render: (dealer) => (
        <span
          className={`badge badge-${dealer.IsPassive ? 'warning' : 'success'} badge-outline rounded-[30px]`}
        >
          {dealer.IsPassive ? 'Pasif' : 'Aktif'}
        </span>
      ),
    },
    {
      key: 'actions',
      title: 'İşlemler',
      visible: true,
      render: (dealer) => (
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
                  href={`/dashboard/dealers/${dealer.CustomerID}`}
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

  const filteredDealers = dealers.filter((dealer) => {
    if (statusFilter === 'all') return true
    if (statusFilter === 'active') return !dealer.IsPassive
    return dealer.IsPassive
  })

  if (loading) return null
  if (error) return null

  return (
    <BaseTable
      data={filteredDealers}
      columns={columns}
      keyExtractor={(dealer) => dealer.CustomerID?.toString() || ''}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      activePageNo={activePageNo}
      itemsPerPage={countPerPage}
      onPageChange={setActivePageNo}
      onItemsPerPageChange={setCountPerPage}
      totalCount={dealers.length}
      searchPlaceholder="Bayi ara"
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
      isLoading={loading}
      error={error}
      entityName="Bayi"
      searchableFields={[
        'CustomerID',
        'Nickname',
        'Title',
        'Description',
        'TaxOffice',
      ]}
    />
  )
}

DealersPage.title = 'Bayiler'
DealersPage.breadcrumbs = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Bayiler' },
]

export default DealersPage
