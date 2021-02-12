import { Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonContainer, ModuleFacade } from '@edusys/core';
import { IModuleDetailResponse } from '@edusys/model';
import { routes } from '../utils/routes';

export class ModuleBaseContainer extends CommonContainer {
  moduleFacade: ModuleFacade;
  snackbar: MatSnackBar;
  moduleList: IModuleDetailResponse[];
  moduleDetail: IModuleDetailResponse;
  moduleId: string;

  constructor(injector: Injector) {
    super(injector);
    this.moduleFacade = injector.get(ModuleFacade);
    this.snackbar = injector.get(MatSnackBar);
    this.subscriptions.add(this.moduleFacade.getModuleList$.subscribe((data) => (this.moduleList = data)));
    this.subscriptions.add(this.activatedRoute.params.subscribe((data) => (this.moduleId = data?.moduleId)));
    this.subscriptions.add(
      this.moduleFacade.getModuleDetail$.subscribe((data) => {
        this.moduleDetail = data?.id === this.moduleId ? data : null;
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
