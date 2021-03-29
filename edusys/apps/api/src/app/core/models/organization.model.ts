import { IAddress, OrganizationStatus } from '@edusys/model';
import { Schema, model, Document, Model } from 'mongoose';
import { IOrganizationRole } from './organization-role.model';
import { IUser, IUserModel } from './user.model';
import { addressSchema } from './common.model';
import { ISubscription } from './subscription.model';
import { IEntity } from './entity.model';

export interface IOrganization extends IEntity {
  name: string;
  description?: string;
  businessId?: string;
  taxId?: string;
  registrationNumberVAT?: string;
  address?: IAddress;
  owner?: IUser['_id'];
  status: OrganizationStatus;
  organizationRoles?: IOrganizationRole['_id'][];
  users?: IUser['_id'][];
  subscriptions?: ISubscription[];
}

export interface IOrganizationDocument extends IOrganization, Document {}

const organizationSchema = new Schema<IOrganizationDocument>(
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
        default: [],
      },
    ],
    subscriptions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'subscription',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

organizationSchema.statics.addUserToOrganization = function (organizationId: any, userId: any): Promise<IOrganizationDocument> {
  return this.findByIdAndUpdate(organizationId, { $push: { users: userId } }, { new: true }).exec();
};

organizationSchema.statics.removeUserFromOrganization = function (organizationId: any, userId: any): Promise<IOrganizationDocument> {
  return this.findByIdAndUpdate(organizationId, { $pull: { users: userId } }, { new: true }).exec();
};

organizationSchema.statics.addRoleToOrganization = function (organizationId: any, organizationRoleId: any): Promise<IOrganizationDocument> {
  return this.findByIdAndUpdate(organizationId, { $push: { organizationRoles: organizationRoleId } }, { new: true }).exec();
};

organizationSchema.statics.removeRoleFromOrganization = function (organizationId: any, organizationRoleId: any): Promise<IOrganizationDocument> {
  return this.findByIdAndUpdate(organizationId, { $pull: { organizationRoles: organizationRoleId } }, { new: true }).exec();
};

organizationSchema.statics.findByOrganizationIds = function (organizationIds: any[]): Promise<IOrganizationDocument[]> {
  return this.find().where('_id').in(organizationIds).exec();
};

export interface IOrganizationModel extends Model<IOrganizationDocument> {
  addUserToOrganization(organizationId: any, userId: any): Promise<IOrganizationDocument>;
  removeUserFromOrganization(organizationId: any, userId: any): Promise<IOrganizationDocument>;
  addRoleToOrganization(organizationId: any, organizationRoleId: any): Promise<IOrganizationDocument>;
  removeRoleFromOrganization(organizationId: any, organizationRoleId: any): Promise<IOrganizationDocument>;
  findByOrganizationIds(organizationIds: any[]): Promise<IOrganizationDocument[]>;
}

const OrganizationModel = model<IOrganizationDocument, IOrganizationModel>('organization', organizationSchema);
export default OrganizationModel;
