import { IdentifierStatus, IdentifierType } from '@edusys/model';
import { Schema, model, Document, PaginateModel } from 'mongoose';
import { IEntity } from './entity.model';
import { IOrganization } from './organization.model';
import { IUser } from './user.model';
import * as paginate from 'mongoose-paginate-v2';

export interface IIdentifier extends IEntity {
  number: string;
  organization: IOrganization['_id'];
  createdBy: IUser['_id'];
  editedBy: IUser['_id'];
  status: IdentifierStatus;
  type: IdentifierType;
  user: IUser['_id'];
  validUntil?: Date;
}

export interface IIdentifierDocument extends IIdentifier, Document {}

const identifierSchema = new Schema<IIdentifierDocument>(
  {
    number: {
      type: String,
      required: true,
      unique: true,
      max: 255,
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
    },
    type: {
      type: Schema.Types.String,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    validUntil: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

identifierSchema.plugin(paginate);

type IdentifierModel<T extends Document> = PaginateModel<T>;

const IdentifierModel: IdentifierModel<IIdentifierDocument> = model<IIdentifierDocument>(
  'identifier',
  identifierSchema,
) as IdentifierModel<IIdentifierDocument>;
export default IdentifierModel;
