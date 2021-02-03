export abstract class APP_CONFIG {
  abstract readonly production: boolean;
  abstract readonly apiUrl: string;
  abstract readonly appUrls: {
    readonly attendanceClient: string;
    readonly adminManagement: string;
  };
}
