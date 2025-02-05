export interface SearchFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export interface ShowingProps {
  perPage: number
  setCountPerPage: (count: number) => void
  values: number[]
}

export interface PaginationProps {
  activePageNo: number
  countPerPage: number
  setActivePageNo: (page: number) => void
  totalCount: number
}

export interface DirectCardProps {
  icon: string
  title: string
  description: string
  href: string
}

export interface ActionToolbarProps {
  title?: string
  breadcrumbs?: Array<{
    label: string
    href?: string
  }>
  actions?: React.ReactNode
}

export interface DropdownProps {
  options: any[]
  selectedValue: string | null
  onChange: (value: string) => void
  labelKey: string
  valueKey: string
  placeholder: string
}
