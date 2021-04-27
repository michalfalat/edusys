import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonContainer, IdentifierFacade, OrganizationFacade } from '@edusys/core';
import { IdentifierStatus, IdentifierType, IIdentifierDetailResponse, IOrganizationDetailResponse, Pagination } from '@edusys/model';
import { INavigationItem } from '@edusys/core-ui';
import { NotificationService } from '../utils/notification.service';
import { routes } from '../utils/routes';

export class IdentifierBaseContainer extends CommonContainer {
  identifierFacade: IdentifierFacade;
  organizationFacade: OrganizationFacade;
  dialogService: MatDialog;
  notificationService: NotificationService;
  identifierList: Pagination<IIdentifierDetailResponse>;
  identifierDetail: IIdentifierDetailResponse;
  identifierId: string;
  navigationItems: INavigationItem[];
  organizationList: IOrganizationDetailResponse[];
  identifierTypes = IdentifierType;
  identifierStatuses = IdentifierStatus;

  constructor(injector: Injector) {
    super(injector);
    this.identifierFacade = injector.get(IdentifierFacade);
    this.organizationFacade = injector.get(OrganizationFacade);
    this.notificationService = injector.get(NotificationService);
    this.dialogService = injector.get(MatDialog);
    this.subscriptions.add(this.identifierFacade.getIdentifierList$.subscribe((data) => (this.identifierList = data)));
    this.subscriptions.add(this.organizationFacade.getOrganizationList$.subscribe((data) => (this.organizationList = data)));
    this.subscriptions.add(this.activatedRoute.params.subscribe((data) => (this.identifierId = data?.identifierId)));
    this.subscriptions.add(
      this.identifierFacade.getIdentifierDetail$.subscribe((data) => {
        this.identifierDetail = data?.id === this.identifierId ? data : null;
      }),
    );
  }

  onError = (message?: string): void => {
    this.notificationService.showError(message);
  };
  onSuccess = (message?: string): void => {
    this.notificationService.showSuccess(message);
  };

  navigateToIdentifierHome = (): void => {
    this.navigateTo(routes.identifier.home);
  };
  navigateToIdentifierCreate = (): void => {
    this.navigateTo(routes.identifier.create);
  };

  navigateToIdentifierDetail = (identifierId: string): void => {
    this.navigateTo(routes.identifier.detail, identifierId);
  };

  navigateToIdentifierEdit = (identifierId: string): void => {
    this.navigateTo(routes.identifier.edit, identifierId);
  };
}
