import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.entity';

export interface IVerifyToken extends Document {
  user: IUser['_id'];
  token: string;
  expires: Date;
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
  },
  {
    timestamps: true,
  },
);

const VerifyTokenEntity = model<IVerifyToken>('VerifyToken', verifyTokenSchema);
export default VerifyTokenEntity;
