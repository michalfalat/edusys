import { IInvoiceCore } from '@edusys/core-invoice';
import { Schema, model, Document } from 'mongoose';
import { IEntity } from './entity.model';
import { IOrganization } from './organization.model';
import { IUser } from './user.model';

export interface IInvoice extends IEntity {
  editable: boolean;
  organization?: IOrganization['_id'];
  createdBy: IUser['_id'];
  editedBy: IUser['_id'];
  invoice: IInvoiceCore;
}

export interface IInvoiceDocument extends IInvoice, Document {}

const invoiceSchema = new Schema<IInvoiceDocument>(
  {
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
    invoice: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const InvoiceModel = model<IInvoiceDocument>('invoice', invoiceSchema);
export default InvoiceModel;
