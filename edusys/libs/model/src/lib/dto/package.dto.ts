import { IAmount } from './common.dto';
import { IModuleDetailResponse } from './module.dto';

export interface IPackageCreateRequest {
  name: string;
  description: string;
  annumPrices: IAmount[];
  installationPrices: IAmount[];
  moduleIds: string[];
}
export interface IPackageDetailResponse {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  annumPricePrimary: IAmount;
  annumPrices: IAmount[];
  installationPricePrimary: IAmount;
  installationPrices: IAmount[];
  modules: IModuleDetailResponse[];
}

export interface IPackageEditRequest {
  id: string;
  name?: string;
  description?: string;
  enabled?: boolean;
  annumPrices?: IAmount[];
  installationPrices?: IAmount[];
  moduleIds?: string[];
}
