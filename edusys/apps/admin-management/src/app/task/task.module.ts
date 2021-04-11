import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

import { TaskRoutingModule } from './task-routing.module';
import { TaskHomeComponent } from './home/task-home.component';
import { TaskDetailComponent } from './detail/task-detail.component';
import { TaskCreateComponent } from './create/task-create.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [TaskHomeComponent, TaskDetailComponent, TaskCreateComponent],
  imports: [CommonModule, TaskRoutingModule, SharedModule, MatTableModule, MatChipsModule],
})
export class TaskModule {}
