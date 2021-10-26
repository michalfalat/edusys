import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginHomeComponent } from './home/login-home.component';
import { LoginResetPasswordComponent } from './reset-password/login-reset-password.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared.module';
import { LoginCreatePasswordComponent } from './create-password/login-create-password.component';
import { LoginPartnersComponent } from './login-partners/login-partners.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [LoginHomeComponent, LoginResetPasswordComponent, LoginCreatePasswordComponent, LoginPartnersComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule, MatProgressBarModule],
})
export class LoginModule {}
