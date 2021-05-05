import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonContainer, OrganizationFacade, PackageFacade, UserFacade } from '@edusys/core';
import { IOrganizationDetailResponse, IPackageDetailResponse, IUserDetailResponse, OrganizationStatus } from '@edusys/model';
import { INavigationItem } from 'libs/core-ui/src/lib/components/ui-breadcrumb/ui-breadcrumb.component';
import { NotificationService } from '../utils/notification.service';
import { routes } from '../utils/routes';

export class OrganizationBaseContainer extends CommonContainer {
  organizationFacade: OrganizationFacade;
  packageFacade: PackageFacade;
  userFacade: UserFacade;
  dialogService: MatDialog;
  notificationService: NotificationService;
  organizationList: IOrganizationDetailResponse[];
  organizationDetail: IOrganizationDetailResponse;
  organizationId: string;
  navigationItems: INavigationItem[];
  packages: IPackageDetailResponse[];
  users: IUserDetailResponse[];
  organizationStatuses = OrganizationStatus;

  constructor(injector: Injector) {
    super(injector);
    this.organizationFacade = injector.get(OrganizationFacade);
    this.userFacade = injector.get(UserFacade);
    this.packageFacade = injector.get(PackageFacade);
    this.notificationService = injector.get(NotificationService);
    this.dialogService = injector.get(MatDialog);
    this.subscriptions.add(this.packageFacade.getPackageList$.subscribe((data) => (this.packages = data)));
    this.subscriptions.add(this.organizationFacade.getOrganizationList$.subscribe((data) => (this.organizationList = data)));
    this.subscriptions.add(this.activatedRoute.params.subscribe((data) => (this.organizationId = data?.organizationId)));
    this.subscriptions.add(this.userFacade.getUserList$.subscribe((data) => (this.users = data)));
    this.subscriptions.add(
      this.organizationFacade.getOrganizationDetail$.subscribe((data) => {
        this.organizationDetail = data?.id === this.organizationId ? data : null;
      }),
    );
  }

  onError = (message?: any): void => {
    this.notificationService.showError(message);
  };
  onSuccess = (message?: string): void => {
    this.notificationService.showSuccess(message);
  };

  navigateToOrganizationHome = (): void => {
    this.navigateTo(routes.organization.home);
  };

  navigateToOrganizationDetail = (organizationId: string): void => {
    this.navigateTo(routes.organization.detail, organizationId);
  };

  navigateToOrganizationEdit = (organizationId: string): void => {
    this.navigateTo(routes.organization.edit, organizationId);
  };

  navigateToOrganizationCreate = (): void => {
    this.navigateTo(routes.organization.create);
  };
}
