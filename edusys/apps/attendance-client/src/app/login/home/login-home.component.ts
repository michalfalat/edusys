import { Component, Injector } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginBaseContainer } from '../login-base.container';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.scss'],
})
export class LoginHomeComponent extends LoginBaseContainer {
  constructor(injector: Injector) {
    super(injector);
    this.setTitle('general.login.title');
    this.createForm({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin(): void {
    this.authFacade.login(
      {
        password: this.form?.value.password,
        email: this.form?.value.email,
        remember: false,
      },
      () => {
        this.authFacade.userInfo();
        this.navigateToProfile();
      },
      (error) => {
        this.onError(error.error?.message || error.error);
      },
    );
  }
}
