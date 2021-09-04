import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeErrorComponent } from './error/home-error.component';
import { HomeLandingComponent } from './landing/home-landing.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLandingComponent,
  },
  {
    path: '**',
    component: HomeErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
