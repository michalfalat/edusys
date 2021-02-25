import { IAmount } from '@edusys/model';
import { Schema, model, Document } from 'mongoose';
import { IModule } from './module.model';
import { amountSchema } from './common.model';

export interface IPackage {
  _id?: any;
  name: string;
  description: string;
  enabled: boolean;
  annumPrices: IAmount[];
  installationPrices: IAmount[];
  modules: IModule['_id'][];
}

export interface IPackageDocument extends IPackage, Document {}

const packageSchema = new Schema<IPackageDocument>(
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
    enabled: {
      type: Boolean,
      default: true,
    },
    annumPrices: { type: [amountSchema], validate: (v) => v?.length > 0 },
    installationPrices: { type: [amountSchema], validate: (v) => v?.length > 0 },
    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: 'module',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PackageModel = model<IPackageDocument>('package', packageSchema);
export default PackageModel;
