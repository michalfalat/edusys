import { Injector } from '@angular/core';
import { AuthFacade, CommonContainer } from '@edusys/core';
import { CoreTranslateService } from '@edusys/core-translate';
import { IAuthInitDataResponse, IAuthUserInfoResponse } from '@edusys/model';

export class HeaderBaseContainer extends CommonContainer {
  authFacade: AuthFacade;
  translateService: CoreTranslateService;
  userInfo: IAuthUserInfoResponse;
  initData: IAuthInitDataResponse;

  constructor(injector: Injector) {
    super(injector);
    this.authFacade = injector.get(AuthFacade);
    this.translateService = injector.get(CoreTranslateService);
    this.subscriptions.add(this.authFacade.getUserInfo$.subscribe((data) => (this.userInfo = data)));
    this.subscriptions.add(this.authFacade.getInitData$.subscribe((data) => (this.initData = data)));
  }

  onError = (): void => {};
  onSuccess = (): void => {};
}
