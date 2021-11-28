import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule, httpInterceptorProviders } from '@edusys/core';
import { CoreTranslateModule } from '@edusys/core-translate';
import { APP_CONFIG } from '@edusys/app-config';
import { LayoutModule } from './layouts/layout.module';
import { MatDayjsDateModule } from '@tabuckner/material-dayjs-adapter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { appConfig } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    HttpClientModule,
    CoreModule,
    CoreTranslateModule,
    LayoutModule,
    MatDayjsDateModule,
    FlexLayoutModule,
  ],
  providers: [{ provide: APP_CONFIG, useValue: appConfig }, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
