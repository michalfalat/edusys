import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthFacade, CoreModule, httpInterceptorProviders } from '@edusys/core';
import { CoreTranslateModule } from '@edusys/core-translate';
import { APP_CONFIG } from '@edusys/app-config';
import { LayoutModule } from './layouts/layout.module';
import { appConfig } from '../environments/environment';
import { NgxPermissionsService } from 'ngx-permissions';
import { MatDayjsDateModule } from '@tabuckner/material-dayjs-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_DATE_FORMAT = {
  display: {
    dateInput: 'DD.MM. YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([], {}),
    HttpClientModule,
    CoreModule,
    CoreTranslateModule,
    LayoutModule,
    MatDayjsDateModule,
  ],
  providers: [
    { provide: APP_CONFIG, useValue: appConfig },
    httpInterceptorProviders,
    {
      provide: APP_INITIALIZER,
      useFactory: loadInitData,

      deps: [AuthFacade, NgxPermissionsService],
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'sk-SK' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function loadInitData(authFacade: AuthFacade, ps: NgxPermissionsService): Function {
  return () => {
    const promise = new Promise<boolean>((resolve) => {
      authFacade.fetchInitData((data) => {
        ps.loadPermissions(data.permissions);
        resolve(true);
      });
    });

    return promise;
  };
}
