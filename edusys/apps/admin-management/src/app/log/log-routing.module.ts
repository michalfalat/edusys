import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from '@edusys/core';
import { PERMISSION } from '@edusys/model';
import { LogDetailComponent } from './detail/log-detail.component';
import { LogHomeComponent } from './home/log-home.component';

const routes: Routes = [
  {
    path: '',
    component: LogHomeComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.LOG.BASIC },
  },
  {
    path: 'detail/:logId',
    component: LogDetailComponent,
    canActivate: [PermissionGuard],
    data: { moduleName: PERMISSION.LOG.DETAIL },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogRoutingModule {}
