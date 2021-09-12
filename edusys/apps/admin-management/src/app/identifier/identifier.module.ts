import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { IdentifierRoutingModule } from './identifier-routing.module';
import { IdentifierHomeComponent } from './home/identifier-home.component';
import { IdentifierDetailComponent } from './detail/identifier-detail.component';
import { SharedModule } from '../shared.module';
import { CoreUiModule } from '@edusys/core-ui';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IdentifierFilterComponent } from './filter/identifier-filter.component';
import { IdentifierCreateComponent } from './create/identifier-create.component';

@NgModule({
  declarations: [IdentifierHomeComponent, IdentifierFilterComponent, IdentifierDetailComponent, IdentifierCreateComponent],
  imports: [CommonModule, IdentifierRoutingModule, SharedModule, MatTableModule, CoreUiModule, MatPaginatorModule, MatExpansionModule, MatDatepickerModule],
})
export class IdentifierModule {}
