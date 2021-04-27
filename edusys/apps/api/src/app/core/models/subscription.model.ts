import { IAmount, SubscriptionStatus } from '@edusys/model';
import { Schema, model, Document, PaginateModel } from 'mongoose';
import { amountSchema } from './common.model';
import { IEntity } from './entity.model';
import { IOrganization } from './organization.model';
import { IPackage } from './package.model';
import * as paginate from 'mongoose-paginate-v2';

export interface ISubscription extends IEntity {
  name: string;
  description?: string;
  organization: IOrganization['_id'];
  package: IPackage['_id'];
  reference: string;
  status: SubscriptionStatus;
  validUntil: Date;
  discount?: IAmount;
  discountPercentage?: number;
  finalPrice: IAmount;
  isActive: boolean;
}

export interface ISubscriptionDocument extends ISubscription, Document {}

const subscriptionSchema = new Schema<ISubscriptionDocument>(
  {
    name: {
      type: String,
      required: true,
      max: 255,
    },
    description: {
      type: String,
      max: 512,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'organization',
    },
    package: {
      type: Schema.Types.ObjectId,
      ref: 'package',
    },
    reference: { type: String, max: 255 },
    status: { type: SubscriptionStatus },
    validUntil: { type: Date },
    discount: { type: amountSchema },
    discountPercentage: { type: Number },
    finalPrice: { type: amountSchema },
    isActive: { type: Boolean },
  },
  {
    timestamps: true,
  },
);

subscriptionSchema.plugin(paginate);

type SubscriptionModel<T extends Document> = PaginateModel<T>;

const SubscriptionModel: SubscriptionModel<ISubscriptionDocument> = model<ISubscriptionDocument>(
  'subscription',
  subscriptionSchema,
) as SubscriptionModel<ISubscriptionDocument>;
export default SubscriptionModel;
