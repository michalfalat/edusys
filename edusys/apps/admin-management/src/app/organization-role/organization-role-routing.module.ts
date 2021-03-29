import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from '@edusys/core';
import { PERMISSION } from '@edusys/model';
import { OrganizationRoleCreateComponent } from './create/organization-role-create.component';
import { OrganizationRoleDetailComponent } from './detail/organization-role-detail.component';
import { OrganizationRoleHomeComponent } from './home/organization-role-home.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationRoleHomeComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.PACKAGE.BASIC },
  },
  {
    path: 'detail/:organizationRoleId',
    component: OrganizationRoleDetailComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.PACKAGE.DETAIL, isEditMode: false },
  },
  {
    path: 'edit/:organizationRoleId',
    component: OrganizationRoleDetailComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.PACKAGE.EDIT, isEditMode: true },
  },
  {
    path: 'create',
    component: OrganizationRoleCreateComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.PACKAGE.CREATE },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoleRoutingModule {}
