import { EmailTemplate, sendEmail } from '@edusys/email-sender';
import { Request, Response } from 'express';
import { IUser } from '../entities/user.entity';
import VerifyTokenEntity, { IVerifyToken } from '../entities/verify-token.entity';
import { BadRequest } from '../utils/errors';

// SENDING TEST EMAIL
export const sendTestEmail = async (request: Request, response: Response): Promise<void> => {
  const to: string = request.query.to as string;
  const email: EmailTemplate<'testEmail'> = {
    template: 'testEmail',
    params: {
      name: 'random user name',
    },
    to,
    lang: request.getLocale(),
  };

  await sendEmail(email);
};

// EMAIL ADDRESS VERIFICATION
export const sendVerifyEmail = async (request: Request, response: Response, user: IUser, token: IVerifyToken): Promise<void> => {
  const email: EmailTemplate<'verifyEmail'> = {
    template: 'verifyEmail',
    params: {
      name: user?.name?.length ? `${user.name} ${user.surname}` : user.email,
      verifyTokenUrl: `${request.headers.host}/${token.token}`,
    },
    to: user.email,
    lang: request.getLocale(),
  };

  await sendEmail(email);
};
