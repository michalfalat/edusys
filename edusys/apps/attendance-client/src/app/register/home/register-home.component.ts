import { Component, Injector } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthFacade } from '@edusys/core';
import { RegisterBaseContainer } from '../register-base.container';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-register-home',
  templateUrl: './register-home.component.html',
  styleUrls: ['./register-home.component.scss'],
})
export class RegisterHomeComponent extends RegisterBaseContainer {
  authFacade: AuthFacade;
  constructor(injector: Injector) {
    super(injector);
    this.authFacade = injector.get(AuthFacade);
    this.setTitle('general.register.title');
    this.createForm({
      firstName: new FormControl(null),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onRegister(): void {
    this.authFacade.register(
      {
        name: this.form?.value.firstName,
        password: this.form?.value.password,
        email: this.form?.value.email,
      },
      () => {
        this.onLogin();
      },
      (error) => {
        this.onError(error.error?.message || error.error);
      },
    );
  }
}
