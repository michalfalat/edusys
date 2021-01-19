import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SharedModule } from '../shared.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [MainLayoutComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, LayoutRoutingModule, SharedModule],
})
export class LayoutModule {}
