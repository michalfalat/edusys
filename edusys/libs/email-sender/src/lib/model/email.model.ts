export enum EmailType {
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  TEST_EMAIL = 'TEST_EMAIL',
  ORGANIZATION_CREATE = 'ORGANIZATION_CREATE',
  ORGANIZATION_CREATE_VERIFY_EMAIL = 'ORGANIZATION_CREATE_VERIFY_EMAIL',
}

export type EmailTemplatesData = {
  [EmailType.VERIFY_EMAIL]: {
    name: string;
    verifyTokenUrl: string;
  };
  [EmailType.TEST_EMAIL]: {
    name: string;
  };
  [EmailType.ORGANIZATION_CREATE]: {
    name: string;
    organizationName: string;
    loginUrl: string;
  };
  [EmailType.ORGANIZATION_CREATE_VERIFY_EMAIL]: {
    name: string;
    organizationName: string;
    loginUrl: string;
    verifyTokenUrl: string;
  };
};

export interface IEmailAttachment {
  filename: string;
  content?: string;
  path?: string;
}

type TemplateType = keyof EmailTemplatesData;

export type EmailTemplate<T extends TemplateType> = {
  template: T;
  params: EmailTemplatesData[T];
  lang: string;
  to: string;
  attachments?: IEmailAttachment[];
};
