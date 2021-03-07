import { Injector } from '@angular/core';
import { CommonContainer, OrganizationFacade } from '@edusys/core';
import { ICompanyInfoDetailResponse } from '@edusys/model';
import { routes } from './../utils/routes';

export class HomeBaseContainer extends CommonContainer {
  organizationFacade: OrganizationFacade;
  companyInfo: ICompanyInfoDetailResponse;

  constructor(injector: Injector) {
    super(injector);
    this.organizationFacade = injector.get(OrganizationFacade);
    this.subscriptions.add(this.organizationFacade.getCompanyInfoDetail$.subscribe((data) => (this.companyInfo = data)));
  }

  onError = (message?: string): void => {
    console.log('error :>> ', message);
  };
  onSuccess = (message?: string): void => {};

  navigateToProfile = (): void => {
    this.navigateTo(routes.profile);
  };
}
