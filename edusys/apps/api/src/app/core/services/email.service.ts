import { buildAndSendEmail, EmailTemplate, EmailTemplatesData, EmailType } from '@edusys/email-sender';
import { getCurrentLanguage } from '../middlewares/current-http-context';
import { logInfo } from '../utils/logger';

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
