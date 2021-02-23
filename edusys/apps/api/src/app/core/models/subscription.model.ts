import { IAmount, SubscriptionStatus } from '@edusys/model';
import { Schema, model, Document } from 'mongoose';
import { amountSchema } from './common.model';
import { IOrganization } from './organization.model';
import { IPackage } from './package.model';

export interface ISubscription extends Document {
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

const subscriptionSchema = new Schema(
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
  }
);

const SubscriptionModel = model<ISubscription>('subscription', subscriptionSchema);
export default SubscriptionModel;
