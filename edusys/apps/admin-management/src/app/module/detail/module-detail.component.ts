import { Component, Injector, OnInit } from '@angular/core';
import { IModuleDetailResponse } from '@edusys/model';
import { routes } from '../../utils/routes';
import { ModuleBaseContainer } from '../module-base.container';

@Component({
  selector: 'edusys-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss'],
})
export class ModuleDetailComponent extends ModuleBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.setBreadcrumbNavigation();
  }

  ngOnInit(): void {
    this.moduleFacade.fetchModuleDetail(this.moduleId, this.setBreadcrumbNavigation, this.navigateToModuleHome);
  }

  deleteModule(): void {
    this.moduleFacade.deleteModule(this.moduleId, this.navigateToModuleHome);
  }

  setBreadcrumbNavigation = (response?: IModuleDetailResponse): void => {
    this.navigationItems = [
      {
        text: 'navigation.modules',
        route: routes.module.home,
      },
      {
        text: this.moduleDetail?.name || response?.name || 'Detail',
      },
    ];
  };
}
