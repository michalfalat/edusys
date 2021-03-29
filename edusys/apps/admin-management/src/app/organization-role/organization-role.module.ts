import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { OrganizationRoleRoutingModule } from './organization-role-routing.module';
import { OrganizationRoleHomeComponent } from './home/organization-role-home.component';
import { OrganizationRoleDetailComponent } from './detail/organization-role-detail.component';
import { OrganizationRoleCreateComponent } from './create/organization-role-create.component';
import { SharedModule } from '../shared.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [OrganizationRoleHomeComponent, OrganizationRoleDetailComponent, OrganizationRoleCreateComponent],
  imports: [CommonModule, OrganizationRoleRoutingModule, SharedModule, MatTableModule, MatTabsModule],
})
export class OrganizationRoleModule {}
