import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { LogRoutingModule } from './log-routing.module';
import { LogHomeComponent } from './home/log-home.component';
import { LogDetailComponent } from './detail/log-detail.component';
import { SharedModule } from '../shared.module';
import { CoreUiModule } from '@edusys/core-ui';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { LogFilterComponent } from './filter/log-filter.component';

@NgModule({
  declarations: [LogHomeComponent, LogFilterComponent, LogDetailComponent],
  imports: [
    CommonModule,
    LogRoutingModule,
    SharedModule,
    MatTableModule,
    CoreUiModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
})
export class LogModule {}
