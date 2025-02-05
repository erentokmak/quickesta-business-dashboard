import moment from 'moment'

export const formatDate = (date: string | Date) => {
  if (!date) return ''
  return moment(date).format('DD/MM/YYYY HH:mm')
}

export const formatCurrency = (amount: number) => {
  return (
    new Intl.NumberFormat('tr-TR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount) + ' TL'
  )
}

export const formatPhoneNumber = (phone: string) => {
  if (!phone) return ''
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '')
  // Format as (555) 555-5555
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/)
  if (match) {
    return `+90 ${match[1]} ${match[2]} ${match[3]} ${match[4]}`
  }
  return phone
}
