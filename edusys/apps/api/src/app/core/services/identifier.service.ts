import {
  createIdentifierSchemaValidate,
  editIdentifierSchemaValidate,
  IdentifierStatus,
  IIdentifierCreateRequest,
  IIdentifierDetailResponse,
  IIdentifierEditRequest,
  IIdentifierFilterRequest,
} from '@edusys/model';
import { PaginateResult } from 'mongoose';
import { identifierDetailMapper, identifierPaginatedListMapper } from '../mappers/identifier.mapper';
import { getCurrentUser } from '../middlewares/current-http-context';
import IdentifierModel from '../models/identifier.model';
import { errorLabels } from '../utils/error-labels';
import { BadRequest, NotFound } from '../utils/errors';
import { logInfo } from '../utils/logger';

export const listOfIdentifiers = async (data: IIdentifierFilterRequest): Promise<PaginateResult<IIdentifierDetailResponse>> => {
  const listOfEntities = await IdentifierModel.paginate(buildFilterCriteria(data), {
    page: data?.page || 1,
    limit: data?.pageSize || 5,
    offset: data?.page * data?.pageSize || 0,
    sort: { createdAt: -1 },
    populate: ['organization', 'user'],
  });
  console.log(data);
  if (!listOfEntities) {
    throw new NotFound();
  }
  return identifierPaginatedListMapper(listOfEntities);
};

export const detailOfIdentifier = async (id: string): Promise<IIdentifierDetailResponse> => {
  const detailModel = await IdentifierModel.findById(id).populate('organization').populate('user');
  if (!detailModel) {
    throw new NotFound();
  }
  return identifierDetailMapper(detailModel);
};

export const createIdentifier = async (payload: IIdentifierCreateRequest): Promise<IIdentifierDetailResponse> => {
  const { error } = createIdentifierSchemaValidate(payload);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  const existingModel = await IdentifierModel.findOne({ number: payload.number });
  if (existingModel) {
    throw new BadRequest(errorLabels.EXISTING_CARD);
  }
  const newModel = new IdentifierModel({
    number: payload.number,
    type: payload.type,
    status: IdentifierStatus.ACTIVE,
    organization: payload.organizationId,
    user: payload.userId,
    createdBy: getCurrentUser()?.id,
    editedBy: getCurrentUser()?.id,
    validUntil: payload.validUntil,
  });
  try {
    const savedModel = await newModel.save();
    logInfo(`[IDENTIFIER_SERVICE] identifier '${payload.number}' created `);
    return identifierDetailMapper(savedModel);
  } catch (error) {
    throw new BadRequest(error);
  }
};

export const editIdentifier = async (payload: IIdentifierEditRequest): Promise<IIdentifierDetailResponse> => {
  const { error } = editIdentifierSchemaValidate(payload);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  try {
    const id = payload.id;
    const editedIdentifier = {
      number: payload.number,
      type: payload.type,
      status: payload.status,
      organization: payload.organizationId,
      user: payload.userId,
      editedBy: getCurrentUser()?.id,
      validUntil: payload.validUntil,
    };
    const updatedModel = await IdentifierModel.findByIdAndUpdate(id, editedIdentifier, { new: true });
    logInfo(`[IDENTIFIER_SERVICE] identifier '${payload.number}' edited`);
    return identifierDetailMapper(updatedModel);
  } catch (error) {
    throw new BadRequest(error);
  }
};

export const deleteIdentifier = async (id: string): Promise<void> => {
  try {
    await IdentifierModel.findByIdAndDelete(id);
    logInfo(`[IDENTIFIER_SERVICE] identifier '${id}' deleted`);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};

const buildFilterCriteria = (data: IIdentifierFilterRequest): any => {
  const filter = {
    $and: [],
  };
  if (data?.number) {
    filter.$and.push({ name: data.number });
  }
  if (data?.status) {
    filter.$and.push({ status: data?.status });
  }
  if (data?.type) {
    filter.$and.push({ type: data?.type });
  }
  if (data?.userId) {
    filter.$and.push({ user: data?.userId });
  }
  if (data?.organizationId) {
    filter.$and.push({ organization: data?.organizationId });
  }

  return filter.$and.length ? filter : {};
};
