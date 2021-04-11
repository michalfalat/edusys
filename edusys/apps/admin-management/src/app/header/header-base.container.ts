import { Injector } from '@angular/core';
import { AuthFacade, CommonContainer } from '@edusys/core';
import { CoreTranslateService } from '@edusys/core-translate';
import { IAuthUserInfoResponse } from '@edusys/model';

export class HeaderBaseContainer extends CommonContainer {
  authFacade: AuthFacade;
  userInfo: IAuthUserInfoResponse;
  translateService: CoreTranslateService;

  constructor(injector: Injector) {
    super(injector);
    this.authFacade = injector.get(AuthFacade);
    this.translateService = injector.get(CoreTranslateService);
    this.subscriptions.add(this.authFacade.getUserInfo$.subscribe((data) => (this.userInfo = data)));
  }

  onError = (message?: string): void => {};
  onSuccess = (message?: string): void => {};
}
