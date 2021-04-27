import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from '@edusys/core';
import { PERMISSION } from '@edusys/model';
import { IdentifierCreateComponent } from './create/identifier-create.component';
import { IdentifierDetailComponent } from './detail/identifier-detail.component';
import { IdentifierHomeComponent } from './home/identifier-home.component';

const routes: Routes = [
  {
    path: '',
    component: IdentifierHomeComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.IDENTIFIER.BASIC },
  },
  {
    path: 'detail/:identifierId',
    component: IdentifierDetailComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.IDENTIFIER.DETAIL, isEditMode: false },
  },
  {
    path: 'edit/:identifierId',
    component: IdentifierDetailComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.IDENTIFIER.EDIT, isEditMode: true },
  },
  {
    path: 'create',
    component: IdentifierCreateComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.IDENTIFIER.CREATE },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentifierRoutingModule {}
