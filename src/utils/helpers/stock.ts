import { Stock } from '@/types/models/stock'
import { DetailField, DetailSection } from '@/types/components/forms/detail'

// Field type mapping for stock form
export const StockFieldTypes = {
  BuyingVatRate: { type: 'number', defaultValue: 0 },
  SalesVatRate: { type: 'number', defaultValue: 0 },
  Price: { type: 'number', defaultValue: 0 },
  IsActive: { type: 'boolean', defaultValue: true },
} as const

export const getInitialStockData = () => ({
  StockID: 0,
  StockCode: '',
  StockName: '',
  StockNameEng: '',
  BuyingVatRate: 0,
  SalesVatRate: 0,
  Description: '',
  Price: 0,
  IsActive: true,
})

export const handleStockImageChange = async (
  field: DetailField,
  files: FileList,
  setPreviewImages: (
    images: Array<{ Content: string; ContentType: string }>,
  ) => void,
) => {
  const previews = await Promise.all(
    Array.from(files).map(
      (file) =>
        new Promise<{ Content: string; ContentType: string }>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve({
              Content: (reader.result as string).split(',')[1],
              ContentType: file.type,
            })
          }
          reader.readAsDataURL(file)
        }),
    ),
  )
  setPreviewImages(previews)
}

export const getStockSections = (
  isNewStock: boolean,
  handleDelete: () => void,
): DetailSection[] => {
  const sections: DetailSection[] = [
    {
      title: 'Temel Bilgiler',
      id: 'temel-bilgiler',
      fields: [
        {
          name: 'StockName',
          label: 'Stok Adı',
          type: 'text' as const,
          placeholder: 'Stok adını giriniz',
          required: true,
        },
        {
          name: 'StockCode',
          label: 'Stok Kodu',
          type: 'text' as const,
          placeholder: 'Stok kodunu giriniz',
          required: true,
        },
        {
          name: 'Description',
          label: 'Açıklama',
          type: 'text' as const,
          placeholder: 'Açıklama giriniz',
        },
        {
          name: 'IsActive',
          label: 'Durum',
          type: 'switch' as const,
        },
      ],
    },
    {
      title: 'Medya',
      id: 'medya',
      fields: [
        {
          name: 'StockImage',
          label: 'Stok Görseli',
          type: 'image' as const,
        },
      ],
    },
    {
      title: 'Finansal Bilgiler',
      id: 'finansal-bilgiler',
      fields: [
        {
          name: 'SalesVatRate',
          label: 'KDV Oranı (%)',
          type: 'number' as const,
          placeholder: 'KDV oranını giriniz',
        },
        {
          name: 'Price',
          label: 'Fiyat',
          type: 'number' as const,
          placeholder: 'Fiyat giriniz',
        },
      ],
    },
  ]

  {
    /*if (!isNewStock) {
    sections.push({
      title: 'Kaydı Sil',
      id: 'kaydi-sil',
      description:
        'Bu kaydı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
      fields: [
        {
          name: 'confirmDelete',
          label: 'Silme işlemini onaylıyorum',
          type: 'checkbox' as const,
        },
      ],
      actions: [
        {
          label: 'Kaydı Sil',
          variant: 'danger',
          size: 'sm',
          onClick: handleDelete,
        },
      ],
    })
  } */
  }

  return sections
}
