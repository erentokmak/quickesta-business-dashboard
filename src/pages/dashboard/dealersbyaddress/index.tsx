import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { Pagination } from '@/ui'
import {
  GET_COUNTY_LIST_BY_PROVINCE,
  GET_CUSTOMERS_BY_ADDRESS,
  GET_CUSTOMERS_BY_PROVINCE,
  GET_CUSTOMERS_BY_PROVINCE_AND_COUNTY,
  GET_NEIGHBORHOOD_LIST_BY_COUNTY,
  GET_PROVINCE_LIST,
} from '@/graphql/queries/address'
import { Dropdown } from '@/ui/dropdown'
import { Customer } from '@/types'
import { GoogleMapComponent } from '@/ui'
import _ from 'lodash'
import { DealersTable } from '@/components/table/DealersTable'
import NoData from '@/assets/illustrations/no_data.png'
import Image from 'next/image'
import { toast } from 'sonner'

interface MarkerData {
  id: string
  customerId?: string
  title: string
  address: string
  lat?: number
  lng?: number
}

const DealersByAddressPage = () => {
  const [dealers, setDealers] = useState<Customer[]>([])
  const [totalCustomerCount, setTotalCustomerCount] = useState(0)
  const [countPerPage, setCountPerPage] = useState(100)
  const [activePageNo, setActivePageNo] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null)
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<
    string | null
  >(null)
  const [addressForMarkers, setAddressForMarkers] = useState<MarkerData[]>([])
  const [province, setProvince] = useState('')
  const [isMapShowing, setIsMapShowing] = useState(false)

  const {
    loading: PROVINCE_LOADING,
    error: PROVINCE_ERROR,
    data: PROVINCE_LIST,
  } = useQuery(GET_PROVINCE_LIST)

  const [getCounties, { data: COUNTY_LIST }] = useLazyQuery(
    GET_COUNTY_LIST_BY_PROVINCE,
  )
  const [getNeighborhoods, { data: NEIGHBORHOOD_LIST }] = useLazyQuery(
    GET_NEIGHBORHOOD_LIST_BY_COUNTY,
  )
  const [
    getCustomerAddresses,
    { loading: CUSTOMERS_LOADING, data: CUSTOMERS_LIST },
  ] = useLazyQuery(GET_CUSTOMERS_BY_ADDRESS)

  const [
    getCustomersByProvinceAndCounty,
    {
      loading: CUSTOMERS_LOADING_BY_PROVINCE_AND_COUNTY,
      data: CUSTOMERS_LIST_BY_PROVINCE_AND_COUNTY,
    },
  ] = useLazyQuery(GET_CUSTOMERS_BY_PROVINCE_AND_COUNTY)
  const [
    getCustomersByProvince,
    {
      loading: CUSTOMERS_LOADING_BY_PROVINCE,
      data: CUSTOMERS_LIST_BY_PROVINCE,
    },
  ] = useLazyQuery(GET_CUSTOMERS_BY_PROVINCE)

  useEffect(() => {
    if (dealers) {
      setAddressForMarkers(
        _.map(dealers, (customer) => ({
          id: customer.CustomerID.toString(),
          customerId: customer.CustomerID.toString(),
          title: customer.Title,
          address: customer.CustomerAdresses[0]?.FullAddress ?? '',
        })),
      )
    }
  }, [dealers])

  // Fetch customer data when filters change
  useEffect(() => {
    if (selectedProvince && selectedCounty && selectedNeighborhood) {
      getCustomerAddresses({
        variables: {
          provinceId: parseInt(selectedProvince),
          countyId: parseInt(selectedCounty),
          neighborhoodId: parseInt(selectedNeighborhood),
        },
      })
    }
    if (selectedProvince && selectedCounty && !selectedNeighborhood) {
      getCustomersByProvinceAndCounty({
        variables: {
          provinceId: parseInt(selectedProvince),
          countyId: parseInt(selectedCounty),
        },
      })
    }
    if (selectedProvince && !selectedCounty && !selectedNeighborhood) {
      getCustomersByProvince({
        variables: {
          provinceId: parseInt(selectedProvince),
        },
      })
    }
    setProvince(
      PROVINCE_LIST?.IL?.find(
        (province) => province.Id === parseInt(selectedProvince ?? ''),
      )?.IlAd,
    )
  }, [selectedProvince, selectedCounty, selectedNeighborhood])

  // Update dealers when customer list changes
  useEffect(() => {
    setDealers([])
    if (!CUSTOMERS_LOADING && CUSTOMERS_LIST) {
      const uniqueCustomers = CUSTOMERS_LIST?.AddressMatchings.reduce(
        (map, item) => {
          if (!map.has(item.Customer.CustomerID)) {
            map.set(item.Customer.CustomerID, item.Customer)
          }
          return map
        },
        new Map(),
      )
      setDealers(Array.from(uniqueCustomers.values()))
    }
  }, [CUSTOMERS_LIST])

  // Update dealers when customer list changes
  useEffect(() => {
    setDealers([])
    if (
      !CUSTOMERS_LOADING_BY_PROVINCE_AND_COUNTY &&
      CUSTOMERS_LIST_BY_PROVINCE_AND_COUNTY
    ) {
      const uniqueCustomers =
        CUSTOMERS_LIST_BY_PROVINCE_AND_COUNTY?.AddressMatchings.reduce(
          (map, item) => {
            if (!map.has(item.Customer.CustomerID)) {
              map.set(item.Customer.CustomerID, item.Customer)
            }
            return map
          },
          new Map(),
        )
      setDealers(Array.from(uniqueCustomers.values()))
    }
  }, [CUSTOMERS_LIST_BY_PROVINCE_AND_COUNTY])

  // Update dealers when customer list changes
  useEffect(() => {
    setDealers([])
    if (!CUSTOMERS_LOADING_BY_PROVINCE && CUSTOMERS_LIST_BY_PROVINCE) {
      const uniqueCustomers =
        CUSTOMERS_LIST_BY_PROVINCE?.AddressMatchings.reduce((map, item) => {
          if (!map.has(item.Customer.CustomerID)) {
            map.set(item.Customer.CustomerID, item.Customer)
          }
          return map
        }, new Map())
      setDealers(Array.from(uniqueCustomers.values()))
    }
  }, [CUSTOMERS_LIST_BY_PROVINCE])

  // Handle province selection
  const handleProvinceChange = (id) => {
    setSelectedProvince(id)
    setSelectedCounty(null)
    setSelectedNeighborhood(null)
    setDealers([])
    getCounties({ variables: { provinceId: parseInt(id) } })
  }

  // Handle county selection
  const handleCountyChange = (id) => {
    setSelectedCounty(id)
    setSelectedNeighborhood(null)
    setDealers([])
    getNeighborhoods({ variables: { countyId: parseInt(id) } })
  }

  // Render loading or error states
  useEffect(() => {
    if (PROVINCE_LOADING || CUSTOMERS_LOADING) {
    } else if (PROVINCE_LIST && CUSTOMERS_LIST) {
    } else if (PROVINCE_ERROR || CUSTOMERS_LOADING) {
      toast.error(`Hata: ${PROVINCE_ERROR?.message || CUSTOMERS_LOADING}`)
    }
  }, [
    PROVINCE_LOADING,
    CUSTOMERS_LOADING,
    PROVINCE_LIST,
    CUSTOMERS_LIST,
    PROVINCE_ERROR,
  ])

  if (PROVINCE_LOADING || CUSTOMERS_LOADING) return null

  return (
    <div className="card card-grid min-w-full">
      <div className="card-header flex-wrap gap-2">
        <div className="flex flex-wrap gap-2 lg:gap-5">
          <Dropdown
            options={PROVINCE_LIST?.IL || []}
            selectedValue={selectedProvince}
            onChange={handleProvinceChange}
            labelKey={'IlAd'}
            valueKey={'Id'}
            placeholder={'İl Seçiniz...'}
          />

          <Dropdown
            options={COUNTY_LIST?.Ilce || []}
            selectedValue={selectedCounty}
            onChange={handleCountyChange}
            labelKey={'IlceAd'}
            valueKey={'Id'}
            placeholder={'İlçe Seçiniz...'}
          />

          <Dropdown
            options={NEIGHBORHOOD_LIST?.Neighborhoods || []}
            selectedValue={selectedNeighborhood}
            onChange={setSelectedNeighborhood}
            labelKey={'NeighborhoodName'}
            valueKey={'NeighborhoodID'}
            placeholder={'Mahalle Seçiniz...'}
          />
        </div>
      </div>

      <div className="card-header flex-wrap gap-2 justify-end">
        <div className="flex flex-wrap gap-2 lg:gap-5 flex">
          <span
            onClick={() => setIsMapShowing(!isMapShowing)}
            className={`menu-arrow text-gray-600 menu-item-here:text-gray-800 menu-item-show:text-gray-800 menu-link-hover:text-gray-800 cursor-pointer`}
          >
            {isMapShowing ? 'Haritayı Gizle ' : 'Haritayı Göster '}
            <i
              className={`${
                isMapShowing
                  ? 'ki-filled ki-up text-xs'
                  : 'ki-filled ki-down text-xs'
              }`}
            ></i>
          </span>
        </div>
        {isMapShowing && (
          <GoogleMapComponent
            centerAddress={province}
            markers={addressForMarkers}
            regions={[]}
          />
        )}
      </div>

      <div className="card-body">
        {dealers.length > 0 ? (
          <DealersTable dealers={dealers} />
        ) : (
          <div className="flex flex-col items-center justify-center h-64 m-56">
            <Image
              src={NoData}
              alt="No Dealers Found"
              className="w-72 h-72 mb-4"
            />
            <p className="text-lg font-semibold text-gray-500">
              Veri bulunamadı.
            </p>
          </div>
        )}
      </div>

      <div className="card-footer">
        <Pagination
          activePageNo={activePageNo}
          countPerPage={countPerPage}
          setActivePageNo={setActivePageNo}
          totalCount={totalCustomerCount}
        />
      </div>
    </div>
  )
}

DealersByAddressPage.title = 'Adresten Bayi Kapsamı'
DealersByAddressPage.breadcrumbs = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Adresten Bayi Kapsamı' },
]

export default DealersByAddressPage
