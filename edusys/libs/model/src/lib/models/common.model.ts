export interface IAmount {
  amount: number;
  currency: string;
}

export interface IAddress {
  name: string;
  street: number;
  streetNumber: string;
  city: string;
  postalCode: string;
  country: string;
  location?: IPosition;
}

export interface IPosition {
  longitude: number;
  latitude: number;
}
