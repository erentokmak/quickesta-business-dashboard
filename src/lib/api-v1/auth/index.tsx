import axiosInstance from '../client'
import { ILoginRequest, IRegisterRequest, IAuthResponse } from '@/types/auth'

export const login = async (data: ILoginRequest): Promise<IAuthResponse> => {
  const response = await axiosInstance.post(
    `/authentication/identity/v1/identity/login`,
    data,
  )
  return response.data
}

export const register = async (
  data: IRegisterRequest,
): Promise<IAuthResponse> => {
  const response = await axiosInstance.post(
    `/authentication/identity/v1/user/registerUser`,
    data,
  )
  return response.data
}

export const logout = async (accessToken: string): Promise<number> => {
  try {
    const response = await axiosInstance.post(
      `/authentication/identity/v1/identity/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.status
  } catch (error: any) {
    if (error.response?.status == 401) {
      return 401
    }
    throw error
  }
}
