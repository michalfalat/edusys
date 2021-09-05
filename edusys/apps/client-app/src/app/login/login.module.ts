import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginHomeComponent } from './home/login-home.component';
import { LoginResetPasswordComponent } from './reset-password/login-reset-password.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared.module';
import { LoginCreatePasswordComponent } from './create-password/login-create-password.component';

@NgModule({
  declarations: [LoginHomeComponent, LoginResetPasswordComponent, LoginCreatePasswordComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule],
})
export class LoginModule {}
