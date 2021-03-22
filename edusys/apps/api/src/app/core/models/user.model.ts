import { Schema, model, Document, Model } from 'mongoose';
import { IEntity } from './entity.model';
import { IOrganizationRole } from './organization-role.model';

export interface IUser extends IEntity {
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

export interface IUserDocument extends IUser, Document {
  fullName: string;
}

const userSchema = new Schema<IUserDocument>(
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
      select: false,
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

userSchema.statics.findByName = function (name: string) {
  return this.find({ name: new RegExp(name, 'i') });
};

userSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email: new RegExp(email, 'i') });
};

userSchema.virtual('fullName').get(function (this: IUserDocument) {
  return `${this.name} ${this.surname}`;
});

export interface IUserModel extends Model<IUserDocument> {
  findByEmail(email: string): Promise<IUserDocument>;
  findByName(name: string): Promise<IUserDocument[]>;
}

const UserModel = model<IUserDocument, IUserModel>('user', userSchema);
export default UserModel;
