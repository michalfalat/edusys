import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

import { TaskRoutingModule } from './task-routing.module';
import { TaskHomeComponent } from './home/task-home.component';
import { TaskDetailComponent } from './detail/task-detail.component';
import { TaskCreateComponent } from './create/task-create.component';
import { SharedModule } from '../shared.module';
import { TaskFilterComponent } from './filter/task-filter.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [TaskHomeComponent, TaskDetailComponent, TaskCreateComponent, TaskFilterComponent],
  imports: [CommonModule, TaskRoutingModule, SharedModule, MatTableModule, MatChipsModule, MatDatepickerModule, MatExpansionModule, MatPaginatorModule],
})
export class TaskModule {}
