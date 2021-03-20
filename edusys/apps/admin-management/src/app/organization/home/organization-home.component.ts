import { Component, Injector, OnInit } from '@angular/core';
import { OrganizationBaseContainer } from '../organization-base.container';

@Component({
  selector: 'edusys-organization-home',
  templateUrl: './organization-home.component.html',
  styleUrls: ['./organization-home.component.scss'],
})
export class OrganizationHomeComponent extends OrganizationBaseContainer implements OnInit {
  displayedColumns: string[] = ['name', 'owner', 'status', 'userCount'];
  constructor(injector: Injector) {
    super(injector);
    this.setTitle('organziation.home.title');
    this.navigationItems = [
      {
        text: 'navigation.organizations',
      },
    ];
  }

  ngOnInit(): void {
    this.organizationFacade.fetchOrganizationList();
  }
}
