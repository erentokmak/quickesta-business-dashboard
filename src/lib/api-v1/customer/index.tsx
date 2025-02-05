import axiosInstance from '../client'

export const getCustomerAdressByCustomerID = async (CustomerID: any) => {
  const response = await axiosInstance.post(
    `/getcustomeradressbycustomerid/${CustomerID}`,
  )
  return response.data.Data
}

export const getCustomerByCustomerID = async (CustomerID: any) => {
  const response = await axiosInstance.post(
    `/getcustomerbycustomerid/${CustomerID}`,
  )
  return response.data.Data
}
