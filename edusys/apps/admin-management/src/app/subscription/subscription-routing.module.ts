import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from '@edusys/core';
import { PERMISSION } from '@edusys/model';
import { SubscriptionDetailComponent } from './detail/subscription-detail.component';
import { SubscriptionHomeComponent } from './home/subscription-home.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionHomeComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.LOG.BASIC },
  },
  {
    path: 'detail/:subscriptionId',
    component: SubscriptionDetailComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.LOG.DETAIL },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
