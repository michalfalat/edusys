import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonContainer, LogFacade } from '@edusys/core';
import { ILogDetailResponse, Pagination } from '@edusys/model';
import { INavigationItem } from 'libs/core-ui/src/lib/components/ui-breadcrumb/ui-breadcrumb.component';
import { routes } from '../utils/routes';

export class LogBaseContainer extends CommonContainer {
  logFacade: LogFacade;
  dialogService: MatDialog;
  snackbar: MatSnackBar;
  logList: Pagination<ILogDetailResponse>;
  logDetail: ILogDetailResponse;
  logId: string;
  navigationItems: INavigationItem[];

  constructor(injector: Injector) {
    super(injector);
    this.logFacade = injector.get(LogFacade);
    this.snackbar = injector.get(MatSnackBar);
    this.dialogService = injector.get(MatDialog);
    this.subscriptions.add(this.logFacade.getLogList$.subscribe((data) => (this.logList = data)));
    this.subscriptions.add(this.activatedRoute.params.subscribe((data) => (this.logId = data?.logId)));
    this.subscriptions.add(
      this.logFacade.getLogDetail$.subscribe((data) => {
        this.logDetail = data?.id === this.logId ? data : null;
      })
    );
  }

  onError = (message?: string): void => {
    console.log('error :>> ', message);
    this.snackbar.open(message);
  };
  onSuccess = (message?: string): void => {
    this.snackbar.open(message);
  };

  navigateToLogHome = (): void => {
    this.navigateTo(routes.log.home);
  };

  navigateToLogDetail = (logId: string): void => {
    this.navigateTo(routes.log.detail, logId);
  };
}
