import { gql } from '@apollo/client'

export const GET_BUSINESS_CUSTOMERS = gql`
  query GetBusinessCustomers($business_id: Int!) {
    customers(
      where: {
        business_id: { _eq: $business_id }
        is_deleted: { _eq: false }
      }
      order_by: { created_at: desc }
    ) {
      id
      business_id
      full_name
      phone
      email
      notes
      created_at
      updated_at
    }
  }
`

export interface Customer {
  id: number;
  business_id: number;
  full_name: string;
  phone?: string;
  email?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface GetBusinessCustomersVariables {
  business_id: number;
}

export interface GetBusinessCustomersResponse {
  customers: Customer[];
}