import axiosInstance from '../client'

export const login = async (data: any) => {
  const response = await axiosInstance.post(`/authentication/identity/v1/identity/login`, data)
  return response.data
}
