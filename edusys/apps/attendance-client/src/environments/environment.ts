import { APP_CONFIG } from '@edusys/app-config';

class AppConfig implements APP_CONFIG {
  production = false;
  apiUrl = 'http://localhost:3005';
  appUrls = {
    attendanceClient: 'http://localhost:4200',
    attendanceAdmin: 'http://localhost:4201',
  };
}

export const appConfig = new AppConfig();
