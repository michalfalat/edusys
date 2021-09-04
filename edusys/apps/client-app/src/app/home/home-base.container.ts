import { Injector } from '@angular/core';
import { CommonContainer, OrganizationFacade } from '@edusys/core';
import { ICompanyInfoDetailResponse } from '@edusys/model';
import { NotificationService } from '../utils/notification.service';
import { routes } from './../utils/routes';

export class HomeBaseContainer extends CommonContainer {
  organizationFacade: OrganizationFacade;
  notificationService: NotificationService;
  companyInfo: ICompanyInfoDetailResponse;

  constructor(injector: Injector) {
    super(injector);
    this.organizationFacade = injector.get(OrganizationFacade);
    this.notificationService = injector.get(NotificationService);
    this.subscriptions.add(this.organizationFacade.getCompanyInfoDetail$.subscribe((data) => (this.companyInfo = data)));
  }

  onError = (message?: string): void => {
    this.notificationService.showError(message);
  };
  onSuccess = (message?: string): void => {
    this.notificationService.showSuccess(message);
  };

  navigateToProfile = (): void => {
    this.navigateTo(routes.profile);
  };
}
