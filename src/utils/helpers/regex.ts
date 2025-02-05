const tenDigits = new RegExp('^\\d{10}$')

export default function formatPhoneNumber(phoneNumber) {
  if (!tenDigits.test(phoneNumber)) return phoneNumber
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+90 $1 $2 $3 $4')
}
