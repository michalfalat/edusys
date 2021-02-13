import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLandingComponent } from './landing/home-landing.component';
import { HomeErrorComponent } from './error/home-error.component';

@NgModule({
  declarations: [HomeLandingComponent, HomeErrorComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
