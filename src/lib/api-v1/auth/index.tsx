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
  const response = await axiosInstance.post(
    `/authentication/identity/v1/identity/registerUser`,
    {
      ...data,
      confirmPassword: data.password,
    },
  )
  return response.data
}
