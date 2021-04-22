import { Component, HostListener, Injector, OnInit } from '@angular/core';
import { PERMISSION } from '@edusys/model';
import { routes } from '../../utils/routes';
import { LayoutBaseContainer } from '../layout-base.module';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-main-layout',
  templateUrl: './layouts-main-layout.component.html',
  styleUrls: ['./layouts-main-layout.component.scss'],
})
export class LayoutsMainLayoutComponent extends LayoutBaseContainer implements OnInit {
  navigationItems = [
    {
      name: 'navigation.modules',
      route: routes.module.home,
      permission: PERMISSION.MODULE.BASIC,
      icon: 'view_module',
    },
    {
      name: 'navigation.packages',
      route: routes.package.home,
      permission: PERMISSION.PACKAGE.BASIC,
      icon: 'inventory_2',
    },
    {
      name: 'navigation.organizations',
      route: routes.organization.home,
      permission: PERMISSION.ORGANIZATION.BASIC,
      icon: 'domain',
    },
    {
      name: 'navigation.subscriptions',
      route: routes.subscription.home,
      permission: PERMISSION.SUBSCRIPTION.BASIC,
      icon: 'domain',
    },
    {
      name: 'navigation.users',
      route: routes.user.home,
      permission: PERMISSION.USER.BASIC,
      icon: 'person',
    },
    {
      name: 'navigation.tasks',
      route: routes.task.home,
      permission: PERMISSION.TASK.BASIC,
      icon: 'task',
    },
    {
      name: 'navigation.organization_roles',
      route: routes.organizationRole.home,
      permission: PERMISSION.ORGANIZATION_ROLE.BASIC,
      icon: 'group',
    },
    {
      name: 'navigation.logs',
      route: routes.log.home,
      permission: PERMISSION.LOG.BASIC,
      icon: 'info',
    },
  ];

  sidenavOpened = true;
  sidenavMode = window.innerWidth > 700 ? 'side' : 'over';
  width: number;
  constructor(injector: Injector) {
    super(injector);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event.target.innerWidth);
    this.width = event.target.innerWidth;
    if (this.width > 700) {
      this.sidenavMode = 'side';
      this.sidenavOpened = true;
    } else {
      this.sidenavMode = 'over';
    }
  }

  ngOnInit(): void {}

  onSidenavToogle(): void {
    this.sidenavOpened = !this.sidenavOpened;
    console.log(this.sidenavOpened);
  }
}
