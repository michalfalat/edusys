export type EmailTemplates = {
  verifyEmail: {
    name: string;
    verifyTokenUrl: string;
  };
  testEmail: {
    name: string;
  };
};

type TemplateType = keyof EmailTemplates;

export type EmailTemplate<T extends TemplateType> = {
  template: T;
  params: EmailTemplates[T];
  lang: string;
  to: string;
};
