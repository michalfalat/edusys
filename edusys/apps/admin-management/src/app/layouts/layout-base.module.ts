import { Injector } from '@angular/core';
import { AppFacade, CommonContainer } from '@edusys/core';
import { delay } from 'rxjs/operators';

export class LayoutBaseContainer extends CommonContainer {
  appFacade: AppFacade;
  pendingTasks: string[];

  constructor(injector: Injector) {
    super(injector);
    this.appFacade = injector.get(AppFacade);
    this.subscriptions.add(this.appFacade.getPendingRequests$.pipe(delay(0)).subscribe((data) => (this.pendingTasks = data)));
  }

  onSuccess: (message?: string) => void;
  onError: (message?: string) => void;
}
