import { IAddress, OrganizationStatus } from '@edusys/model';
import { Schema, model, Document } from 'mongoose';
import { IOrganizationRole } from './organization-role.model';
import { IUser } from './user.model';
import { addressSchema } from './common.model';
import { ISubscription } from './subscription.model';

export interface IOrganization extends Document {
  name: string;
  description?: string;
  businessId?: string;
  taxId?: string;
  registrationNumberVAT?: string;
  address?: IAddress;
  owner?: IUser['_id'];
  status: OrganizationStatus;
  organizationRoles?: IOrganizationRole[];
  users?: IUser['_id'][];
  subscriptions?: ISubscription[];
}

const organizationSchema = new Schema(
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
    businessId: {
      type: String,
      max: 255,
    },
    taxId: {
      type: String,
      max: 255,
    },
    registrationNumberVAT: {
      type: String,
      max: 255,
    },
    address: { type: addressSchema },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    status: {
      type: OrganizationStatus,
    },
    organizationRoles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'organizationRole',
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    subscriptions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'subscription',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const OrganizationModel = model<IOrganization>('organization', organizationSchema);
export default OrganizationModel;
