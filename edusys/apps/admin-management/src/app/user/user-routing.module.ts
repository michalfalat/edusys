import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from '@edusys/core';
import { PERMISSION } from '@edusys/model';
import { UserCreateComponent } from './create/user-create.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserHomeComponent } from './home/user-home.component';

const routes: Routes = [
  {
    path: '',
    component: UserHomeComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.PACKAGE.BASIC },
  },
  {
    path: 'detail/:userId',
    component: UserDetailComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.PACKAGE.DETAIL, isEditMode: false },
  },
  {
    path: 'edit/:userId',
    component: UserDetailComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.PACKAGE.EDIT, isEditMode: true },
  },
  {
    path: 'create',
    component: UserCreateComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.PACKAGE.CREATE },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
