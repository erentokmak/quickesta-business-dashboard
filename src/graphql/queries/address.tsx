import { gql } from '@apollo/client'

export const GET_PROVINCE_LIST = gql`
  query GetProvinceList {
    IL {
      Id
      IlAd
      Slug
    }
  }
`

export const GET_COUNTY_LIST_BY_PROVINCE = gql`
  query GetCountyListByProvince($provinceId: Int!) {
    Ilce(where: { ILId: { _eq: $provinceId } }) {
      IlceAd
      Slug
      Id
      ILId
    }
  }
`

export const GET_NEIGHBORHOOD_LIST_BY_COUNTY = gql`
  query GetNeighborhoodListByCounty($countyId: Int!) {
    Neighborhoods(where: { IlceId: { _eq: $countyId } }) {
      IlceId
      NeighborhoodID
      NeighborhoodName
    }
  }
`

export const GET_CUSTOMERS_BY_PROVINCE = gql`
  query GetCustomersByAddress($provinceId: Int!) {
    AddressMatchings(where: { IlID: { _eq: $provinceId } }) {
      Customer {
        CustomerID
        Identifier
        Title
        Nickname
        WebAdress
        Description
        SectorID
        PhoneNumber
        Mail
        IsBlockade
        IsEInvoice
        IsPassive
        SearchTags
        TaxOffice
        CustomerAdresses {
          FullAddress
        }
      }
    }
  }
`

export const GET_CUSTOMERS_BY_PROVINCE_AND_COUNTY = gql`
  query GetCustomersByAddress($provinceId: Int!, $countyId: Int) {
    AddressMatchings(
      where: {
        _and: [{ IlID: { _eq: $provinceId } }, { IlceID: { _eq: $countyId } }]
      }
    ) {
      Customer {
        CustomerID
        Identifier
        Title
        Nickname
        WebAdress
        Description
        SectorID
        PhoneNumber
        Mail
        IsBlockade
        IsEInvoice
        IsPassive
        SearchTags
        TaxOffice
        CustomerAdresses {
          FullAddress
        }
      }
    }
  }
`

export const GET_CUSTOMERS_BY_ADDRESS = gql`
  query GetCustomersByAddress(
    $provinceId: Int!
    $countyId: Int
    $neighborhoodId: Int
  ) {
    AddressMatchings(
      where: {
        _and: [
          { IlID: { _eq: $provinceId } }
          { IlceID: { _eq: $countyId } }
          { NeighborhoodID: { _eq: $neighborhoodId } }
        ]
      }
    ) {
      Customer {
        CustomerID
        Identifier
        Title
        Nickname
        WebAdress
        Description
        SectorID
        PhoneNumber
        Mail
        IsBlockade
        IsEInvoice
        IsPassive
        SearchTags
        TaxOffice
        CustomerAdresses {
          FullAddress
        }
      }
    }
  }
`
