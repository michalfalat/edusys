import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogDetailComponent } from './detail/log-detail.component';
import { LogHomeComponent } from './home/log-home.component';

const routes: Routes = [
  {
    path: '',
    component: LogHomeComponent,
  },
  {
    path: 'detail/:logId',
    component: LogDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogRoutingModule {}
