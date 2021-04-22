import { ISubscriptionResponse, ISubscriptionDetailResponse } from '@edusys/model';
import { ISubscription, ISubscriptionDocument } from '../models/subscription.model';
import { packageDetailMapper } from './package.mapper';
import { PaginateResult } from 'mongoose';

export const subscriptionDetailMapper = (subs: ISubscription): ISubscriptionDetailResponse => ({
  id: subs?._id,
  name: subs?.name,
  description: subs?.description,
  finalPrice: subs?.finalPrice,
  organizationId: subs?.organization?.id,
  reference: subs?.reference,
  package: packageDetailMapper(subs?.package, null),
  status: subs?.status,
  validUntil: subs?.validUntil?.toISOString(),
  discount: subs?.discount,
  discountPercentage: subs?.discountPercentage,
  createdAt: subs?.createdAt,
  updatedAt: subs?.updatedAt,
});

export const subscriptionMapper = (subs: ISubscription): ISubscriptionResponse => ({
  id: subs?._id,
  name: subs?.name,
  finalPrice: subs?.finalPrice,
  organizationId: subs?.organization?.id,
  organizationName: subs?.organization?.name,
  packageId: subs?.package?.id,
  packageName: subs?.package?.name,
  status: subs?.status,
  validUntil: subs?.validUntil?.toISOString(),
  createdAt: subs?.createdAt,
  updatedAt: subs?.updatedAt,
});

export const subscriptionListMapper = (subs: ISubscription[]): ISubscriptionResponse[] => subs?.map((m) => subscriptionMapper(m));

export const subscriptionPaginatedListMapper = (data: PaginateResult<ISubscriptionDocument>): PaginateResult<ISubscriptionResponse> => {
  return {
    ...data,
    docs: data.docs?.map((d) => subscriptionMapper(d)),
  };
};
