import { Injector } from '@angular/core';
import { CommonContainer, DashboardFacade, OrganizationFacade } from '@edusys/core';
import { ICompanyInfoDetailResponse, IDashboardResponse } from '@edusys/model';
import { NotificationService } from '../utils/notification.service';
import { routes } from './../utils/routes';

export class HomeBaseContainer extends CommonContainer {
  organizationFacade: OrganizationFacade;
  dashboardFacade: DashboardFacade;
  notificationService: NotificationService;
  companyInfo: ICompanyInfoDetailResponse;
  dashboardData: IDashboardResponse;

  constructor(injector: Injector) {
    super(injector);
    this.organizationFacade = injector.get(OrganizationFacade);
    this.dashboardFacade = injector.get(DashboardFacade);
    this.notificationService = injector.get(NotificationService);
    this.subscriptions.add(this.organizationFacade.getCompanyInfoDetail$.subscribe((data) => (this.companyInfo = data)));
    this.subscriptions.add(this.dashboardFacade.getDashboardData$.subscribe((data) => (this.dashboardData = data)));
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
