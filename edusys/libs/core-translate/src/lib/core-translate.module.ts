import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '@edusys/app-config';

export function createTranslateLoader(http: HttpClient, appConfig: APP_CONFIG) {
  return new TranslateHttpLoader(http, `${appConfig.apiUrl}/locales/`, '.json');
}

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient, APP_CONFIG],
      },
      defaultLanguage: 'en',
    }),
  ],
})
export class CoreTranslateModule {}
