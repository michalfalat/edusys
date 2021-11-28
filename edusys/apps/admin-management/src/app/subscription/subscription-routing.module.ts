import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionDetailComponent } from './detail/subscription-detail.component';
import { SubscriptionHomeComponent } from './home/subscription-home.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionHomeComponent,
  },
  {
    path: 'detail/:subscriptionId',
    component: SubscriptionDetailComponent,
    data: { isEditMode: false },
  },
  {
    path: 'edit/:subscriptionId',
    component: SubscriptionDetailComponent,
    data: { isEditMode: true },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
