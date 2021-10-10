import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { ProfileHomeComponent } from './home/profile-home.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileChangePasswordComponent } from './change-password/profile-change-password.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileBasicInfoComponent } from './basic-info/profile-basic-info.component';

@NgModule({
  declarations: [ProfileHomeComponent, ProfileChangePasswordComponent, ProfileBasicInfoComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule, MatTabsModule],
})
export class ProfileModule {}
