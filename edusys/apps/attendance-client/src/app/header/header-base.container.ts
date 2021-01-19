import { Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AuthFacade,
  CommonContainer,
  IAuthUserInfoResponse,
} from '@edusys/core';
import { CoreTranslateService } from '@edusys/core-translate';

export class HeaderBaseContainer extends CommonContainer {
  authFacade: AuthFacade;
  snackbar: MatSnackBar;
  userInfo: IAuthUserInfoResponse;
  translateService: CoreTranslateService;

  constructor(injector: Injector) {
    super(injector);
    this.authFacade = injector.get(AuthFacade);
    this.snackbar = injector.get(MatSnackBar);
    this.translateService = injector.get(CoreTranslateService);
    this.subscriptions.add(
      this.authFacade.getUserInfo$.subscribe((data) => (this.userInfo = data))
    );
  }

  onError = (message?: string): void => {
    this.snackbar.open(message);
  };
  onSuccess = (message?: string): void => {
    this.snackbar.open(message);
  };
}
