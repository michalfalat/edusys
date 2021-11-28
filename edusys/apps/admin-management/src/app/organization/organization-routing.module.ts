import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationCreateComponent } from './create/organization-create.component';
import { OrganizationDetailComponent } from './detail/organization-detail.component';
import { OrganizationHomeComponent } from './home/organization-home.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationHomeComponent,
  },
  {
    path: 'detail/:organizationId',
    component: OrganizationDetailComponent,
    data: { isEditMode: false },
  },
  {
    path: 'edit/:organizationId',
    component: OrganizationDetailComponent,
    data: { isEditMode: true },
  },
  {
    path: 'create',
    component: OrganizationCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
