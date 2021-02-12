import { EmailTemplate, sendEmail } from '@edusys/email-sender';
import { IUser } from '../entities/user.entity';
import { IVerifyToken } from '../entities/verify-token.entity';

// SENDING TEST EMAIL
export const sendTestEmail = async (to: string): Promise<void> => {
  const email: EmailTemplate<'testEmail'> = {
    template: 'testEmail',
    params: {
      name: 'random user name',
    },
    to,
    lang: 'sk', // request.getLocale(), TODO context
  };

  await sendEmail(email);
};

// EMAIL ADDRESS VERIFICATION
export const sendVerifyEmail = async (user: IUser, token: IVerifyToken, lang?: string): Promise<void> => {
  const email: EmailTemplate<'verifyEmail'> = {
    template: 'verifyEmail',
    params: {
      name: user?.name?.length ? `${user.name} ${user.surname}` : user.email,
      verifyTokenUrl: '', //`${request.headers.host}/${token.token}`,  // TODO context
    },
    to: user.email,
    lang: lang || 'sk', // request.getLocale(), TODO context
  };

  await sendEmail(email);
};
