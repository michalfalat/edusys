import { IAddress, IBankDetail } from './common.dto';

export interface ICompanyInfoDetailResponse {
  id: any;
  name: string;
  businessId?: string;
  taxId?: string;
  registeredVAT: boolean;
  registrationNumberVAT?: string;
  address?: IAddress;
  bank?: IBankDetail;
}

export interface ICompanyInfoEditRequest {
  id: any;
  name: string;
  businessId?: string;
  taxId?: string;
  registeredVAT: boolean;
  registrationNumberVAT?: string;
  address?: IAddress;
  bank?: IBankDetail;
}
