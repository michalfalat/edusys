export enum EmailType {
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  TEST_EMAIL = 'TEST_EMAIL',
}

export type EmailTemplatesData = {
  [EmailType.VERIFY_EMAIL]: {
    name: string;
    verifyTokenUrl: string;
  };
  [EmailType.TEST_EMAIL]: {
    name: string;
  };
};

type TemplateType = keyof EmailTemplatesData;

export type EmailTemplate<T extends TemplateType> = {
  template: T;
  params: EmailTemplatesData[T];
  lang: string;
  to: string;
};
