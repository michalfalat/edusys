import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskCreateComponent } from './create/task-create.component';
import { TaskDetailComponent } from './detail/task-detail.component';
import { TaskHomeComponent } from './home/task-home.component';

const routes: Routes = [
  {
    path: '',
    component: TaskHomeComponent,
  },
  {
    path: 'detail/:taskId',
    component: TaskDetailComponent,
    data: { isEditMode: false },
  },
  {
    path: 'edit/:taskId',
    component: TaskDetailComponent,
    data: { isEditMode: true },
  },
  {
    path: 'create',
    component: TaskCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
