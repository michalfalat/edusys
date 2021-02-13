import { Component, Injector, OnInit } from '@angular/core';
import { routes } from '../utils/routes';
import { HeaderBaseContainer } from './header-base.container';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends HeaderBaseContainer implements OnInit {
  languages: string[];
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.languages = this.translateService.getLanguages();
    this.authFacade.userInfo();
  }

  setLanguage(lang: string): void {
    this.translateService.changeLanguage(lang);
  }

  onLogout(): void {
    this.authFacade.logout(this.navigateToLogin);
  }

  navigateToLogin = (): void => {
    this.navigateTo(routes.login);
  };
}
