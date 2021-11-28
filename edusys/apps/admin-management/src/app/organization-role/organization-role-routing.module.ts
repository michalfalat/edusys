import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationRoleCreateComponent } from './create/organization-role-create.component';
import { OrganizationRoleDetailComponent } from './detail/organization-role-detail.component';
import { OrganizationRoleHomeComponent } from './home/organization-role-home.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationRoleHomeComponent,
  },
  {
    path: 'detail/:organizationRoleId',
    component: OrganizationRoleDetailComponent,
    data: { isEditMode: false },
  },
  {
    path: 'edit/:organizationRoleId',
    component: OrganizationRoleDetailComponent,
    data: { isEditMode: true },
  },
  {
    path: 'create',
    component: OrganizationRoleCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoleRoutingModule {}
