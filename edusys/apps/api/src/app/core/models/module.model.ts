import { Schema, model, Document } from 'mongoose';

export interface IModule {
  _id?: any;
  name: string;
  description?: string;
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
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const ModuleModel = model<IModuleDocument>('module', moduleSchema);
export default ModuleModel;
