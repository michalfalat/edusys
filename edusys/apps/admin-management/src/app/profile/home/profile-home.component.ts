import { Component, Injector, OnInit } from '@angular/core';
import { ProfileBaseContainer } from '../profile-base.container';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss'],
})
export class ProfileHomeComponent extends ProfileBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.setTitle('general.language');
  }

  ngOnInit(): void {
    if (!this.userInfo) {
      this.authFacade.userInfo();
    }
  }
}
