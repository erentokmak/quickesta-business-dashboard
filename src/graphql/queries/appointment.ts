import { gql } from '@apollo/client'


export const GET_DAILY_APPOINTMENTS = gql`
  query GetDailyAppointments($business_id: Int!, $start_date: date!, $end_date: date!) {
    appointments(
      where: {
        business_id: { _eq: $business_id }
        appointment_date: { _gte: $start_date, _lte: $end_date }
        is_deleted: { _eq: false }
      }
      order_by: { start_time: asc }
    ) {
      id
      appointment_date
      start_time
      end_time
      price_charged
      status
      notes
      customer {
        id
        full_name
        phone
      }
      service {
        id
        name
      }
      team_member {
        id
        full_name
      }
    }
  }
`

export const GET_BUSINESS_BY_OWNER = gql`
  query GetBusinessByOwner($owner_id: uuid!) {
    businesses(
      where: {
        owner_id: { _eq: $owner_id }
        is_deleted: { _eq: false }
      }
      limit: 1
    ) {
      id
      name
    }
  }
` 