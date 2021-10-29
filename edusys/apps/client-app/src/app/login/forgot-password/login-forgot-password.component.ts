import { Component, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IAuthResetPasswordRequest, resetPasswordSchema } from '@edusys/model';
import { LoginBaseContainer } from '../login-base.container';

@Component({
  selector: 'app-login-forgot-password',
  templateUrl: './login-forgot-password.component.html',
  styleUrls: ['./login-forgot-password.component.scss'],
})
export class LoginForgotPasswordComponent extends LoginBaseContainer {
  token: string;
  emailSent: boolean;
  constructor(injector: Injector) {
    super(injector);
    this.setTitle('login.resetPassword.title');
    this.createForm(
      {
        email: new FormControl(),
      },
      resetPasswordSchema,
    );
  }

  onResetPassword(): void {
    const request: IAuthResetPasswordRequest = {
      email: this.form.value.email,
    };
    this.authFacade.resetPassword(
      request,
      () => {
        this.emailSent = true;
      },

      this.onError,
    );
  }
}
