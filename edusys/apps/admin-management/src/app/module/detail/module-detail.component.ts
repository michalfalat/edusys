import { Component, Injector, OnInit } from '@angular/core';
import { ModuleBaseContainer } from '../module-base.container';

@Component({
  selector: 'edusys-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss'],
})
export class ModuleDetailComponent extends ModuleBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.moduleFacade.fetchModuleDetail(this.moduleId, null, this.navigateToModuleHome);
  }

  deleteModule(): void {
    this.moduleFacade.deleteModule(this.moduleId, this.navigateToModuleHome);
  }
}
