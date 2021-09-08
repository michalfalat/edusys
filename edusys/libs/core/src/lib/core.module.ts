import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CreateStoreModule } from './store/create-store.module';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [CommonModule, HttpClientModule, CreateStoreModule, NgxPermissionsModule.forRoot()],
})
export class CoreModule {}
