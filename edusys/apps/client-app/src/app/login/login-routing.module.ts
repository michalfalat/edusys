import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCreatePasswordComponent } from './create-password/login-create-password.component';
import { LoginForgotPasswordComponent } from './forgot-password/login-forgot-password.component';
import { LoginHomeComponent } from './home/login-home.component';

const routes: Routes = [
  {
    path: '',
    component: LoginHomeComponent,
  },
  {
    path: 'create-password',
    component: LoginCreatePasswordComponent,
  },
  {
    path: 'forgot-password',
    component: LoginForgotPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
