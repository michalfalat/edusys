import { IAmount } from '@edusys/model';
import { Schema, model, Document } from 'mongoose';
import { IModule } from './module.entity';

export interface IPackage extends Document {
  name: string;
  description: string;
  enabled: boolean;
  annumPrice: IAmount;
  installationPrice: IAmount;
  modules: IModule[];
}

const PackageSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      min: 2,
      max: 255,
    },
    description: {
      type: String,
      required: false,
      min: 2,
      max: 255,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    annumPrice: {
      required: true,
    },
    installationPrice: {
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PackageEntity = model<IPackage>('Package', PackageSchema);
export default PackageEntity;
