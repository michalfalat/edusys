import { Component, Injector } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ProfileBaseContainer } from '../profile-base.container';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss'],
})
export class ProfileHomeComponent extends ProfileBaseContainer {
  constructor(injector: Injector) {
    super(injector);
    this.setTitle('general.profile.basicInfo.title');

    this.navigationItems = [
      {
        text: 'navigation.profile',
      },
    ];
  }

  tabClick(tab: MatTabChangeEvent): void {
    switch (tab.index) {
      case 0:
        this.setTitle('general.profile.basicInfo.title');
        break;
      case 1:
        this.setTitle('general.profile.changePassword.title');
        break;
      default:
        break;
    }
    console.log(tab);
  }
}
