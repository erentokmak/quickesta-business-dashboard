import React from 'react'
import { DetailField, DetailPageProps } from '@/types'
import {
  renderTextField,
  renderTextArea,
  renderSelect,
  renderSwitch,
  renderCheckbox,
  renderImage,
  renderCustomField,
  renderCustom,
  renderFieldWithLabel,
} from '@/utils/components/formRenderers'

/**
 * BaseDetailCard: Detay sayfalarında kullanılan ana kart komponenti
 * Props:
 * - sections: Kartın bölümleri
 * - data: Gösterilecek veri
 * - loading: Yükleniyor durumu
 * - imageData: Resim verileri
 * - onImageChange: Resim değişikliği handler'ı
 * - onImageRemove: Resim silme handler'ı
 * - onChange: Veri değişikliği handler'ı
 * - renderCustomField: Özel alan render fonksiyonu
 */
const BaseDetailCard: React.FC<DetailPageProps> = ({
  sections,
  data,
  loading,
  imageData,
  onImageChange,
  onImageRemove,
  onChange,
  renderCustomField: customFieldRenderer,
}) => {
  if (loading) return null

  /**
   * Nested obje içindeki değeri path'e göre alır
   * Örnek: "customer.address.city" -> data.customer.address.city
   */
  const getNestedValue = (obj: any, path: string) => {
    return path
      .split('.')
      .reduce((acc, part) => (acc ? acc[part] : undefined), obj)
  }

  /**
   * Field tipine göre uygun render fonksiyonunu çağırır
   * 1. Önce değeri alır
   * 2. CustomRender varsa değeri işler
   * 3. Field tipine göre uygun renderer'ı çağırır
   */
  const renderField = (field: DetailField) => {
    const value = getNestedValue(data, field.name)
    const customValue = field.customRender
      ? field.customRender(field, value, (val) => onChange(field.name, val))
      : value

    // Custom type için
    if (field.type === 'custom') {
      return renderFieldWithLabel(
        field,
        renderCustom(field, value, onChange, customFieldRenderer),
      )
    }

    // Diğer tipler için normal switch-case yapısı
    switch (field.type) {
      case 'text':
      case 'number':
      case 'email':
      case 'tel':
      case 'password':
        return renderTextField(field, customValue, onChange)
      case 'textarea':
        return renderTextArea(field, customValue, onChange)
      case 'select':
        return renderSelect(field, customValue, onChange)
      case 'switch':
        return renderSwitch(field, customValue, onChange)
      case 'checkbox':
        return renderCheckbox(field, customValue, onChange)
      case 'image':
        return renderImage(
          field,
          imageData,
          (field, files) => onImageChange?.(field, files),
          onImageRemove,
        )
    }
  }

  /**
   * Ana render fonksiyonu
   * Sections array'ini render eder
   */
  return (
    <div className="flex flex-col items-stretch grow gap-5 lg:gap-7.5">
      {sections.map((section, index) => (
        // Her section için bir kart oluştur
        <div key={index} className="card pb-2.5" id={section.id}>
          {/* Kart başlığı */}
          <div className="card-header">
            <h3 className="card-title">{section.title}</h3>
          </div>

          {/* Kart içeriği */}
          <div className="card-body grid gap-5">
            {/* Varsa açıklama göster */}
            {section.description && (
              <p className="text-2sm text-gray-700">{section.description}</p>
            )}

            {/* İçerik Render Logic:
                1. Section'ın custom render'ı varsa onu kullan
                2. Yoksa field'ları map'le ve her birini renderField ile render et */}
            {section.customRender
              ? section.customRender(data) // Tüm section için özel render
              : section.fields?.map((field) => (
                  <div
                    key={field.name}
                    className={field.type === 'image' ? '' : 'w-full'}
                  >
                    {renderField(field)}
                  </div>
                ))}

            {/* Varsa action butonlarını göster */}
            {section.actions && (
              <div className="flex justify-end pt-2.5">
                {section.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={`btn btn-${action.variant}`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default BaseDetailCard
