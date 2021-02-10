import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from '@edusys/core';
import { PERMISSION } from '@edusys/model';
import { ModuleCreateComponent } from './create/module-create.component';
import { ModuleDetailComponent } from './detail/module-detail.component';
import { ModuleEditComponent } from './edit/module-edit.component';
import { ModuleHomeComponent } from './home/module-home.component';

const routes: Routes = [
  {
    path: '',
    component: ModuleHomeComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.MODULE.BASIC },
  },
  {
    path: 'detail/:moduleId',
    component: ModuleDetailComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.MODULE.DETAIL },
  },
  {
    path: 'edit/:moduleId',
    component: ModuleEditComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.MODULE.EDIT },
  },
  {
    path: 'create',
    component: ModuleCreateComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.MODULE.CREATE },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleRoutingModule {}
