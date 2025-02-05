export type FieldType =
  | 'text'
  | 'number'
  | 'checkbox'
  | 'switch'
  | 'textarea'
  | 'image'
  | 'select'
  | 'date'
  | 'email'
  | 'tel'
  | 'password'
  | 'custom'

export interface SelectOption {
  value: string | number
  label: string
}

export interface DetailField {
  name: string
  label?: string
  type: FieldType
  placeholder?: string
  required?: boolean
  options?: SelectOption[]
  disabled?: boolean
  customRender?: (
    field: DetailField,
    value: any,
    onChange: (value: any) => void,
  ) => React.ReactNode
}

export interface DetailSection {
  id: string
  title: string
  fields?: DetailField[]
  customRender?: (data: any) => React.ReactNode
  collapsible?: boolean
  defaultCollapsed?: boolean
  description?: string
  actions?: Array<{
    label: string
    variant:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'danger'
      | 'warning'
      | 'info'
      | 'light'
      | 'dark'
    size?: 'sm' | 'md' | 'lg'
    onClick?: () => void
  }>
}

export interface DetailPageProps {
  title: string
  sections: DetailSection[]
  data: Record<string, any>
  loading?: boolean
  isNew?: boolean
  imageData?: Array<{
    Content: string
    ContentType: string
  }>
  onImageChange?: (field: DetailField, files: FileList) => void
  onImageRemove?: (field: DetailField, index: number) => void
  onChange: (name: string, value: any) => void
  onSave?: () => void
  onDelete?: () => void
  renderCustomField?: (
    field: DetailField,
    value: any,
    onChange: (value: any) => void,
  ) => React.ReactNode
  saveButtonText?: string
  deleteButtonText?: string
  deleteConfirmText?: string
  deleteWarningText?: string
  detailPageActions?: {
    delete?: {
      title: string
      confirmText: string
      warningText: string
      onConfirm: () => Promise<void>
    }
  }
}
