import { Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AuthFacade,
  CommonContainer,
  IAuthUserInfoResponse,
} from '@edusys/core';

export class ProfileBaseContainer extends CommonContainer {
  authFacade: AuthFacade;
  snackbar: MatSnackBar;
  userInfo: IAuthUserInfoResponse;
  constructor(injector: Injector) {
    super(injector);
    this.authFacade = injector.get(AuthFacade);
    this.snackbar = injector.get(MatSnackBar);
    this.subscriptions.add(
      this.authFacade.getUserInfo$.subscribe((data) => (this.userInfo = data))
    );
  }

  onError = (message?: string): void => {
    console.log('error :>> ', message);
    this.snackbar.open(message);
  };
  onSuccess = (message?: string): void => {
    this.snackbar.open(message);
  };
}
