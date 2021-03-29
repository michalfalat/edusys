import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { PackageRoutingModule } from './package-routing.module';
import { PackageHomeComponent } from './home/package-home.component';
import { PackageDetailComponent } from './detail/package-detail.component';
import { PackageCreateComponent } from './create/package-create.component';
import { SharedModule } from '../shared.module';
import { CoreUiModule } from '@edusys/core-ui';

@NgModule({
  declarations: [PackageHomeComponent, PackageDetailComponent, PackageCreateComponent],
  imports: [CommonModule, PackageRoutingModule, SharedModule, MatTableModule, CoreUiModule],
})
export class PackageModule {}
