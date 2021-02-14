import { Component, Injector, OnInit } from '@angular/core';
import { IOrganizationDetailResponse } from '@edusys/model';
import { routes } from '../../utils/routes';
import { OrganizationBaseContainer } from '../organization-base.container';

@Component({
  selector: 'edusys-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss'],
})
export class OrganizationDetailComponent extends OrganizationBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.setBreadcrumbNavigation();
  }

  ngOnInit(): void {
    this.organizationFacade.fetchOrganizationDetail(this.organizationId, this.setBreadcrumbNavigation, this.navigateToOrganizationHome);
  }

  deleteOrganization(): void {
    this.organizationFacade.deleteOrganization(this.organizationId, this.navigateToOrganizationHome);
  }

  setBreadcrumbNavigation = (response?: IOrganizationDetailResponse): void => {
    this.navigationItems = [
      {
        text: 'navigation.organizations',
        route: routes.organization.home,
      },
      {
        text: this.organizationDetail?.name || response?.name || 'Detail',
      },
    ];
  };
}
