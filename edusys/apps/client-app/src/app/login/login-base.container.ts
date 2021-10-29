import { Injector } from '@angular/core';
import { AuthFacade, CommonContainer } from '@edusys/core';
import { AuthService } from 'libs/core/src/lib/services/auth/auth.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { NotificationService } from '../utils/notification.service';
import { routes } from './../utils/routes';

export class LoginBaseContainer extends CommonContainer {
  authFacade: AuthFacade;
  authService: AuthService;
  permissionService: NgxPermissionsService;
  notificationService: NotificationService;
  constructor(injector: Injector) {
    super(injector);
    this.authFacade = injector.get(AuthFacade);
    this.authService = injector.get(AuthService);
    this.permissionService = injector.get(NgxPermissionsService);
    this.notificationService = injector.get(NotificationService);
  }

  onError = (message?: any): void => {
    this.notificationService.showError(message);
  };
  onSuccess = (message?: string): void => {
    this.notificationService.showSuccess(message);
  };

  navigateToProfile = (): void => {
    this.navigateTo(routes.profile);
  };

  navigateToHome = (): void => {
    this.navigateTo(routes.home);
  };

  navigateToLoginHome = (): void => {
    this.navigateTo(routes.login.home);
  };

  navigateToForgotPassword = (): void => {
    this.navigateTo(routes.login.forgotPassword);
  };
}
