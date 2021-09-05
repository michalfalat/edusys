import { Injector } from '@angular/core';
import { AuthFacade, CommonContainer } from '@edusys/core';
import { NotificationService } from '../utils/notification.service';
import { routes } from './../utils/routes';

export class LoginBaseContainer extends CommonContainer {
  authFacade: AuthFacade;
  notificationService: NotificationService;
  constructor(injector: Injector) {
    super(injector);
    this.authFacade = injector.get(AuthFacade);
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
}
