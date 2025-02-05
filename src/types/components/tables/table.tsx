import { OrderStatusID } from '@/types/enums'
import { Stock, Order, Customer } from '../../models'

export interface Column<T> {
  key: keyof T | 'actions'
  title: string
  visible: boolean
  render?: (item: T) => React.ReactNode
}

export interface BaseTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => string | number
  searchTerm?: string
  onSearchChange?: (value: string) => void
  activePageNo?: number
  itemsPerPage?: number
  onPageChange?: (page: number) => void
  onItemsPerPageChange?: (count: number) => void
  totalCount?: number
  searchPlaceholder?: string
  statusFilter?: {
    value: any
    onChange: (value: any) => void
    options: { value: any; label: string }[]
  }
  isLoading?: boolean
  error?: Error | null
  entityName?: string
  searchableFields?: string[]
  filterFn?: (item: T, searchTerm: string) => boolean
  isServerSide?: boolean
  dateInputs?: {
    startDate: string
    endDate: string
    onStartDateChange: (date: string) => void
    onEndDateChange: (date: string) => void
  }
  renderExpandedContent?: (item: T) => React.ReactNode
}

export interface StockTableProps {
  stocks: Stock[]
  searchTerm?: string
  onSearchChange?: (value: string) => void
  activePageNo?: number
  itemsPerPage?: number
  onPageChange?: (page: number) => void
  onItemsPerPageChange?: (count: number) => void
  totalStockCount?: number
  isLoading?: boolean
  error?: Error | null
}

export interface OrdersTableProps {
  orders: Order[]
  searchTerm: string
  onSearchChange: (value: string) => void
  activePageNo: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (count: number) => void
  totalOrderCount: number
  isLoading: boolean
  error: any
  statusFilter: {
    value: OrderStatusID
    onChange: (value: OrderStatusID) => void
    options: Array<{ value: OrderStatusID; label: string }>
  }
  startDate: string
  endDate: string
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
}

export interface CustomersTableProps {
  customers: Customer[]
}

export interface DealersTableProps {
  dealers: Customer[]
}
