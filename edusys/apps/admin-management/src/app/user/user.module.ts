import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './home/user-home.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserCreateComponent } from './create/user-create.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [UserHomeComponent, UserDetailComponent, UserCreateComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule, MatTableModule],
})
export class UserModule {}
