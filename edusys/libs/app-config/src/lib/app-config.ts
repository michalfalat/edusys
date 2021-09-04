export abstract class APP_CONFIG {
  abstract readonly production: boolean;
  abstract readonly apiUrl: string;
  abstract readonly appUrls: {
    readonly clientApp: string;
    readonly adminManagementApp: string;
  };
}

export const missingTranslations = {};
