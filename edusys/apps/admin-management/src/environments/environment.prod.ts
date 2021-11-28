import { APP_CONFIG } from '@edusys/app-config';

class AppConfig implements APP_CONFIG {
  production = true;
  apiUrl = '';
  appUrls = {
    clientApp: '',
    adminManagementApp: '',
  };
}

export const appConfig = new AppConfig();
