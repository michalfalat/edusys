import { APP_CONFIG } from '@edusys/app-config';

class AppConfig implements APP_CONFIG {
  production = false;
  apiUrl = 'http://localhost:3005';
  appUrls = {
    clientApp: 'http://localhost:3004',
    adminManagementApp: 'http://localhost:3004',
  };
}

export const appConfig = new AppConfig();
