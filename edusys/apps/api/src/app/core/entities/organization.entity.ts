import { IAddress, OrganizationStatus } from '@edusys/model';
import { Schema, model, Document } from 'mongoose';
import { IOrganizationRole } from './organization-role.entity';
import { IUser } from './user.entity';

export interface IOrganization extends Document {
  name: string;
  description?: string;
  businessId?: string;
  taxId?: string;
  registrationNumberVAT?: string;
  address?: IAddress;
  owner?: IUser['_id'];
  status: OrganizationStatus;
  organizationRoles: IOrganizationRole[];
  users?: IUser['_id'][];
}

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 255,
    },
    description: {
      type: String,
      min: 2,
      max: 255,
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
    address: {
      type: String,
      max: 255,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: OrganizationStatus,
    },
    organizationRoles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'OrganizationRole',
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const OrganizationEntity = model<IOrganization>('Organization', organizationSchema);
export default OrganizationEntity;
