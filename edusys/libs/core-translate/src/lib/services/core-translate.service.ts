import { EventEmitter, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreTranslateService {
  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['sk']);
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  getTranslation(key: string): string {
    let result: string;
    this.translateService.get(key).subscribe((translatedKey) => (result = translatedKey));
    return result;
  }

  getTranslation$(key: string): Observable<string> {
    return this.translateService.get(key);
  }

  onLangChange(): EventEmitter<any> {
    return this.translateService.onLangChange;
  }

  getLanguages(): string[] {
    return this.translateService.getLangs();
  }

  getCurrentLanguage(): string {
    return this.translateService.currentLang;
  }
}
