import { IPaginable } from './common.dto';
import { IAuthUserBasicResponse } from './user.dto';

export interface IIdentifierCreateRequest {
  number: string;
  organizationId: string;
  type: IdentifierType;
  userId: string;
  validUntil?: string;
}

export interface IIdentifierFilterRequest extends IPaginable {
  number?: string;
  organization?: string;
  type?: IdentifierType;
  status?: IdentifierStatus;
  user?: string;
}

export interface IIdentifierDetailResponse {
  id: string;
  number: string;
  organizationId: string;
  organizationName: string;
  createdBy: IAuthUserBasicResponse;
  editedBy: IAuthUserBasicResponse;
  status: IdentifierStatus;
  type: IdentifierType;
  user: IAuthUserBasicResponse;
  validUntil?: Date;
  createdAt?: string;
  updatedAt?: string;
}

export interface IIdentifierEditRequest {
  id: string;
  number: string;
  organizationId: string;
  status: IdentifierStatus;
  type: IdentifierType;
  userId: IAuthUserBasicResponse;
  validUntil?: Date;
}

export enum IdentifierStatus {
  ACTIVE = 'ACTIVE',
  LOST = 'LOST',
  CANCELED = 'CANCELED',
}

export enum IdentifierType {
  CARD = 'CARD',
}
