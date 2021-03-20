import { Component, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { editOrganizationSchema, IOrganizationDetailResponse } from '@edusys/model';
import { routes } from '../../utils/routes';
import { OrganizationBaseContainer } from '../organization-base.container';

@Component({
  selector: 'edusys-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss'],
})
export class OrganizationDetailComponent extends OrganizationBaseContainer implements OnInit {
  isEditMode: boolean;
  constructor(injector: Injector) {
    super(injector);
    this.isEditMode = this.activatedRoute.snapshot.data.isEditMode;
    this.setBreadcrumbNavigation();
    this.createForm(
      {
        info: this.fb.group({
          name: new FormControl(this.organizationDetail?.name),
          description: new FormControl(this.organizationDetail?.description),
          businessId: new FormControl(this.organizationDetail?.businessId),
          registrationNumberVAT: new FormControl(this.organizationDetail?.registrationNumberVAT),
          taxId: new FormControl(this.organizationDetail?.taxId),
        }),
        owner: this.fb.group({
          email: new FormControl(this.organizationDetail?.owner?.email),
          password: new FormControl(this.organizationDetail?.name),
          name: new FormControl(this.organizationDetail?.owner?.name),
          surname: new FormControl(this.organizationDetail?.owner?.surname),
        }),
        address: this.fb.group({
          name: new FormControl(this.organizationDetail?.address?.name),
          street: new FormControl(this.organizationDetail?.address?.street),
          streetNumber: new FormControl(this.organizationDetail?.address?.streetNumber),
          city: new FormControl(this.organizationDetail?.address?.city),
          postalCode: new FormControl(this.organizationDetail?.address?.postalCode),
          country: new FormControl(this.organizationDetail?.address?.country),
        }),
        packageId: new FormControl(),
      },
      editOrganizationSchema
    );
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
