import { Component, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createPasswordSchema, IAuthCreatePasswordRequest, IAuthVerificationTokenInfoRequest } from '@edusys/model';
import { routes } from '../../utils/routes';
import { LoginBaseContainer } from '../login-base.container';

@Component({
  selector: 'app-login-create-password',
  templateUrl: './login-create-password.component.html',
  styleUrls: ['./login-create-password.component.scss'],
})
export class LoginCreatePasswordComponent extends LoginBaseContainer implements OnInit {
  token: string;
  constructor(injector: Injector) {
    super(injector);
    this.subscriptions.add(this.activatedRoute.queryParams.subscribe((data) => (this.token = data?.token)));
    this.setTitle('login.createPassword.title');
    this.createForm(
      {
        email: new FormControl(),
        password: new FormControl(),
        token: new FormControl(this.token),
      },
      createPasswordSchema,
    );
  }

  ngOnInit(): void {
    const request: IAuthVerificationTokenInfoRequest = {
      token: this.token,
    };
    this.authFacade.verifyTokenInfo(
      request,
      (data) => {
        if (data.expired) {
          this.onError('error.expiredToken');
          this.navigateTo(routes.login);
        }
        this.form?.patchValue({
          email: data.email,
        });
      },

      (error) => this.onTokenError(error),
    );
  }

  onCreatePassword(): void {
    const request: IAuthCreatePasswordRequest = {
      token: this.token,
      password: this.form.value.password,
    };
    this.authFacade.createPassword(
      request,
      () => {
        this.onSuccess('login.createPassword.success');
        this.navigateTo(routes.login);
      },

      (error) => this.onTokenError(error),
    );
  }

  onTokenError = (error: any): void => {
    this.onError(error.error?.messageLocalized || error.error);
    this.navigateTo(routes.login);
  };
}
