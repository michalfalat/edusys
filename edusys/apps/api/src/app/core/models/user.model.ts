import { Schema, model, Document, Model } from 'mongoose';
import { IEntity } from './entity.model';
import { IOrganizationRole } from './organization-role.model';
import { compare, genSalt, hash } from 'bcrypt';
import { IOrganization } from './organization.model';
import { generate } from 'generate-password';
import { Query } from 'mongoose';

export interface IUser extends IEntity {
  name: string;
  surname: string;
  email: string;
  password: string;
  organizations?: IOrganization['_id'][];
  roles?: IOrganizationRole['_id'][];
  obsolete: boolean;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  passwordSet: boolean;
  fullname?: string;
  passwordChangedAt?: Date;
}

export interface IUserDocument extends IUser, Document {
  comparePassword: (password: string) => Promise<boolean>;
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
      select: false,
      max: 1024,
    },
    passwordChangedAt: {
      type: Date,
    },
    organizations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'organization',
      },
    ],
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'organizationRole',
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
    passwordSet: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.findByName = function (name: string): Query<any, IUserDocument> {
  return this.find({ name: new RegExp(name, 'i') });
};

userSchema.statics.findByEmail = function (email: string): Query<any, IUserDocument> {
  return this.findOne({ email: new RegExp(email, 'i') });
};

userSchema.virtual('fullname').get(function (this: IUserDocument) {
  return !!this.name && !!this.surname ? `${this.name || ''} ${this.surname || ''}` : null;
});

const comparePassword = function (candidatePassword): Promise<boolean> {
  return compare(candidatePassword, this.password);
};

userSchema.methods.comparePassword = comparePassword;

userSchema.pre('save', function save(next) {
  const user = this as IUserDocument;
  let userPassword = user.password;
  console.log('before save >>>', user.isModified('password'));
  if (user.isNew || user.isModified('password')) {
    console.log('user password is modified!', userPassword);
    genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      if (!userPassword || userPassword === '') {
        user.passwordSet = false;
        userPassword = generate({
          length: 20,
          numbers: true,
          uppercase: true,
          lowercase: true,
        });
      } else {
        user.passwordSet = true;
      }
      console.log('new password is ', userPassword);
      hash(userPassword, salt, (err: any, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        user.passwordChangedAt = new Date();
        next();
      });
    });
  } else {
    return next();
  }
});

export interface IUserModel extends Model<IUserDocument> {
  findByEmail(email: string): Query<any, IUserDocument>;
  findByName(name: string): Query<any, IUserDocument>;
}

const UserModel = model<IUserDocument, IUserModel>('user', userSchema);
export default UserModel;
