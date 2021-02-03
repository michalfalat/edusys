import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleHomeComponent } from './home/module-home.component';
import { ModuleDetailComponent } from './detail/module-detail.component';
import { ModuleEditComponent } from './edit/module-edit.component';
import { ModuleCreateComponent } from './create/module-create.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [ModuleHomeComponent, ModuleDetailComponent, ModuleEditComponent, ModuleCreateComponent],
  imports: [CommonModule, ModuleRoutingModule, SharedModule, MatTableModule],
})
export class ModuleModule {}
