import { buildAndSendEmail, EmailTemplate, EmailTemplatesData, EmailType } from '@edusys/email-sender';
import { getCurrentLanguage } from '../middlewares/current-http-context';
import { logError, logInfo } from '../utils/logger';

export const sendEmail = async <T extends EmailType>(type: T, to: string, params: EmailTemplatesData[T]): Promise<void> => {
  try {
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
  } catch (err: any) {
    logError(`[EMAIL_SERVICE] email error ${JSON.stringify(err)}`);
    throw err;
  }
};
