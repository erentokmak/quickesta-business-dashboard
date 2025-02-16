import axiosInstance from '../client'

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
  // Format the mobile number by removing the country code and any non-digit characters
  const formattedNumber = data.mobileNumber
    .replace(`+${data.countryCode}`, '') // Remove country code
    .replace(/\D/g, '') // Remove any non-digit characters

  const registerData = {
    ...data,
    mobileNumber: formattedNumber,
    confirmPassword: data.password,
  }

  // Log the formatted data
  console.log('Registering with data:', registerData)

  const response = await axiosInstance.post(
    `/authentication/identity/v1/identity/registerUser`,
    registerData,
  )
  return response.data
}
