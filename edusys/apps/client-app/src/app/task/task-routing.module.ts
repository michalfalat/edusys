import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PERMISSION } from '@edusys/model';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { routes as navigationRoutes } from '../utils/routes';
import { TaskCreateComponent } from './create/task-create.component';
import { TaskDetailComponent } from './detail/task-detail.component';
import { TaskHomeComponent } from './home/task-home.component';

const routes: Routes = [
  {
    path: '',
    component: TaskHomeComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [PERMISSION.TASK.BASIC],
        redirectTo: navigationRoutes.home,
      },
    },
  },
  {
    path: 'detail/:taskId',
    component: TaskDetailComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [PERMISSION.TASK.DETAIL],
        redirectTo: navigationRoutes.task.home,
      },
      isEditMode: false,
    },
  },
  {
    path: 'edit/:taskId',
    component: TaskDetailComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [PERMISSION.TASK.EDIT],
        redirectTo: navigationRoutes.task.home,
      },
      isEditMode: true,
    },
  },
  {
    path: 'create',
    component: TaskCreateComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [PERMISSION.TASK.CREATE],
        redirectTo: navigationRoutes.task.home,
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
