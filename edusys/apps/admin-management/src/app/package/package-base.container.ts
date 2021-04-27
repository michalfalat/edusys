import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonContainer, ModuleFacade, PackageFacade } from '@edusys/core';
import { IModuleDetailResponse, IPackageDetailResponse } from '@edusys/model';
import { INavigationItem } from 'libs/core-ui/src/lib/components/ui-breadcrumb/ui-breadcrumb.component';
import { NotificationService } from '../utils/notification.service';
import { routes } from '../utils/routes';

export class PackageBaseContainer extends CommonContainer {
  packageFacade: PackageFacade;
  moduleFacade: ModuleFacade;
  dialogService: MatDialog;
  notificationService: NotificationService;
  packageList: IPackageDetailResponse[];
  packageDetail: IPackageDetailResponse;
  moduleList: IModuleDetailResponse[];
  packageId: string;
  navigationItems: INavigationItem[];

  constructor(injector: Injector) {
    super(injector);
    this.packageFacade = injector.get(PackageFacade);
    this.moduleFacade = injector.get(ModuleFacade);
    this.notificationService = injector.get(NotificationService);
    this.dialogService = injector.get(MatDialog);
    this.subscriptions.add(this.moduleFacade.getModuleList$.subscribe((data) => (this.moduleList = data)));
    this.subscriptions.add(this.packageFacade.getPackageList$.subscribe((data) => (this.packageList = data)));
    this.subscriptions.add(this.activatedRoute.params.subscribe((data) => (this.packageId = data?.packageId)));
    this.subscriptions.add(
      this.packageFacade.getPackageDetail$.subscribe((data) => {
        this.packageDetail = data?.id === this.packageId ? data : null;
      }),
    );
  }

  onError = (message?: string): void => {
    this.notificationService.showError(message);
  };
  onSuccess = (message?: string): void => {
    this.notificationService.showSuccess(message);
  };

  navigateToPackageHome = (): void => {
    this.navigateTo(routes.package.home);
  };

  navigateToPackageDetail = (packageId: string): void => {
    this.navigateTo(routes.package.detail, packageId);
  };

  navigateToPackageEdit = (packageId: string): void => {
    this.navigateTo(routes.package.edit, packageId);
  };

  navigateToPackageCreate = (): void => {
    this.navigateTo(routes.package.create);
  };
}
