import React from 'react'

interface DropdownProps<T> {
  options: T[]
  selectedValue: string | null
  onChange: (id: string) => void
  labelKey: keyof T
  valueKey: keyof T
  placeholder?: string
  className?: string
}

const Dropdown = <T,>({
  options,
  selectedValue,
  onChange,
  labelKey,
  valueKey,
  placeholder = 'Seçiniz...',
  className = 'select select-sm w-40',
}: DropdownProps<T>) => {
  return (
    <select
      className={className}
      value={selectedValue || ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={!options.length}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option[valueKey] as string}>
          {option[labelKey] as string}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
