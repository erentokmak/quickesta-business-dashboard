import { useQuery } from '@apollo/client'
import {
  GET_ORDERS_WITH_SEARCH,
  GET_ORDERS_WITHOUT_SEARCH,
  OrdersQueryVariables,
} from '@/graphql/queries/orders'
import { OrderStatusID } from '@/types/enums'
import moment from 'moment'

interface UseOrdersProps {
  searchTerm: string
  activePageNo: number
  itemsPerPage: number
  statusFilter: {
    value: OrderStatusID | number
    onChange: (value: OrderStatusID | number) => void
    options: Array<{ value: OrderStatusID | number; label: string }>
  }
  startDate: string
  endDate: string
}

export const useOrders = ({
  searchTerm,
  activePageNo,
  itemsPerPage,
  statusFilter,
  startDate,
  endDate,
}: UseOrdersProps) => {
  const variables: OrdersQueryVariables = {
    offset: (activePageNo - 1) * itemsPerPage,
    limit: itemsPerPage,
    statusId: Number(statusFilter.value),
    startDate: startDate || moment().format('YYYY-MM-DD'),
    endDate: endDate || moment().add(1, 'days').format('YYYY-MM-DD'),
    order_by: [{ OrderDate: 'desc' }],
  }

  // Arama varsa where koşulunu hazırla
  const trimmedTerm = searchTerm?.trim()
  if (trimmedTerm) {
    const searchConditions = /^\d+$/.test(trimmedTerm)
      ? [
          { OrderNumber: { _like: `%${trimmedTerm}%` } },
          { OrderID: { _eq: parseInt(trimmedTerm) } },
          { Customer: { Title: { _like: `%${trimmedTerm}%` } } },
          { Customer: { PhoneNumber: { _like: `%${trimmedTerm}%` } } },
          { DeliveryInformation: { _like: `%${trimmedTerm}%` } },
        ]
      : [
          { OrderNumber: { _like: `%${trimmedTerm}%` } },
          { Customer: { Title: { _like: `%${trimmedTerm}%` } } },
          { Customer: { PhoneNumber: { _like: `%${trimmedTerm}%` } } },
          { DeliveryInformation: { _like: `%${trimmedTerm}%` } },
        ]

    variables.where = { _or: searchConditions }
  } else {
    // Arama yoksa boş bir where koşulu gönder
    variables.where = { _or: [] }
  }

  const { data, loading, error, refetch } = useQuery(
    searchTerm.trim() ? GET_ORDERS_WITH_SEARCH : GET_ORDERS_WITHOUT_SEARCH,
    {
      variables,
      fetchPolicy: 'network-only',
    },
  )

  return {
    orders: data?.Orders || [],
    totalOrderCount: data?.Orders_aggregate?.aggregate?.count || 0,
    loading,
    error,
    refetch,
    queryVariables: variables,
  }
}
