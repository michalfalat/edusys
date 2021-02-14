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
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
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
      owner: {
        email: this.form?.value.ownerEmail,
        name: this.form?.value.ownerName,
        surname: this.form?.value.ownerSurname,
      },
      address: this.form?.value.address,
      businessId: this.form?.value.businessId,
      registrationNumberVAT: this.form?.value.registrationNumberVAT,
      taxId: this.form?.value.taxId,
    };
    this.organizationFacade.createOrganization(request, this.navigateToOrganizationHome);
  }
}
