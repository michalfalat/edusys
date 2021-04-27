import { IIdentifierDetailResponse } from '@edusys/model';
import { IIdentifier, IIdentifierDocument } from '../models/identifier.model';
import { userDetailMapper } from './user.mapper';
import { PaginateResult } from 'mongoose';

export const identifierDetailMapper = (data: IIdentifier): IIdentifierDetailResponse => ({
  id: data._id,
  createdBy: data.createdBy,
  editedBy: data.editedBy,
  number: data.number,
  organizationId: data.organization ? data.organization._id : null,
  organizationName: data.organization ? data.organization.name : null,
  status: data.status,
  type: data.type,
  user: data.user ? userDetailMapper(data.user) : null,
  validUntil: data.validUntil,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});

export const identifierListMapper = (identifiers: IIdentifier[]): IIdentifierDetailResponse[] => identifiers?.map((m) => identifierDetailMapper(m));

export const identifierPaginatedListMapper = (data: PaginateResult<IIdentifierDocument>): PaginateResult<IIdentifierDetailResponse> => {
  return {
    ...data,
    docs: data.docs?.map((d) => identifierDetailMapper(d)),
  };
};
