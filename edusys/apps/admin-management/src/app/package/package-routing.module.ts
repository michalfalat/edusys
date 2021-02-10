import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from '@edusys/core';
import { PERMISSION } from '@edusys/model';
import { PackageCreateComponent } from './create/package-create.component';
import { PackageDetailComponent } from './detail/package-detail.component';
import { PackageEditComponent } from './edit/package-edit.component';
import { PackageHomeComponent } from './home/package-home.component';

const routes: Routes = [
  {
    path: '',
    component: PackageHomeComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.PACKAGE.BASIC },
  },
  {
    path: 'detail/:packageId',
    component: PackageDetailComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.PACKAGE.DETAIL },
  },
  {
    path: 'edit/:packageId',
    component: PackageEditComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.PACKAGE.EDIT },
  },
  {
    path: 'create',
    component: PackageCreateComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.PACKAGE.CREATE },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageRoutingModule {}
