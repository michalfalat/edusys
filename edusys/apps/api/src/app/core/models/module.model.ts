import { Schema, model, Document } from 'mongoose';
import { IEntity } from './entity.model';

export interface IModule extends IEntity {
  name: string;
  description?: string;
  permissions: string[];
  enabled?: boolean;
}

export interface IModuleDocument extends IModule, Document {}

const moduleSchema = new Schema<IModuleDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      max: 255,
    },
    description: {
      type: String,
      max: 512,
    },
    permissions: [
      {
        type: String,
      },
    ],
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const ModuleModel = model<IModuleDocument>('module', moduleSchema);
export default ModuleModel;
