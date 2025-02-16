/**
 * Phone number formatting utilities
 */

/**
 * Removes all non-digit characters from a string
 * @param value - The string to clean
 */
export const cleanNonDigits = (value: string): string => {
  return value.replace(/\D/g, '')
}

/**
 * Removes plus sign from a string
 * @param value - The string to clean
 */
export const removePlusSign = (value: string): string => {
  return value.replace(/\+/g, '')
}

/**
 * Removes country code from the beginning of a phone number
 * @param phoneNumber - The full phone number
 * @param countryCode - The country code to remove
 */
export const removeCountryCode = (
  phoneNumber: string,
  countryCode: number,
): string => {
  return phoneNumber.replace(new RegExp(`^${countryCode}`), '')
}

/**
 * Formats a phone number for API submission
 * @param phoneNumber - The full phone number including country code
 * @param countryCode - The country code
 */
export const formatPhoneNumber = (
  phoneNumber: string,
  countryCode: number,
): string => {
  const withoutPlus = removePlusSign(phoneNumber)
  const withoutCountryCode = removeCountryCode(withoutPlus, countryCode)
  return cleanNonDigits(withoutCountryCode)
}

/**
 * Extracts country code from a dial code string
 * @param dialCode - The dial code (e.g., "+90")
 */
export const extractCountryCode = (dialCode: string): number => {
  return parseInt(removePlusSign(dialCode))
}
