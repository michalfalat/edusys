import { VerifyTokenType } from '@edusys/model';
import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.model';

export interface IVerifyToken {
  _id?: any;
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
      type: VerifyTokenType,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VerifyTokenModel = model<IVerifyTokenDocument>('verifyToken', verifyTokenSchema);
export default VerifyTokenModel;
