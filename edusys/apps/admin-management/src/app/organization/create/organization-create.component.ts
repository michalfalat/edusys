import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { IOrganizationCreateRequest } from '@edusys/model';
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
    this.createForm({
      info: this.fb.group({
        name: new FormControl('', Validators.required),
        description: new FormControl(''),
        businessId: new FormControl(''),
        registrationNumberVAT: new FormControl(''),
        taxId: new FormControl(''),
      }),
      owner: this.fb.group({
        email: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
      }),
      address: this.fb.group({
        name: new FormControl('', Validators.required),
        street: new FormControl(''),
        streetNumber: new FormControl(''),
        city: new FormControl(''),
        postalCode: new FormControl(''),
        country: new FormControl('sk'),
      }),
    });
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

  ngOnInit(): void {}

  onCreateOrganization(): void {
    const request: IOrganizationCreateRequest = {
      name: this.form?.value.name,
      description: this.form?.value.description,
      owner: this.form?.value.owner,
      address: this.form?.value.address,
      businessId: this.form?.value.businessId,
      registrationNumberVAT: this.form?.value.registrationNumberVAT,
      taxId: this.form?.value.taxId,
    };
    this.organizationFacade.createOrganization(request, this.navigateToOrganizationHome);
  }
}
