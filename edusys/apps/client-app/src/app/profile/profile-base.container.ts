import { HttpErrorResponse } from '@angular/common/http';
import { Injector } from '@angular/core';
import { AuthFacade, CommonContainer, ICommonError } from '@edusys/core';
import { INavigationItem } from '@edusys/core-ui';
import { IAuthUserInfoResponse } from '@edusys/model';
import { NotificationService } from '../utils/notification.service';

export class ProfileBaseContainer extends CommonContainer {
  authFacade: AuthFacade;
  notificationService: NotificationService;
  userInfo: IAuthUserInfoResponse;
  navigationItems: INavigationItem[];

  constructor(injector: Injector) {
    super(injector);
    this.authFacade = injector.get(AuthFacade);
    this.notificationService = injector.get(NotificationService);
    this.subscriptions.add(this.authFacade.getUserInfo$.subscribe((data) => (this.userInfo = data)));
  }

  onError = (message?: string | HttpErrorResponse | ICommonError): void => {
    this.notificationService.showError(message);
  };
  onSuccess = (message?: string): void => {
    this.notificationService.showSuccess(message);
  };
}
