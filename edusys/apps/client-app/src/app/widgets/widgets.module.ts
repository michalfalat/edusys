import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetTaskDataComponent } from './components/task-data/widget-task-data.component';
import { SharedModule } from '../shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [WidgetTaskDataComponent],
  exports: [WidgetTaskDataComponent],
  imports: [CommonModule, SharedModule, MatProgressBarModule],
})
export class WidgetsModule {}
