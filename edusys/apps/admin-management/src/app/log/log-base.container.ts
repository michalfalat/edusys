import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonContainer, LogFacade } from '@edusys/core';
import { ILogDetailResponse, Pagination } from '@edusys/model';
import { INavigationItem } from 'libs/core-ui/src/lib/components/ui-breadcrumb/ui-breadcrumb.component';
import { NotificationService } from '../utils/notification.service';
import { routes } from '../utils/routes';

export class LogBaseContainer extends CommonContainer {
  logFacade: LogFacade;
  dialogService: MatDialog;
  notificationService: NotificationService;
  logList: Pagination<ILogDetailResponse>;
  logDetail: ILogDetailResponse;
  logId: string;
  navigationItems: INavigationItem[];

  constructor(injector: Injector) {
    super(injector);
    this.logFacade = injector.get(LogFacade);
    this.notificationService = injector.get(NotificationService);
    this.dialogService = injector.get(MatDialog);
    this.subscriptions.add(this.logFacade.getLogList$.subscribe((data) => (this.logList = data)));
    this.subscriptions.add(this.activatedRoute.params.subscribe((data) => (this.logId = data?.logId)));
    this.subscriptions.add(
      this.logFacade.getLogDetail$.subscribe((data) => {
        this.logDetail = data?.id === this.logId ? data : null;
      }),
    );
  }

  onError = (message?: string): void => {
    this.notificationService.showError(message);
  };
  onSuccess = (message?: string): void => {
    this.notificationService.showSuccess(message);
  };

  navigateToLogHome = (): void => {
    this.navigateTo(routes.log.home);
  };

  navigateToLogDetail = (logId: string): void => {
    this.navigateTo(routes.log.detail, logId);
  };
}
