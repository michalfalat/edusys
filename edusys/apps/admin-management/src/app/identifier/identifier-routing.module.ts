import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdentifierCreateComponent } from './create/identifier-create.component';
import { IdentifierDetailComponent } from './detail/identifier-detail.component';
import { IdentifierHomeComponent } from './home/identifier-home.component';

const routes: Routes = [
  {
    path: '',
    component: IdentifierHomeComponent,
    canActivate: [],
  },
  {
    path: 'detail/:identifierId',
    component: IdentifierDetailComponent,
    canActivate: [],
    data: { isEditMode: false },
  },
  {
    path: 'edit/:identifierId',
    component: IdentifierDetailComponent,
    canActivate: [],
    data: { isEditMode: true },
  },
  {
    path: 'create',
    component: IdentifierCreateComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentifierRoutingModule {}
