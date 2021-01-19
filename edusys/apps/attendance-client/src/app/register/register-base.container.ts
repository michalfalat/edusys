import { Injector } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthFacade, CommonContainer, CookieService } from '@edusys/core';
import { routes } from '../utils/routes';

export class RegisterBaseContainer extends CommonContainer {
  authFacade: AuthFacade;
  snackbar: MatSnackBar;
  cookieService: CookieService;
  constructor(injector: Injector) {
    super(injector);
    this.authFacade = injector.get(AuthFacade);
    this.snackbar = injector.get(MatSnackBar);
    this.cookieService = injector.get(CookieService);
    this.cookieService.set('lang', 'sk');
  }

  onError = (message?: string): void => {
    console.log('error :>> ', message);
    this.snackbar.open(message);
  };
  onSuccess = (message?: string): void => {
    this.snackbar.open(message);
  };

  onLogin = (): void => {
    this.navigateTo(routes.login);
  };
}
