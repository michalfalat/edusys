export interface IAmount {
  amount: number;
  currency: string;
}

export interface IAddress {
  name: string;
  street: string;
  streetNumber: string;
  city: string;
  postalCode: string;
  country: string;
  location?: IPosition;
}

export interface IBankDetail {
  bankName: string;
  IBAN: string;
  SWIFT?: string;
  currency?: string;
}

export interface IPosition {
  longitude: number;
  latitude: number;
}
