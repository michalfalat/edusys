import { Schema, model, Document } from 'mongoose';

export interface IModule extends Document {
  name: string;
  description?: string;
  enabled?: boolean;
}

const moduleSchema = new Schema(
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

const ModuleModel = model<IModule>('module', moduleSchema);
export default ModuleModel;
