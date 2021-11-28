import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateComponent } from './create/user-create.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserHomeComponent } from './home/user-home.component';

const routes: Routes = [
  {
    path: '',
    component: UserHomeComponent,
  },
  {
    path: 'detail/:userId',
    component: UserDetailComponent,
    data: { isEditMode: false },
  },
  {
    path: 'edit/:userId',
    component: UserDetailComponent,
    data: { isEditMode: true },
  },
  {
    path: 'create',
    component: UserCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
