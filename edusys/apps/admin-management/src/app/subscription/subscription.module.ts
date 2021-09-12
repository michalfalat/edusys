import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionHomeComponent } from './home/subscription-home.component';
import { SubscriptionDetailComponent } from './detail/subscription-detail.component';
import { SharedModule } from '../shared.module';
import { CoreUiModule } from '@edusys/core-ui';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SubscriptionFilterComponent } from './filter/subscription-filter.component';

@NgModule({
  declarations: [SubscriptionHomeComponent, SubscriptionFilterComponent, SubscriptionDetailComponent],
  imports: [CommonModule, SubscriptionRoutingModule, SharedModule, MatTableModule, CoreUiModule, MatPaginatorModule, MatExpansionModule, MatDatepickerModule],
})
export class SubscriptionModule {}
