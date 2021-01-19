import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { RegisterHomeComponent } from './home/register-home.component';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  declarations: [RegisterHomeComponent],
  imports: [CommonModule, RegisterRoutingModule, SharedModule],
})
export class RegisterModule {}
