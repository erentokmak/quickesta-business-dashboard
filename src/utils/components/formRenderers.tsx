import React from 'react'
import Image from 'next/image'
import { DetailField } from '@/types'
import { handleFormChange, getImageArray } from '@/utils/helpers/form'

export const renderTextField = (
  field: DetailField,
  value: any,
  onChange: (name: string, value: any) => void,
) => (
  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
    <label className="form-label flex items-center gap-1 max-w-56">
      {field.label}
      {field.required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={field.type}
      name={field.name}
      value={value || ''}
      onChange={(e) => handleFormChange(onChange, e)}
      placeholder={field.placeholder}
      className="input"
      required={field.required}
      disabled={field.disabled}
    />
  </div>
)

export const renderTextArea = (
  field: DetailField,
  value: any,
  onChange: (name: string, value: any) => void,
) => (
  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
    <label className="form-label flex items-center gap-1 max-w-56">
      {field.label}
      {field.required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={field.name}
      value={value || ''}
      onChange={(e) => handleFormChange(onChange, e)}
      placeholder={field.placeholder}
      className="input"
      required={field.required}
      disabled={field.disabled}
    />
  </div>
)

export const renderSelect = (
  field: DetailField,
  value: any,
  onChange: (name: string, value: any) => void,
) => (
  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
    <label className="form-label flex items-center gap-1 max-w-56">
      {field.label}
    </label>
    <div className="grow">
      <select
        className="select"
        name={field.name}
        value={value || ''}
        onChange={(e) => handleFormChange(onChange, e)}
        disabled={field.disabled}
      >
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
)

export const renderSwitch = (
  field: DetailField,
  value: any,
  onChange: (name: string, value: any) => void,
) => (
  <div className="flex items-center flex-wrap gap-2.5">
    <label className="form-label max-w-56">{field.label}</label>
    <div className="grow">
      <label className="switch">
        <span className="switch-label"></span>
        <input
          type="checkbox"
          name={field.name}
          checked={value || false}
          onChange={(e) => handleFormChange(onChange, e)}
          disabled={field.disabled}
        />
      </label>
    </div>
  </div>
)

export const renderCheckbox = (
  field: DetailField,
  value: any,
  onChange: (name: string, value: any) => void,
) => (
  <div className="flex items-center flex-wrap gap-2.5">
    <div className="grow">
      <label className="checkbox-group">
        <input
          className="checkbox"
          type="checkbox"
          name={field.name}
          checked={value || false}
          onChange={(e) => handleFormChange(onChange, e)}
          disabled={field.disabled}
        />
        <span className="checkbox-label">{field.label}</span>
      </label>
    </div>
  </div>
)

export const renderImage = (
  field: DetailField,
  imageData: any,
  onImageChange: (field: DetailField, files: FileList) => void,
  onImageRemove?: (field: DetailField, index: number) => void,
) => {
  const images = getImageArray(imageData)
  return (
    <div key={field.name} className="flex flex-col gap-5">
      <div className="grid grid-cols-10 gap-2.5">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden border border-gray-200"
          >
            <Image
              src={`data:${img.ContentType};base64,${img.Content}`}
              alt={`${field.label} ${index + 1}`}
              fill
              className="object-cover"
            />
            {!field.disabled && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onImageRemove?.(field, index)
                }}
                className="btn btn-icon btn-icon-xs btn-light shadow-default absolute z-1 size-4 top-1 right-1 rounded-full"
              >
                <i className="ki-filled ki-cross text-xs"></i>
              </button>
            )}
          </div>
        ))}
        {!field.disabled && (
          <div
            className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 hover:bg-gray-50 cursor-pointer flex flex-col items-center justify-center gap-1 p-2.5 text-center"
            onClick={() =>
              document
                .querySelector<HTMLInputElement>(`input[name="${field.name}"]`)
                ?.click()
            }
          >
            <div className="size-8 flex items-center justify-center bg-gray-100 rounded-lg">
              <i className="ki-solid ki-picture text-lg text-gray-500"></i>
            </div>
            <span className="text-2xs text-gray-600">Görsel Ekle</span>
          </div>
        )}
      </div>
      <span className="text-2xs text-gray-500">
        Maksimum 10MB boyutunda .jpeg, .jpg, .png, .webp ya da .mp4 türlerinde
        dosya yükleyebilirsiniz.
      </span>
      <input
        accept=".png, .jpg, .jpeg, .webp, .mp4"
        name={field.name}
        type="file"
        multiple
        onChange={(e) => e.target.files && onImageChange(field, e.target.files)}
        className="hidden"
        disabled={field.disabled}
      />
    </div>
  )
}

export const renderCustomField = (
  field: DetailField,
  value: any,
  onChange: (name: string, value: any) => void,
) => {
  if (field.customRender) {
    return field.customRender(field, value, (val) => onChange(field.name, val))
  }
  return null
}

/**
 * Özel render fonksiyonlarını işler
 * 1. Field'ın kendi customRender'ı varsa onu kullanır
 * 2. Global renderCustomField varsa onu kullanır
 */
export const renderCustom = (
  field: DetailField,
  value: any,
  onChange: (name: string, value: any) => void,
  customFieldRenderer?: (
    field: DetailField,
    value: any,
    onChange: (value: any) => void,
  ) => React.ReactNode,
) => {
  if (customFieldRenderer) {
    return customFieldRenderer(field, value, (val) => onChange(field.name, val))
  }
  return renderCustomField(field, value, onChange)
}

/**
 * Tüm field tipleri için ortak UI yapısı
 */
export const renderFieldWithLabel = (
  field: DetailField,
  content: React.ReactNode,
) => (
  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
    {field.label && (
      <label className="form-label flex items-center gap-1 max-w-56">
        {field.label}
      </label>
    )}
    <div className="grow form-control-plaintext">{content}</div>
  </div>
)
