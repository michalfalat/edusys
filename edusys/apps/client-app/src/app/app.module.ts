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

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule.forRoot([], {}), HttpClientModule, CoreModule, CoreTranslateModule, LayoutModule],
  providers: [
    { provide: APP_CONFIG, useValue: appConfig },
    httpInterceptorProviders,
    {
      provide: APP_INITIALIZER,
      useFactory: loadInitData,

      deps: [AuthFacade, NgxPermissionsService],
      multi: true,
    },
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
