import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IAuthUserInfoResponse } from '@edusys/model';
import { ProfileBaseContainer } from '../profile-base.container';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-profile-basic-info',
  templateUrl: './profile-basic-info.component.html',
  styleUrls: ['./profile-basic-info.component.scss'],
})
export class ProfileBasicInfoComponent extends ProfileBaseContainer implements OnInit {
  @Input() userInfo: IAuthUserInfoResponse;
  constructor(injector: Injector) {
    super(injector);
    this.initForm();
  }

  ngOnInit(): void {
    this.fillForm();
  }

  fillForm = (): void => {
    this.setForm({
      name: this.userInfo.name,
      surname: this.userInfo.surname,
      email: this.userInfo.email,
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
