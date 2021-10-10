import { VerifyTokenType } from '@edusys/model';
import { Schema, model, Document, Query, Model } from 'mongoose';
import { IEntity } from './entity.model';
import { IUser } from './user.model';

export interface IVerifyToken extends IEntity {
  user: IUser['_id'];
  token: string;
  expires: Date;
  type: VerifyTokenType;
}

export interface IVerifyTokenDocument extends IVerifyToken, Document {}

const verifyTokenSchema = new Schema<IVerifyTokenDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    token: {
      type: Schema.Types.String,
      required: true,
    },
    expires: {
      type: Schema.Types.Date,
      required: true,
    },
    type: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

verifyTokenSchema.statics.findByToken = function (token: string): Query<any, IVerifyTokenDocument> {
  return this.findOne({ token });
};

export interface IVerifyTokeModel extends Model<IVerifyTokenDocument> {
  findByToken(token: string): Query<any, IVerifyTokenDocument>;
}

const VerifyTokenModel = model<IVerifyTokenDocument, IVerifyTokeModel>('verifyToken', verifyTokenSchema);
export default VerifyTokenModel;
