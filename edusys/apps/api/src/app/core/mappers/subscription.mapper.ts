import { ISubscriptionResponse, ISubscriptionDetailResponse } from '@edusys/model';
import { ISubscription } from '../models/subscription.model';
import { packageDetailMapper } from './package.mapper';

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
});

export const subscriptionMapper = (subs: ISubscription): ISubscriptionResponse => ({
  id: subs?._id,
  name: subs?.name,
  finalPrice: subs?.finalPrice,
  organizationId: subs?.organization?.id,
  package: packageDetailMapper(subs?.package, null),
  status: subs?.status,
  validUntil: subs?.validUntil?.toISOString(),
});
