import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackageCreateComponent } from './create/package-create.component';
import { PackageDetailComponent } from './detail/package-detail.component';
import { PackageEditComponent } from './edit/package-edit.component';
import { PackageHomeComponent } from './home/package-home.component';

const routes: Routes = [
  {
    path: '',
    component: PackageHomeComponent,
  },
  {
    path: 'detail/:packageId',
    component: PackageDetailComponent,
  },
  {
    path: 'edit/:packageId',
    component: PackageEditComponent,
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
