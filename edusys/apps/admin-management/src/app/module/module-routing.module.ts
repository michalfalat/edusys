import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleCreateComponent } from './create/module-create.component';
import { ModuleDetailComponent } from './detail/module-detail.component';
import { ModuleHomeComponent } from './home/module-home.component';

const routes: Routes = [
  {
    path: '',
    component: ModuleHomeComponent,
  },
  {
    path: 'detail/:moduleId',
    component: ModuleDetailComponent,
    data: { isEditMode: false },
  },
  {
    path: 'edit/:moduleId',
    component: ModuleDetailComponent,
    data: { isEditMode: true },
  },
  {
    path: 'create',
    component: ModuleCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleRoutingModule {}
