import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLandingComponent } from './landing/home-landing.component';

@NgModule({
  declarations: [HomeLandingComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
