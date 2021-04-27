import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appEffects } from './app.effects';
import { appReducers } from './app.reducers';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forRoot(appReducers, {}), EffectsModule.forRoot(appEffects), StoreDevtoolsModule.instrument({ maxAge: 25 })],
  providers: [],
})
export class CreateStoreModule {}
