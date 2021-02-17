import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, missingTranslations } from '@edusys/app-config';

export function createTranslateLoader(http: HttpClient, appConfig: APP_CONFIG) {
  return new TranslateHttpLoader(http, `${appConfig.apiUrl}/locales/`, '.json');
}

@Injectable({
  providedIn: 'root',
})
export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): any {
    const missingKey = params.key;
    missingTranslations[missingKey] = missingKey; // or any structure holding missing translations
    // console.warn('Missing translations: ', missingKey, missingTranslations);
    return `${missingKey}`;
  }
}

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler },
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient, APP_CONFIG],
      },
      defaultLanguage: 'en',
    }),
  ],
  exports: [TranslateModule],
})
export class CoreTranslateModule {}
