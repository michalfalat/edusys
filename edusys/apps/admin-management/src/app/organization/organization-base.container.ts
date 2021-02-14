import { Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonContainer, OrganizationFacade } from '@edusys/core';
import { IOrganizationDetailResponse } from '@edusys/model';
import { INavigationItem } from 'libs/core-ui/src/lib/components/ui-breadcrumb/ui-breadcrumb.component';
import { routes } from '../utils/routes';

export class OrganizationBaseContainer extends CommonContainer {
  organizationFacade: OrganizationFacade;
  snackbar: MatSnackBar;
  organizationList: IOrganizationDetailResponse[];
  organizationDetail: IOrganizationDetailResponse;
  organizationId: string;
  navigationItems: INavigationItem[];

  constructor(injector: Injector) {
    super(injector);
    this.organizationFacade = injector.get(OrganizationFacade);
    this.snackbar = injector.get(MatSnackBar);
    this.subscriptions.add(this.organizationFacade.getOrganizationList$.subscribe((data) => (this.organizationList = data)));
    this.subscriptions.add(this.activatedRoute.params.subscribe((data) => (this.organizationId = data?.organizationId)));
    this.subscriptions.add(
      this.organizationFacade.getOrganizationDetail$.subscribe((data) => {
        this.organizationDetail = data?.id === this.organizationId ? data : null;
      })
    );
  }

  onError = (message?: string): void => {
    console.log('error :>> ', message);
    this.snackbar.open(message);
  };
  onSuccess = (message?: string): void => {
    this.snackbar.open(message);
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
