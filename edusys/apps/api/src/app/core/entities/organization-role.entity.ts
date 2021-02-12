import { OrganizationRoleStatus } from '@edusys/model';
import { Schema, model, Document } from 'mongoose';
import { IOrganization } from './organization.entity';
import { IUser } from './user.entity';

export interface IOrganizationRole extends Document {
  name: string;
  description?: string;
  editable: boolean;
  organization: IOrganization['_id'];
  createdBy: IUser['_id'];
  editedBy: IUser['_id'];
  status: OrganizationRoleStatus;
}

const organizationRoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 255,
    },
    description: {
      type: String,
      min: 2,
      max: 255,
    },
    editable: {
      required: true,
      default: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Organization',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    editedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      required: true,
      default: OrganizationRoleStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

const OrganizationRoleEntity = model<IOrganizationRole>('OrganizationRole', organizationRoleSchema);
export default OrganizationRoleEntity;
