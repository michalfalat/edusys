import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationHomeComponent } from './home/organization-home.component';
import { OrganizationDetailComponent } from './detail/organization-detail.component';
import { OrganizationEditComponent } from './edit/organization-edit.component';
import { OrganizationCreateComponent } from './create/organization-create.component';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [OrganizationHomeComponent, OrganizationDetailComponent, OrganizationEditComponent, OrganizationCreateComponent],
  imports: [CommonModule, OrganizationRoutingModule, SharedModule, MatTableModule, MatStepperModule],
})
export class OrganizationModule {}
