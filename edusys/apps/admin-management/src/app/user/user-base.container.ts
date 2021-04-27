import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonContainer, OrganizationFacade, UserFacade } from '@edusys/core';
import { IOrganizationDetailResponse, IUserDetailResponse } from '@edusys/model';
import { INavigationItem } from 'libs/core-ui/src/lib/components/ui-breadcrumb/ui-breadcrumb.component';
import { NotificationService } from '../utils/notification.service';
import { routes } from '../utils/routes';

export class UserBaseContainer extends CommonContainer {
  userFacade: UserFacade;
  organizationFacade: OrganizationFacade;
  dialogService: MatDialog;
  notificationService: NotificationService;
  userList: IUserDetailResponse[];
  userDetail: IUserDetailResponse;
  organizationList: IOrganizationDetailResponse[];
  userId: string;
  navigationItems: INavigationItem[];

  constructor(injector: Injector) {
    super(injector);
    this.userFacade = injector.get(UserFacade);
    this.organizationFacade = injector.get(OrganizationFacade);
    this.dialogService = injector.get(MatDialog);
    this.notificationService = injector.get(NotificationService);

    this.subscriptions.add(this.organizationFacade.getOrganizationList$.subscribe((data) => (this.organizationList = data)));
    this.subscriptions.add(this.userFacade.getUserList$.subscribe((data) => (this.userList = data)));
    this.subscriptions.add(this.activatedRoute.params.subscribe((data) => (this.userId = data?.userId)));
    this.subscriptions.add(
      this.userFacade.getUserDetail$.subscribe((data) => {
        this.userDetail = data?.id === this.userId ? data : null;
      }),
    );
  }

  onError = (message?: string): void => {
    this.notificationService.showError(message);
  };
  onSuccess = (message?: string): void => {
    this.notificationService.showSuccess(message);
  };

  navigateToUserHome = (): void => {
    this.navigateTo(routes.user.home);
  };

  navigateToUserDetail = (userId: string): void => {
    this.navigateTo(routes.user.detail, userId);
  };

  navigateToUserEdit = (userId: string): void => {
    this.navigateTo(routes.user.edit, userId);
  };

  navigateToUserCreate = (): void => {
    this.navigateTo(routes.user.create);
  };
}
