import axiosInstance from '../client'

export const login = async (data: any) => {
  const response = await axiosInstance.post(`/login`, data)
  return response.data
}
