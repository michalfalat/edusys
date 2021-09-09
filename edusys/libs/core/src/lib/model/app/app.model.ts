export enum AppLocalStorageKeys {
  AUTH_TOKEN = 'AUTH_TOKEN',
  LANGUAGE = 'LANGUAGE',
}

export enum AppDeviceScreen {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  WEB = 'WEB',
}

export interface ICommonError {
  status: number;
  message: string;
  messageLocalized: string;
}
