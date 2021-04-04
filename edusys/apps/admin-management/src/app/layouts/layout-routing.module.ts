import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, PermissionGuard } from '@edusys/core';
import { PERMISSION } from '@edusys/model';
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
        canActivate: [PermissionGuard],
        data: { moduleName: PERMISSION.MODULE.BASIC },
      },
      {
        path: 'package',
        loadChildren: () => import('../package/package.module').then((m) => m.PackageModule),
        canActivate: [PermissionGuard],
        data: { moduleName: PERMISSION.PACKAGE.BASIC },
      },
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then((m) => m.UserModule),
        canActivate: [PermissionGuard],
        data: { moduleName: PERMISSION.USER.BASIC },
      },
      {
        path: 'organization',
        loadChildren: () => import('../organization/organization.module').then((m) => m.OrganizationModule),
        canActivate: [PermissionGuard],
        data: { moduleName: PERMISSION.ORGANIZATION.BASIC },
      },
      {
        path: 'task',
        loadChildren: () => import('../task/task.module').then((m) => m.TaskModule),
        canActivate: [PermissionGuard],
        data: { moduleName: PERMISSION.TASK.BASIC },
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
        canActivate: [PermissionGuard],
        data: { moduleName: PERMISSION.ORGANIZATION_ROLE.BASIC },
      },
      {
        path: 'log',
        loadChildren: () => import('../log/log.module').then((m) => m.LogModule),
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
