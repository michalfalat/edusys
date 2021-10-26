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
  isLoading: boolean;
  constructor(injector: Injector) {
    super(injector);
    this.setTitle('login.home.title');
    this.createForm({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    if (this.authService.getAuthToken()) {
      this.navigateToHome();
    }
  }

  onLogin(): void {
    if (!this.form.valid) {
      return;
    }
    this.isLoading = true;
    this.authFacade.login(
      {
        password: this.form?.value.password,
        email: this.form?.value.email,
        remember: false,
      },
      () => {
        this.authFacade.userInfo();
        this.authFacade.fetchInitData((data) => {
          this.permissionService.loadPermissions(data.permissions);
          this.navigateToProfile();
        });
      },
      (error) => {
        this.isLoading = false;
        this.onError(error.error?.messageLocalized || error.error);
      },
    );
  }
}
