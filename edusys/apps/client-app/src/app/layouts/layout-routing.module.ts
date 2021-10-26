import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@edusys/core';
import { PERMISSION } from '@edusys/model';
import { LayoutsEmptyLayoutComponent } from './empty-layout/layouts-empty-layout.component';
import { LayoutsMainLayoutComponent } from './main-layout/layouts-main-layout.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { routes as navigationRoutes } from '../utils/routes';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutsMainLayoutComponent,
    children: [
      {
        path: 'task',
        loadChildren: () => import('../task/task.module').then((m) => m.TaskModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [PERMISSION.TASK.BASIC],
            redirectTo: navigationRoutes.login,
          },
        },
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
      },
    ],
  },
  {
    path: '',
    component: LayoutsEmptyLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then((m) => m.LoginModule),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
