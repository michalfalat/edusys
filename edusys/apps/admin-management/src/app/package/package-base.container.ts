import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonContainer, ModuleFacade, PackageFacade } from '@edusys/core';
import { IModuleDetailResponse, IPackageDetailResponse } from '@edusys/model';
import { INavigationItem } from 'libs/core-ui/src/lib/components/ui-breadcrumb/ui-breadcrumb.component';
import { routes } from '../utils/routes';

export class PackageBaseContainer extends CommonContainer {
  packageFacade: PackageFacade;
  moduleFacade: ModuleFacade;
  dialogService: MatDialog;
  snackbar: MatSnackBar;
  packageList: IPackageDetailResponse[];
  packageDetail: IPackageDetailResponse;
  moduleList: IModuleDetailResponse[];
  packageId: string;
  navigationItems: INavigationItem[];

  constructor(injector: Injector) {
    super(injector);
    this.packageFacade = injector.get(PackageFacade);
    this.moduleFacade = injector.get(ModuleFacade);
    this.snackbar = injector.get(MatSnackBar);
    this.dialogService = injector.get(MatDialog);
    this.subscriptions.add(this.moduleFacade.getModuleList$.subscribe((data) => (this.moduleList = data)));
    this.subscriptions.add(this.packageFacade.getPackageList$.subscribe((data) => (this.packageList = data)));
    this.subscriptions.add(this.activatedRoute.params.subscribe((data) => (this.packageId = data?.packageId)));
    this.subscriptions.add(
      this.packageFacade.getPackageDetail$.subscribe((data) => {
        this.packageDetail = data?.id === this.packageId ? data : null;
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
