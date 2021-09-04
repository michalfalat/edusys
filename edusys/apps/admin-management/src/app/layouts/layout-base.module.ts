import { Injector } from '@angular/core';
import { AppFacade, CommonContainer } from '@edusys/core';
import { AppDeviceScreen } from 'libs/core/src/lib/model/app/app.model';
import { delay } from 'rxjs/operators';

export class LayoutBaseContainer extends CommonContainer {
  appFacade: AppFacade;
  pendingTasks: string[];
  sidenavMode: string;
  deviceScreen: AppDeviceScreen;

  constructor(injector: Injector) {
    super(injector);
    this.appFacade = injector.get(AppFacade);
    this.subscriptions.add(this.appFacade.getPendingRequests$.pipe(delay(0)).subscribe((data) => (this.pendingTasks = data)));
    this.subscriptions.add(
      this.layoutService.deviceScreen().subscribe((data) => {
        console.log(data);
        this.deviceScreen = data;
        this.sidenavMode = data === AppDeviceScreen.MOBILE ? 'over' : 'side';
      }),
    );
  }

  onSuccess: (message?: string) => void;
  onError: (message?: string) => void;
}
