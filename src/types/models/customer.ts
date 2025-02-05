export interface City {
  Id: number
  IlAd: string
}

export interface CitySubDivision {
  Id: number
  IlceAd: string
}

export interface Neighborhood {
  NeighborhoodID: number
  NeighborhoodName: string
}

export interface CustomerAddress {
  CustomerAdressID: number
  Alias: string | null
  FullAddress: string | null
  CityID: number | null
  CitySubDivisionID: number | null
  NeighborhoodID: number | null
  TelephoneNumber: string | null
  Fax: string | null
  EmailAddress: string | null
  IsDefault: boolean | null
  TaxIdentifier: string | null
  TaxTitle: string | null
  TaxOffice: string | null
  IsIndividual: boolean | null
  City?: City
  CitySubDivision?: CitySubDivision
  Neighborhood?: Neighborhood
}

export type Customer = {
  CustomerID: number
  Identifier: string
  Title: string
  Nickname: string
  WebAdress: string
  Description: string
  SectorID: number
  PhoneNumber: string
  Mail: string
  IsBlockade: string
  IsEInvoice: string
  IsPassive: string
  SearchTags: string
  TaxOffice: string
  CustomerAdresses: CustomerAddress[]
}
