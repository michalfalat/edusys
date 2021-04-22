import {
  createSubscriptionSchemaValidate,
  editSubscriptionSchemaValidate,
  ISubscriptionCreateRequest,
  ISubscriptionDetailResponse,
  ISubscriptionEditRequest,
  ISubscriptionFilterRequest,
  ISubscriptionResponse,
} from '@edusys/model';
import { PaginateResult } from 'mongoose';
import { subscriptionDetailMapper, subscriptionPaginatedListMapper } from '../mappers/subscription.mapper';
import SubscriptionModel from '../models/subscription.model';
import { errorLabels } from '../utils/error-labels';
import { BadRequest, NotFound } from '../utils/errors';
import { logInfo } from '../utils/logger';

// LIST OF ALL SUBSCRIPTIONS WITHOUT PAGINATION
export const listOfSubscriptions = async (data: ISubscriptionFilterRequest): Promise<PaginateResult<ISubscriptionResponse>> => {
  const listOfEntities = await SubscriptionModel.paginate(buildFilterCriteria(data), {
    page: data?.page || 1,
    limit: data?.pageSize || 5,
    offset: data?.page * data?.pageSize || 0,
    sort: { createdAt: -1 },
    populate: ['organization', 'package'],
  });
  if (!listOfEntities) {
    throw new NotFound();
  }
  return subscriptionPaginatedListMapper(listOfEntities);
};

// DETAIL OF SUBSCRIPTION
export const detailOfSubscription = async (id: string): Promise<ISubscriptionDetailResponse> => {
  const detailModel = await SubscriptionModel.findById(id).populate('modules');
  if (!detailModel) {
    throw new NotFound();
  }
  return subscriptionDetailMapper(detailModel);
};

// CREATE NEW SUBSCRIPTION
export const createSubscription = async (payload: ISubscriptionCreateRequest): Promise<ISubscriptionDetailResponse> => {
  const { error } = createSubscriptionSchemaValidate(payload);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  const existingModel = await SubscriptionModel.findOne({ name: payload.name });
  if (existingModel) {
    throw new BadRequest(errorLabels.EXISTING_NAME);
  }
  const newModel = new SubscriptionModel({
    name: payload.name,
    description: payload.description,
  });
  try {
    const savedModel = await newModel.save();
    logInfo(`[SUBSCRIPTION_SERVICE] subscription '${payload.name}' created `);
    return subscriptionDetailMapper(savedModel);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// EDIT SUBSCRIPTION
export const editSubscription = async (payload: ISubscriptionEditRequest): Promise<ISubscriptionDetailResponse> => {
  const { error } = editSubscriptionSchemaValidate(payload);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  try {
    const id = payload.id;
    const editedSubscription = {
      name: payload.name,
      description: payload.description,
    };
    const updatedModel = await SubscriptionModel.findByIdAndUpdate(id, editedSubscription, { new: true });
    logInfo(`[SUBSCRIPTION_SERVICE] subscription '${payload.name}' edited`);
    return subscriptionDetailMapper(updatedModel);
  } catch (error) {
    throw new BadRequest(error);
  }
};

// DELETE SUBSCRIPTION
export const deleteSubscription = async (id: string): Promise<void> => {
  try {
    await SubscriptionModel.findByIdAndDelete(id);
    logInfo(`[SUBSCRIPTION_SERVICE] subscription '${id}' deleted`);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};

const buildFilterCriteria = (data: ISubscriptionFilterRequest): any => {
  const filter = {
    $and: [],
  };
  if (data?.name) {
    filter.$and.push({ name: data.name });
  }
  if (data?.status) {
    filter.$and.push({ status: data?.status });
  }
  if (data?.organization) {
    filter.$and.push({ organization: data?.organization });
  }

  return filter.$and.length ? filter : {};
};
