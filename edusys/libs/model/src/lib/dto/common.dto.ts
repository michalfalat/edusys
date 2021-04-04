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

export interface Pagination<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page?: number;
  totalPages: number;
  nextPage?: number | null;
  prevPage?: number | null;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  meta?: any;
  [customLabel: string]: T[] | number | boolean | null | undefined;
}
