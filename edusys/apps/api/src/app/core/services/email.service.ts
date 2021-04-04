import { EmailTemplate, buildAndSendEmail, EmailType, EmailTemplatesData } from '@edusys/email-sender';
import { getCurrentLanguage } from '../middlewares/current-http-context';
import * as path from 'path';
import { __assetsdir } from 'apps/api/src/dir';
import { logInfo } from '../utils/logger';

// SENDING TEST EMAIL
export const sendTestEmail = async (to: string): Promise<void> => {
  const email: EmailTemplate<EmailType.TEST_EMAIL> = {
    template: EmailType.TEST_EMAIL,
    params: {
      name: 'random user name',
    },
    to,
    lang: 'sk',
    attachments: [
      {
        path: path.join(__assetsdir, 'images/logo.png'),
        filename: 'Our logo.png',
      },
    ],
  };

  await buildAndSendEmail(email);
};

export const sendEmail = async <T extends EmailType>(type: T, to: string, params: EmailTemplatesData[T]): Promise<void> => {
  const email: EmailTemplate<T> = {
    template: type,
    params: {
      ...params,
    },
    to,
    lang: getCurrentLanguage() || 'sk',
  };

  await buildAndSendEmail(email);

  logInfo(`[EMAIL_SERVICE] email '${type}' sent to ${to}`);
};

// EMAIL ADDRESS VERIFICATION
export const sendVerifyEmail = async (to: string, params: EmailTemplatesData[EmailType.VERIFY_EMAIL]): Promise<void> => {
  const email: EmailTemplate<EmailType.VERIFY_EMAIL> = {
    template: EmailType.VERIFY_EMAIL,
    params: {
      ...params,
    },
    to,
    lang: getCurrentLanguage() || 'sk',
  };

  await buildAndSendEmail(email);
};

// EMAIL ORGANIZATION CREATION
export const sendOrganizationCreateEmail = async (to: string, params: EmailTemplatesData[EmailType.ORGANIZATION_CREATE]): Promise<void> => {
  const email: EmailTemplate<EmailType.ORGANIZATION_CREATE> = {
    template: EmailType.ORGANIZATION_CREATE,
    params: {
      ...params,
    },
    to,
    lang: getCurrentLanguage() || 'sk',
  };

  await buildAndSendEmail(email);
};

// EMAIL ORGANIZATION CREATION WITH VERIFICATION
export const sendOrganizationCreateEmailWithVerification = async (
  to: string,
  params: EmailTemplatesData[EmailType.ORGANIZATION_CREATE_VERIFY_EMAIL]
): Promise<void> => {
  const email: EmailTemplate<EmailType.ORGANIZATION_CREATE_VERIFY_EMAIL> = {
    template: EmailType.ORGANIZATION_CREATE_VERIFY_EMAIL,
    params: {
      ...params,
    },
    to,
    lang: getCurrentLanguage() || 'sk',
  };

  await buildAndSendEmail(email);
};
