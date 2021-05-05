import { Component, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createOrganizationSchema, IOrganizationCreateRequest } from '@edusys/model';
import { routes } from '../../utils/routes';
import { OrganizationBaseContainer } from '../organization-base.container';

@Component({
  selector: 'edusys-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.scss'],
})
export class OrganizationCreateComponent extends OrganizationBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);

    this.setTitle('organization.create.title');
    this.createForm(
      {
        info: this.fb.group({
          owner: new FormControl(''),
          name: new FormControl(''),
          description: new FormControl(''),
          businessId: new FormControl(''),
          registrationNumberVAT: new FormControl(''),
          taxId: new FormControl(''),
        }),
        address: this.fb.group({
          name: new FormControl(''),
          street: new FormControl(''),
          streetNumber: new FormControl(''),
          city: new FormControl(''),
          postalCode: new FormControl(''),
          country: new FormControl('sk'),
        }),
        packageId: new FormControl(),
      },
      createOrganizationSchema,
    );
    this.navigationItems = [
      {
        text: 'navigation.organizations',
        route: routes.organization.home,
      },
      {
        text: 'organizations.create',
      },
    ];
  }

  ngOnInit(): void {
    if (!this.packages) this.packageFacade.fetchPackageList();
    if (!this.users) this.userFacade.fetchUserList();
  }

  onCreateOrganization(): void {
    const request: IOrganizationCreateRequest = {
      info: this.form?.value.info,
      address: this.form?.value.address,
      packageId: this.form?.value.packageId,
    };
    this.organizationFacade.createOrganization(
      request,
      () => {
        this.onSuccess('general.saved.success');
        this.navigateToOrganizationHome();
      },
      this.onError,
    );
  }
}
