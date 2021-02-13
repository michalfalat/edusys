import { Schema, model, Document } from 'mongoose';
import { IOrganizationRole } from './organization-role.entity';

export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  roles?: IOrganizationRole['_id'][];
  obsolete: boolean;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      min: 2,
      max: 255,
    },
    surname: {
      type: String,
      required: false,
      min: 2,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 6,
      max: 255,
    },
    phone: {
      type: String,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    obsolete: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserEntity = model<IUser>('User', userSchema);
export default UserEntity;
