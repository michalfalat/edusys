import { Component, Injector, OnInit } from '@angular/core';
import { OrganizationRoleBaseContainer } from '../organization-role-base.container';

@Component({
  selector: 'edusys-organization-role-home',
  templateUrl: './organization-role-home.component.html',
  styleUrls: ['./organization-role-home.component.scss'],
})
export class OrganizationRoleHomeComponent extends OrganizationRoleBaseContainer implements OnInit {
  displayedColumns: string[] = ['createdAt', 'organizationName', 'name', 'status'];
  constructor(injector: Injector) {
    super(injector);
    this.setTitle('organization_role.home.title');
    this.navigationItems = [
      {
        text: 'navigation.organization_roles',
      },
    ];
  }

  ngOnInit(): void {
    this.organizationRoleFacade.fetchOrganizationRoleList();
  }
}
