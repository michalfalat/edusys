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
      name: 'general.navigation.module',
      route: routes.module.home,
      permission: PERMISSION.MODULE.BASIC,
    },
    {
      name: 'general.navigation.package',
      route: routes.package.home,
      permission: PERMISSION.PACKAGE.BASIC,
    },
    {
      name: 'general.navigation.organization',
      route: routes.package.home,
      permission: PERMISSION.PACKAGE.BASIC,
    },
    {
      name: 'general.navigation.user',
      route: routes.package.home,
      permission: PERMISSION.PACKAGE.BASIC,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
