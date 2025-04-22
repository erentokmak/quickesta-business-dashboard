import { gql } from '@apollo/client'

export const GET_USER_BUSINESSES = gql`
  query GetUserBusinesses($owner_id: uuid!) {
    businesses(
      where: { 
        owner_id: { _eq: $owner_id },
        is_deleted: { _eq: false }
      }
      order_by: { created_at: desc }
    ) {
      id
      name
      business_type_id
      phone
      email
      address
      status
      created_at
    }
  }
`

export interface Business {
  id: string
  name: string
  business_type_id: string
  phone: string
  email: string
  address: string
  status: string
  created_at: string
}

export interface GetUserBusinessesVariables {
  owner_id: string
}

export interface GetUserBusinessesResponse {
  businesses: Business[]
} 