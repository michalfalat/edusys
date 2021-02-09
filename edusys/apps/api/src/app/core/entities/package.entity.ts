import { IAmount } from '@edusys/model';
import { Schema, model, Document } from 'mongoose';
import { IModule } from './module.entity';

export interface IPackage extends Document {
  name: string;
  description: string;
  enabled: boolean;
  annumPrices: IAmount[];
  installationPrices: IAmount[];
  modules: IModule[];
}
const amountSchema = new Schema({ amount: { type: Number, required: true }, currency: { type: String, required: true } });
const packageSchema = new Schema(
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
      max: 1024,
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
        ref: 'Module',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PackageEntity = model<IPackage>('Package', packageSchema);
export default PackageEntity;
