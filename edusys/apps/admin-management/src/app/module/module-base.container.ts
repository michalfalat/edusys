import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonContainer, ModuleFacade } from '@edusys/core';
import { IModuleDetailResponse, PERMISSION, PERMISSIONS_GROUPS } from '@edusys/model';
import { INavigationItem } from 'libs/core-ui/src/lib/components/ui-breadcrumb/ui-breadcrumb.component';
import { NotificationService } from '../utils/notification.service';
import { routes } from '../utils/routes';

export class ModuleBaseContainer extends CommonContainer {
  moduleFacade: ModuleFacade;
  notificationService: NotificationService;
  dialogService: MatDialog;
  moduleList: IModuleDetailResponse[];
  moduleDetail: IModuleDetailResponse;
  moduleId: string;
  navigationItems: INavigationItem[];
  permissionsGroups = PERMISSIONS_GROUPS;
  permissions = PERMISSION;

  constructor(injector: Injector) {
    super(injector);
    this.moduleFacade = injector.get(ModuleFacade);
    this.notificationService = injector.get(NotificationService);
    this.dialogService = injector.get(MatDialog);
    this.subscriptions.add(this.moduleFacade.getModuleList$.subscribe((data) => (this.moduleList = data)));
    this.subscriptions.add(this.activatedRoute.params.subscribe((data) => (this.moduleId = data?.moduleId)));
    this.subscriptions.add(
      this.moduleFacade.getModuleDetail$.subscribe((data) => {
        this.moduleDetail = data?.id === this.moduleId ? data : null;
      }),
    );
  }

  onError = (message?: string): void => {
    this.notificationService.showError(message);
  };
  onSuccess = (message?: string): void => {
    this.notificationService.showSuccess(message);
  };

  navigateToModuleHome = (): void => {
    this.navigateTo(routes.module.home);
  };

  navigateToModuleDetail = (moduleId: string): void => {
    this.navigateTo(routes.module.detail, moduleId);
  };

  navigateToModuleEdit = (moduleId: string): void => {
    this.navigateTo(routes.module.edit, moduleId);
  };

  navigateToModuleCreate = (): void => {
    this.navigateTo(routes.module.create);
  };
}
