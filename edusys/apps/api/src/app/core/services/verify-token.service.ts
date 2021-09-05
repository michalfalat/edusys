import { IAuthVerificationTokenInfoRequest, IAuthVerificationTokenInfoResponse, VerifyTokenType } from '@edusys/model';
import VerifyTokenModel, { IVerifyToken } from '../models/verify-token.model';
import * as uuid from 'uuid';
import { BadRequest, NotFound } from '../utils/errors';
import { verificationTokenMapper } from '../mappers/verification-token.mapper';
import { logInfo } from '../utils/logger';

export const verificationTokenInfo = async (request: IAuthVerificationTokenInfoRequest): Promise<IAuthVerificationTokenInfoResponse> => {
  const token: IVerifyToken = await VerifyTokenModel.findByToken(request?.token).populate('user');
  if (!token) {
    throw new NotFound();
  }
  const expiredToken = new Date(token.expires) < new Date();
  const x = verificationTokenMapper(token, expiredToken);
  return x;
};

export const deleteToken = async (id: string): Promise<void> => {
  try {
    const detailModel = await VerifyTokenModel.findById(id);

    await VerifyTokenModel.findByIdAndDelete(id);
    logInfo(`[VERIFY_TOKEN SERVICE]  token '${detailModel?.id}' deleted`);
    return;
  } catch (error) {
    throw new BadRequest(error);
  }
};

export const createVerificationToken = async (type: VerifyTokenType, userId: string): Promise<IVerifyToken> => {
  // TODO better expiration  logic
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  const verifyToken = new VerifyTokenModel({
    expires,
    user: userId,
    token: uuid.v4(),
    type,
  });

  return await verifyToken.save();
};

export const generateVerificationTokenURL = async (token: IVerifyToken): Promise<string> => {
  if (token.type === VerifyTokenType.PASSWORD_CREATE) {
    return `${process.env.CLIENT_APP_URL}/login/create-password?token=${token.token}`;
  }

  if (token.type === VerifyTokenType.PASSWORD_RESET) {
    return `${process.env.CLIENT_APP_URL}/login/reset-password?token=${token.token}`;
  }
};
