import { Component, Injector, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { changePasswordSchema, IAuthUserChangePasswordRequest } from '@edusys/model';
import { ProfileBaseContainer } from '../profile-base.container';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.scss'],
})
export class ProfileChangePasswordComponent extends ProfileBaseContainer {
  @Input() lastPasswordChange: string;
  constructor(injector: Injector) {
    super(injector);
    this.initForm();
    this.navigationItems = [
      {
        text: 'navigation.profile',
      },
    ];
  }

  initForm = (): void => {
    this.createForm(
      {
        oldPassword: new FormControl(''),
        newPassword: new FormControl(''),
        newPasswordConfirm: new FormControl(''),
      },
      changePasswordSchema,
    );
  };

  onChangePassword(): void {
    const request: IAuthUserChangePasswordRequest = {
      oldPassword: this.form.value.oldPassword,
      newPassword: this.form.value.newPassword,
      newPasswordConfirm: this.form.value.newPasswordConfirm,
    };
    this.authFacade.changePassword(
      request,
      () => {
        this.onSuccess('profile.passwordChanged.success');
      },
      (error) => {
        this.onError(error);
      },
    );
  }
}
