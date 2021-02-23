import { EmailTemplate, sendEmail, EmailType } from '@edusys/email-sender';
import { IUser } from '../models/user.model';
import { IVerifyToken } from '../models/verify-token.model';
import { getCurrentHostname, getCurrentLanguage } from '../middlewares/current-http-context';

// SENDING TEST EMAIL
export const sendTestEmail = async (to: string): Promise<void> => {
  const email: EmailTemplate<EmailType.TEST_EMAIL> = {
    template: EmailType.TEST_EMAIL,
    params: {
      name: 'random user name',
    },
    to,
    lang: getCurrentLanguage() || 'sk',
  };

  await sendEmail(email);
};

// EMAIL ADDRESS VERIFICATION
export const sendVerifyEmail = async (user: IUser, token: IVerifyToken): Promise<void> => {
  const email: EmailTemplate<EmailType.VERIFY_EMAIL> = {
    template: EmailType.VERIFY_EMAIL,
    params: {
      name: user?.name?.length ? `${user.name} ${user.surname}` : user.email,
      verifyTokenUrl: `${getCurrentHostname()}/${token.token}`,
    },
    to: user.email,
    lang: getCurrentLanguage() || 'sk',
  };

  await sendEmail(email);
};
