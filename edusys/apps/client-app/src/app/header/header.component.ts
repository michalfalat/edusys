import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { routes } from '../utils/routes';
import { HeaderBaseContainer } from './header-base.container';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends HeaderBaseContainer implements OnInit {
  languages: string[];
  @Output() onSidenavToogle = new EventEmitter<void>();
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
    this.navigateTo(routes.login.home);
  };

  navigateToProfile = (): void => {
    this.navigateTo(routes.profile);
  };
}
