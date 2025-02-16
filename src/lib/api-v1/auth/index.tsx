import axiosInstance from '../client'
import { formatPhoneNumber } from '@/utils/formatters/phone'

export const login = async (data: any) => {
  const response = await axiosInstance.post(
    `/authentication/identity/v1/identity/login`,
    data,
  )
  return response.data
}

export const register = async (data: {
  name: string
  surname: string
  email: string
  password: string
  mobileNumber: string
  countryCode: number
}) => {
  const registerData = {
    ...data,
    mobileNumber: formatPhoneNumber(data.mobileNumber, data.countryCode),
    confirmPassword: data.password,
  }

  // Log the formatted data
  console.log('Registering with data:', registerData)

  const response = await axiosInstance.post(
    `/authentication/identity/v1/user/registerUser`,
    registerData,
  )
  return response.data
}
