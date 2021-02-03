import { Schema, model, Document } from 'mongoose';

export interface IModule extends Document {
  name: string;
  description: string;
  enabled: boolean;
}

const moduleSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

const ModuleEntity = model<IModule>('Module', moduleSchema);
export default ModuleEntity;