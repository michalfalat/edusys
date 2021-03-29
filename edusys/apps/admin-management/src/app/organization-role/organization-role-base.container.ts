import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonContainer, OrganizationFacade, OrganizationRoleFacade } from '@edusys/core';
import { IOrganizationDetailResponse, IOrganizationRoleDetailResponse, OrganizationRoleStatus } from '@edusys/model';
import { INavigationItem } from 'libs/core-ui/src/lib/components/ui-breadcrumb/ui-breadcrumb.component';
import { NotificationService } from '../utils/notification.service';
import { routes } from '../utils/routes';

export class OrganizationRoleBaseContainer extends CommonContainer {
  organizationRoleFacade: OrganizationRoleFacade;
  organizationFacade: OrganizationFacade;
  dialogService: MatDialog;
  notificationService: NotificationService;
  organizationRoleList: IOrganizationRoleDetailResponse[];
  organizationRoleDetail: IOrganizationRoleDetailResponse;
  organizationList: IOrganizationDetailResponse[];
  organizationRoleId: string;
  navigationItems: INavigationItem[];
  organizationRoleStatuses = OrganizationRoleStatus;

  constructor(injector: Injector) {
    super(injector);
    this.organizationRoleFacade = injector.get(OrganizationRoleFacade);
    this.organizationFacade = injector.get(OrganizationFacade);
    this.dialogService = injector.get(MatDialog);
    this.notificationService = injector.get(NotificationService);

    this.subscriptions.add(this.organizationFacade.getOrganizationList$.subscribe((data) => (this.organizationList = data)));
    this.subscriptions.add(this.organizationRoleFacade.getOrganizationRoleList$.subscribe((data) => (this.organizationRoleList = data)));
    this.subscriptions.add(this.activatedRoute.params.subscribe((data) => (this.organizationRoleId = data?.organizationRoleId)));
    this.subscriptions.add(
      this.organizationRoleFacade.getOrganizationRoleDetail$.subscribe((data) => {
        this.organizationRoleDetail = data?.id === this.organizationRoleId ? data : null;
      })
    );
  }

  onError = (message?: string): void => {
    this.notificationService.showError(message);
  };
  onSuccess = (message?: string): void => {
    this.notificationService.showSuccess(message);
  };

  navigateToOrganizationRoleHome = (): void => {
    this.navigateTo(routes.organizationRole.home);
  };

  navigateToOrganizationRoleDetail = (organizationRoleId: string, activeTab?: number): void => {
    this.navigateToWithParams(this.getUrl(routes.organizationRole.detail, organizationRoleId), { activeTab });
  };

  navigateToOrganizationRoleEdit = (organizationRoleId: string, activeTab?: number): void => {
    this.navigateToWithParams(this.getUrl(routes.organizationRole.edit, organizationRoleId), { activeTab });
  };

  navigateToOrganizationRoleCreate = (): void => {
    this.navigateTo(routes.organizationRole.create);
  };
}
