import { IAuthVerificationTokenInfoResponse } from '@edusys/model';
import { IVerifyToken } from '../models/verify-token.model';

export const verificationTokenMapper = (data: IVerifyToken, expired: boolean): IAuthVerificationTokenInfoResponse => ({
  id: data._id,
  expired,
  token: data.token,
  type: data.type,
  email: data.user?.email,
});
