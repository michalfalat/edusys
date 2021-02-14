import { Component, OnInit } from '@angular/core';
import { PERMISSION } from '@edusys/model';
import { routes } from '../../utils/routes';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-main-layout',
  templateUrl: './layouts-main-layout.component.html',
  styleUrls: ['./layouts-main-layout.component.scss'],
})
export class LayoutsMainLayoutComponent implements OnInit {
  navigationItems = [
    {
      name: 'navigation.modules',
      route: routes.module.home,
      permission: PERMISSION.MODULE.BASIC,
    },
    {
      name: 'navigation.packages',
      route: routes.package.home,
      permission: PERMISSION.PACKAGE.BASIC,
    },
    {
      name: 'navigation.organizations',
      route: routes.organization.home,
      permission: PERMISSION.ORGANIZATION.BASIC,
    },
    {
      name: 'navigation.users',
      route: routes.package.home,
      permission: PERMISSION.PACKAGE.BASIC,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
