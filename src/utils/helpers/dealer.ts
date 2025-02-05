import { DetailField, DetailSection } from '@/types/components/forms/detail'

const renderPlaintext = (value: any) => value?.toString() || ''

export const getInitialDealerData = () => ({
  CustomerID: 0,
  Title: '',
  TaxOffice: '',
  Identifier: '',
  PhoneNumber: '',
  Mail: '',
  WebAdress: '',
  IsEInvoice: false,
  IsPassive: false,
})

export const DealerFieldTypes = {
  IsEInvoice: { type: 'boolean' as const, defaultValue: false },
  IsPassive: { type: 'boolean' as const, defaultValue: false },
}

const getBasicInfoFields = (): DetailField[] => [
  {
    name: 'CustomerID',
    label: 'Bayi ID',
    type: 'text',
    required: false,
    disabled: true,
  },
  {
    name: 'Title',
    label: 'Bayi Adı',
    type: 'text',
    required: false,
    disabled: true,
  },
  {
    name: 'TaxOffice',
    label: 'Vergi Dairesi',
    type: 'text',
    required: false,
    disabled: true,
  },
  {
    name: 'Identifier',
    label: 'Vergi Numarası',
    type: 'text',
    required: false,
    disabled: true,
  },
  {
    name: 'PhoneNumber',
    label: 'Telefon',
    type: 'text',
    required: false,
    disabled: true,
  },
  {
    name: 'Mail',
    label: 'E-posta',
    type: 'text',
    required: false,
    disabled: true,
  },
  {
    name: 'WebAdress',
    label: 'Web Adresi',
    type: 'text',
    required: false,
    disabled: true,
  },
]

const getStatusFields = (): DetailField[] => [
  {
    name: 'IsEInvoice',
    label: 'E-Fatura',
    type: 'switch',
    required: false,
  },
  {
    name: 'IsPassive',
    label: 'Pasif',
    type: 'switch',
    required: false,
  },
]

export const getDealerSections = (
  isNewDealer: boolean,
  handleDelete?: () => Promise<void>,
): DetailSection[] => [
  {
    id: 'basic',
    title: 'Temel Bilgiler',
    fields: getBasicInfoFields(),
  },
  {
    id: 'status',
    title: 'Durum Bilgileri',
    fields: getStatusFields(),
  },
]
