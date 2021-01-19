import { Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthFacade, CommonContainer } from '@edusys/core';
import { routes } from './../utils/routes';

export class LoginBaseContainer extends CommonContainer {
  authFacade: AuthFacade;
  snackbar: MatSnackBar;
  constructor(injector: Injector) {
    super(injector);
    this.authFacade = injector.get(AuthFacade);
    this.snackbar = injector.get(MatSnackBar);
  }

  onError = (message?: string): void => {
    console.log('error :>> ', message);
    this.snackbar.open(message);
  };
  onSuccess = (message?: string): void => {
    this.snackbar.open(message);
  };

  navigateToProfile = (): void => {
    this.navigateTo(routes.profile);
  };
}
