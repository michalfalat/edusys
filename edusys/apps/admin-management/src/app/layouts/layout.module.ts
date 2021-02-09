import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SharedModule } from '../shared.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutsMainLayoutComponent } from './main-layout/layouts-main-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutsEmptyLayoutComponent } from './empty-layout/layouts-empty-layout.component';

@NgModule({
  declarations: [LayoutsMainLayoutComponent, HeaderComponent, LayoutsEmptyLayoutComponent],
  imports: [CommonModule, RouterModule, LayoutRoutingModule, SharedModule, MatSidenavModule],
})
export class LayoutModule {}
