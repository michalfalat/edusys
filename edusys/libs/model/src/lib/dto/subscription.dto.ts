import { IAmount, IPaginable } from './common.dto';
import { IPackageDetailResponse } from './package.dto';

export interface ISubscriptionResponse {
  id: string;
  name: string;
  organizationId: string;
  organizationName: string;
  packageId: string;
  packageName: string;
  status: SubscriptionStatus;
  validUntil: string;
  finalPrice: IAmount;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISubscriptionFilterRequest extends IPaginable {
  name?: string;
  status?: string;
  organization?: string;
}

export interface ISubscriptionDetailResponse {
  id: string;
  name: string;
  description: string;
  organizationId: string;
  organizationName: string;
  package: IPackageDetailResponse;
  reference: string;
  status: SubscriptionStatus;
  validUntil: string;
  discount?: IAmount;
  discountPercentage?: number;
  finalPrice: IAmount;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISubscriptionCreateRequest {
  name: string;
  description: string;
  organizationId: string;
  package: IPackageDetailResponse;
  reference: string;
  discount?: IAmount;
  discountPercentage?: number;
  finalPrice: IAmount;
}

export interface ISubscriptionEditRequest {
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
