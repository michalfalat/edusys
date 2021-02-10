import { IAddress, OrganizationStatus } from '@edusys/model';
import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.entity';

export interface IOrganization extends Document {
  name: string;
  description?: string;
  businessId?: string;
  address?: IAddress;
  owner?: IUser;
  status: OrganizationStatus;
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
  },
  {
    timestamps: true,
  }
);

const OrganizationEntity = model<IOrganization>('Organization', organizationSchema);
export default OrganizationEntity;
