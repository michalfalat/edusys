import { IAmount } from './common.dto';
import { IPackageDetailResponse } from './package.dto';

export interface ISubscriptionResponse {
  id: string;
  name: string;
  organizationId: string;
  package: IPackageDetailResponse;
  status: SubscriptionStatus;
  validUntil: string;
  finalPrice: IAmount;
}

export interface ISubscriptionDetailResponse {
  id: string;
  name: string;
  description: string;
  organizationId: string;
  package: IPackageDetailResponse;
  reference: string;
  status: SubscriptionStatus;
  validUntil: string;
  discount?: IAmount;
  discountPercentage?: number;
  finalPrice: IAmount;
}

export enum SubscriptionStatus {
  DEMO = 'DEMO',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELED = 'CANCELED',
}