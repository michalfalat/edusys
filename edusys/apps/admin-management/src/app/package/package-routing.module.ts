import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackageCreateComponent } from './create/package-create.component';
import { PackageDetailComponent } from './detail/package-detail.component';
import { PackageHomeComponent } from './home/package-home.component';

const routes: Routes = [
  {
    path: '',
    component: PackageHomeComponent,
  },
  {
    path: 'detail/:packageId',
    component: PackageDetailComponent,
    data: { isEditMode: false },
  },
  {
    path: 'edit/:packageId',
    component: PackageDetailComponent,
    data: { isEditMode: true },
  },
  {
    path: 'create',
    component: PackageCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageRoutingModule {}
