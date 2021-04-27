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

    this.setTitle('organization.home.title');
    this.createForm(
      {
        info: this.fb.group({
          owner: new FormControl(''),
          name: new FormControl('Test skola'),
          description: new FormControl('Test description'),
          businessId: new FormControl('3215'),
          registrationNumberVAT: new FormControl('314asd364'),
          taxId: new FormControl('35q4wd'),
        }),
        address: this.fb.group({
          name: new FormControl('Adresa sidla'),
          street: new FormControl('street'),
          streetNumber: new FormControl('streetNumber'),
          city: new FormControl('Blava'),
          postalCode: new FormControl('85101'),
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
        this.navigateToOrganizationHome;
      },
      this.onError,
    );
  }
}
