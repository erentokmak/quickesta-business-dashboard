import { gql } from '@apollo/client'

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($input: customers_insert_input!) {
    insert_customers_one(object: $input) {
      id
      business_id
      quickesta_user_id
      is_quickesta_user
      full_name
      phone
      email
      notes
      is_deleted
      created_at
      updated_at
    }
  }
`

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: appointments_insert_input!) {
    insert_appointments_one(object: $input) {
      id
      business_id
      customer_id
      team_member_id
      service_id
      appointment_date
      start_time
      end_time
      price_charged
      status
      cancellation_reason
      notes
      is_deleted
      created_at
      updated_at
    }
  }
`

export const CHECK_APPOINTMENT_AVAILABILITY = gql`
  query CheckAppointmentAvailability(
    $business_id: Int!
    $appointment_date: date!
    $start_time: time!
    $end_time: time!
  ) {
    appointments(
      where: {
        business_id: { _eq: $business_id }
        appointment_date: { _eq: $appointment_date }
        _and: [
          { start_time: { _lt: $end_time } }
          { end_time: { _gt: $start_time } }
        ]
        is_deleted: { _eq: false }
        status: { _eq: "scheduled" }
      }
    ) {
      id
      start_time
      end_time
    }
  }
` 