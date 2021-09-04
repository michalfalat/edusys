import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from '@edusys/core';
import { PERMISSION } from '@edusys/model';
import { TaskCreateComponent } from './create/task-create.component';
import { TaskDetailComponent } from './detail/task-detail.component';
import { TaskHomeComponent } from './home/task-home.component';

const routes: Routes = [
  {
    path: '',
    component: TaskHomeComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.TASK.BASIC },
  },
  {
    path: 'detail/:taskId',
    component: TaskDetailComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.TASK.DETAIL, isEditMode: false },
  },
  {
    path: 'edit/:taskId',
    component: TaskDetailComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.TASK.EDIT, isEditMode: true },
  },
  {
    path: 'create',
    component: TaskCreateComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.TASK.CREATE },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
