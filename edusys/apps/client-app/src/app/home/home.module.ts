import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLandingComponent } from './landing/home-landing.component';
import { HomeErrorComponent } from './error/home-error.component';
import { SharedModule } from '../shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  declarations: [HomeLandingComponent, HomeErrorComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, MatTabsModule, WidgetsModule],
})
export class HomeModule {}
