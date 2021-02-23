import { VerifyTokenType } from '@edusys/model';
import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.model';

export interface IVerifyToken extends Document {
  user: IUser['_id'];
  token: string;
  expires: Date;
  type: VerifyTokenType;
}

const verifyTokenSchema = new Schema(
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

const VerifyTokenModel = model<IVerifyToken>('verifyToken', verifyTokenSchema);
export default VerifyTokenModel;
