import { IAddress, IBankDetail } from '@edusys/model';
import { Schema, model, Document } from 'mongoose';
import { addressSchema, bankDetailSchema } from './common.model';
import { IEntity } from './entity.model';

export interface ICompanyInfo extends IEntity {
  name: string;
  businessId?: string;
  taxId?: string;
  registeredVAT: boolean;
  registrationNumberVAT?: string;
  address?: IAddress;
  bank?: IBankDetail;
}

export interface ICompanyInfoDocument extends ICompanyInfo, Document {}

const companyInfoSchema = new Schema<ICompanyInfoDocument>(
  {
    name: {
      type: String,
      required: true,
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
    registeredVAT: {
      type: Boolean,
    },
    registrationNumberVAT: {
      type: String,
      max: 255,
    },
    address: { type: addressSchema },
    bank: { type: bankDetailSchema },
  },
  {
    timestamps: true,
  }
);

const CompanyInfoModel = model<ICompanyInfoDocument>('companyInfo', companyInfoSchema);
export default CompanyInfoModel;
