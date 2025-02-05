import { gql } from '@apollo/client'

export const UPDATE_DEALER = gql`
  mutation UpdateDealer($customerId: Int!, $input: Customer_set_input!) {
    update_Customer_by_pk(
      pk_columns: { CustomerID: $customerId }
      _set: $input
    ) {
      CustomerID
      Title
      TaxOffice
      Identifier
      PhoneNumber
      Mail
      WebAdress
      IsEInvoice
      IsPassive
      UpdateDate
      UpdateUser
    }
  }
`
