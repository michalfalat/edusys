export enum EmailType {
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  TEST_EMAIL = 'TEST_EMAIL',
  ORGANIZATION_CREATE = 'ORGANIZATION_CREATE',
  ORGANIZATION_CREATE_VERIFY_EMAIL = 'ORGANIZATION_CREATE_VERIFY_EMAIL',
  TASK_NEW = 'TASK_NEW',
  USER_ORGANIZATION_ADD = 'USER_ORGANIZATION_ADD',
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
  [EmailType.TASK_NEW]: {
    taskName: string;
    taskOrganziation: string;
    taskDescription: string;
    taskPlace: string;
    taskPriority: string;
    createdBy: string;
    url: string;
  };
  [EmailType.USER_ORGANIZATION_ADD]: {
    isNewUser: boolean;
    organizations: string[];
    url: string;
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
