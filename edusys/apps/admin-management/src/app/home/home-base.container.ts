import { Injector } from '@angular/core';
import { CommonContainer } from '@edusys/core';
import { routes } from './../utils/routes';

export class HomeBaseContainer extends CommonContainer {
  constructor(injector: Injector) {
    super(injector);
  }

  onError = (message?: string): void => {
    console.log('error :>> ', message);
  };
  onSuccess = (message?: string): void => {};

  navigateToProfile = (): void => {
    this.navigateTo(routes.profile);
  };
}
