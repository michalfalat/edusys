import { Component, Injector } from '@angular/core';
import { AppDeviceScreen } from '@edusys/core';
import { PERMISSION } from '@edusys/model';
import { routes } from '../../utils/routes';
import { LayoutBaseContainer } from '../layout-base.module';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-main-layout',
  templateUrl: './layouts-main-layout.component.html',
  styleUrls: ['./layouts-main-layout.component.scss'],
})
export class LayoutsMainLayoutComponent extends LayoutBaseContainer {
  navigationItems = [
    {
      name: 'navigation.tasks',
      route: routes.task.home,
      permission: PERMISSION.TASK.BASIC,
      icon: 'task',
    },
  ];

  sidenavOpened: boolean;
  constructor(injector: Injector) {
    super(injector);
    this.sidenavOpened = this.deviceScreen !== AppDeviceScreen.MOBILE;
  }

  onSidenavToogle(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
