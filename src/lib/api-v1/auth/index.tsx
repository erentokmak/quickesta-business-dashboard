import axiosInstance from '../client'
import { ILoginRequest, IRegisterRequest, IAuthResponse } from '@/types/auth'

export const login = async (data: ILoginRequest): Promise<IAuthResponse> => {
  const response = await axiosInstance.post(
    `/authentication/identity/v1/identity/login`,
    data,
  )
  return response.data
}

export const register = async (data: IRegisterRequest): Promise<IAuthResponse> => {
  const response = await axiosInstance.post(
    `/authentication/identity/v1/user/registerUser`,
    data,
  )
  return response.data
}
