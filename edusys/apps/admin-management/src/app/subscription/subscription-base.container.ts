import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonContainer, OrganizationFacade, SubscriptionFacade } from '@edusys/core';
import { IOrganizationDetailResponse, ISubscriptionDetailResponse, ISubscriptionResponse, Pagination, SubscriptionStatus } from '@edusys/model';
import { INavigationItem } from '@edusys/core-ui';
import { NotificationService } from '../utils/notification.service';
import { routes } from '../utils/routes';

export class SubscriptionBaseContainer extends CommonContainer {
  subscriptionFacade: SubscriptionFacade;
  organizationFacade: OrganizationFacade;
  dialogService: MatDialog;
  notificationService: NotificationService;
  subscriptionList: Pagination<ISubscriptionResponse>;
  subscriptionDetail: ISubscriptionDetailResponse;
  subscriptionId: string;
  navigationItems: INavigationItem[];
  subscriptionStatuses = SubscriptionStatus;
  organizationList: IOrganizationDetailResponse[];

  constructor(injector: Injector) {
    super(injector);
    this.subscriptionFacade = injector.get(SubscriptionFacade);
    this.organizationFacade = injector.get(OrganizationFacade);
    this.notificationService = injector.get(NotificationService);
    this.dialogService = injector.get(MatDialog);
    this.subscriptions.add(this.subscriptionFacade.getSubscriptionList$.subscribe((data) => (this.subscriptionList = data)));
    this.subscriptions.add(this.activatedRoute.params.subscribe((data) => (this.subscriptionId = data?.subscriptionId)));
    this.subscriptions.add(this.organizationFacade.getOrganizationList$.subscribe((data) => (this.organizationList = data)));
    this.subscriptions.add(
      this.subscriptionFacade.getSubscriptionDetail$.subscribe((data) => {
        this.subscriptionDetail = data?.id === this.subscriptionId ? data : null;
      }),
    );
  }

  onError = (message?: any): void => {
    this.notificationService.showError(message);
  };
  onSuccess = (message?: string): void => {
    this.notificationService.showSuccess(message);
  };

  navigateToSubscriptionHome = (): void => {
    this.navigateTo(routes.subscription.home);
  };

  navigateToSubscriptionDetail = (subscriptionId: string): void => {
    this.navigateTo(routes.subscription.detail, subscriptionId);
  };

  navigateToSubscriptionEdit = (subscriptionId: string): void => {
    this.navigateTo(routes.subscription.edit, subscriptionId);
  };
}
