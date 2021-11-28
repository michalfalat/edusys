import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@edusys/core';
import { LayoutsEmptyLayoutComponent } from './empty-layout/layouts-empty-layout.component';
import { LayoutsMainLayoutComponent } from './main-layout/layouts-main-layout.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutsMainLayoutComponent,
    children: [
      {
        path: 'module',
        loadChildren: () => import('../module/module.module').then((m) => m.ModuleModule),
      },
      {
        path: 'package',
        loadChildren: () => import('../package/package.module').then((m) => m.PackageModule),
      },
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'organization',
        loadChildren: () => import('../organization/organization.module').then((m) => m.OrganizationModule),
      },
      {
        path: 'subscription',
        loadChildren: () => import('../subscription/subscription.module').then((m) => m.SubscriptionModule),
      },
      {
        path: 'task',
        loadChildren: () => import('../task/task.module').then((m) => m.TaskModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'organization-role',
        loadChildren: () => import('../organization-role/organization-role.module').then((m) => m.OrganizationRoleModule),
      },
      {
        path: 'log',
        loadChildren: () => import('../log/log.module').then((m) => m.LogModule),
      },
      {
        path: 'identifier',
        loadChildren: () => import('../identifier/identifier.module').then((m) => m.IdentifierModule),
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
