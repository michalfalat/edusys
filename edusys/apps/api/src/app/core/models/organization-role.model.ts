import { OrganizationRoleStatus } from '@edusys/model';
import { Schema, model, Document } from 'mongoose';
import { IOrganization } from './organization.model';
import { IUser } from './user.model';

export interface IOrganizationRole extends Document {
  name: string;
  description?: string;
  editable: boolean;
  organization: IOrganization['_id'];
  createdBy: IUser['_id'];
  editedBy: IUser['_id'];
  status: OrganizationRoleStatus;
  permissions: string[];
  users: IUser['_id'][];
}

const organizationRoleSchema = new Schema(
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
    editable: {
      type: Boolean,
      required: true,
      default: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'organization',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    editedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    status: {
      type: String,
      default: OrganizationRoleStatus.ACTIVE,
    },
    permissions: [
      {
        type: String,
        required: true,
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const OrganizationRoleModel = model<IOrganizationRole>('organizationRole', organizationRoleSchema);
export default OrganizationRoleModel;
