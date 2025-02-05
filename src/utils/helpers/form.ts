type FieldTypeMap = {
  [key: string]: {
    type: 'number' | 'boolean' | 'string'
    defaultValue: any
  }
}

/**
 * Converts form field values based on field type
 * @param name Field name
 * @param value Field value
 * @param typeMap Field type mapping configuration
 * @returns Converted value
 */
export const convertFieldValue = (
  name: string,
  value: any,
  typeMap: FieldTypeMap,
): any => {
  if (!typeMap[name]) return value

  const { type, defaultValue } = typeMap[name]

  switch (type) {
    case 'number':
      return parseFloat(value) || defaultValue
    case 'boolean':
      return Boolean(value)
    default:
      return value || defaultValue
  }
}

/**
 * Creates a form change handler with type conversion
 * @param setFormData Form data setter function
 * @param typeMap Field type mapping configuration
 * @returns Form change handler function
 */
export const createFormChangeHandler = (
  setFormData: (value: any) => void,
  typeMap: FieldTypeMap,
) => {
  return (name: string, value: any) => {
    const convertedValue = convertFieldValue(name, value, typeMap)
    setFormData((prev: any) => ({ ...prev, [name]: convertedValue }))
  }
}

export const handleFormChange = (
  onChange: (name: string, value: any) => void,
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
) => {
  const { name, value, type } = e.target
  onChange(
    name,
    type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
  )
}

export const processImageFiles = async (
  files: FileList,
): Promise<Array<{ Content: string; ContentType: string }>> => {
  return Promise.all(
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
}

export const getImageArray = (imageData: any) => {
  return Array.isArray(imageData) ? imageData : imageData ? [imageData] : []
}
