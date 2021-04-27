import { Component, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createOrganizationRoleSchema, IOrganizationRoleCreateRequest } from '@edusys/model';
import { routes } from '../../utils/routes';
import { OrganizationRoleBaseContainer } from '../organization-role-base.container';

@Component({
  selector: 'edusys-organization-role-create',
  templateUrl: './organization-role-create.component.html',
  styleUrls: ['./organization-role-create.component.scss'],
})
export class OrganizationRoleCreateComponent extends OrganizationRoleBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.navigationItems = [
      {
        text: 'navigation.organization_roles',
        route: routes.organizationRole.home,
      },
      {
        text: 'general.new',
      },
    ];
    this.setTitle('organization_role.home.title');
    this.createForm(
      {
        name: new FormControl(''),
        description: new FormControl(''),
        organizationId: new FormControl(''),
        permissions: new FormControl([]),
      },
      createOrganizationRoleSchema,
    );
  }

  ngOnInit(): void {
    this.organizationFacade.fetchOrganizationList();
  }

  onCreateOrganizationRole(): void {
    const request: IOrganizationRoleCreateRequest = {
      name: this.form?.value?.name,
      description: this.form?.value?.description,
      organizationId: this.form?.value?.organizationId,
      permissions: this.form?.value?.permissions,
    };
    this.organizationRoleFacade.createOrganizationRole(
      request,
      () => {
        this.onSuccess('organization-role.create.success');
        this.navigateToOrganizationRoleHome();
      },
      (err) => {
        console.log(err);
        this.onError(err.error?.message?.message);
      },
    );
  }
}
