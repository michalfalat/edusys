import { Injector } from '@angular/core';
import { AppDeviceScreen, AppFacade, CommonContainer } from '@edusys/core';
import { delay } from 'rxjs/operators';

export class LayoutBaseContainer extends CommonContainer {
  appFacade: AppFacade;
  pendingTasks: string[];
  sidenavMode: string;
  deviceScreen: AppDeviceScreen;
  sidenavOpened: boolean;

  constructor(injector: Injector) {
    super(injector);
    this.appFacade = injector.get(AppFacade);
    this.subscriptions.add(this.appFacade.getPendingRequests$.pipe(delay(0)).subscribe((data) => (this.pendingTasks = data)));
    this.subscriptions.add(
      this.layoutService.deviceScreen().subscribe((data) => {
        this.deviceScreen = data;
        this.sidenavMode = data === AppDeviceScreen.MOBILE ? 'over' : 'side';
        this.sidenavOpened = this.deviceScreen !== AppDeviceScreen.MOBILE;
      }),
    );
  }

  onSuccess: (message?: string) => void;
  onError: (message?: string) => void;
}
