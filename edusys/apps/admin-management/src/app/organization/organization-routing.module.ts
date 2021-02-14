import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from '@edusys/core';
import { PERMISSION } from '@edusys/model';
import { OrganizationCreateComponent } from './create/organization-create.component';
import { OrganizationDetailComponent } from './detail/organization-detail.component';
import { OrganizationEditComponent } from './edit/organization-edit.component';
import { OrganizationHomeComponent } from './home/organization-home.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationHomeComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.ORGANIZATION.BASIC },
  },
  {
    path: 'detail/:organizationId',
    component: OrganizationDetailComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.ORGANIZATION.DETAIL },
  },
  {
    path: 'edit/:organizationId',
    component: OrganizationEditComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.ORGANIZATION.EDIT },
  },
  {
    path: 'create',
    component: OrganizationCreateComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.ORGANIZATION.CREATE },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
