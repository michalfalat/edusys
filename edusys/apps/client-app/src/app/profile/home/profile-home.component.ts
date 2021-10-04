import { Component, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IAuthUserInfoResponse } from '@edusys/model';
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
    this.setTitle('general.profile.title');
    this.initForm();
    this.navigationItems = [
      {
        text: 'navigation.profile',
      },
    ];
  }

  ngOnInit(): void {
    if (this.userInfo) {
      this.fillForm(this.userInfo);
    } else {
      this.authFacade.userInfo(this.fillForm);
    }
  }

  fillForm = (data: IAuthUserInfoResponse): void => {
    console.log(data);
    this.setForm({
      name: data.name,
      surname: data.surname,
      email: data.email,
    });
  };

  initForm = (): void => {
    this.createForm({
      name: new FormControl(''),
      surname: new FormControl(''),
      email: new FormControl(''),
    });
  };
}
