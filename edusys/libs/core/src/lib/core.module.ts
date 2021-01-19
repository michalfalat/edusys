import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CreateStoreModule } from './store/create-store.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, CreateStoreModule],
})
export class CoreModule {}
