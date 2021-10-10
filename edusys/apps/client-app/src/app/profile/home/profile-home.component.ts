import { Component, Injector } from '@angular/core';
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
    this.setTitle('general.profile.title');

    this.navigationItems = [
      {
        text: 'navigation.profile',
      },
    ];
  }
}
