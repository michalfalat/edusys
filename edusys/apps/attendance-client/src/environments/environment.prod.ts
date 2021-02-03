import { APP_CONFIG } from '@edusys/app-config';

class AppConfig implements APP_CONFIG {
  production = true;
  apiUrl = 'http://localhost:4200';
  appUrls = {
    attendanceClient: 'http://localhost:4200',
    adminManagement: 'http://localhost:4201',
  };
}

export const appConfig = new AppConfig();
