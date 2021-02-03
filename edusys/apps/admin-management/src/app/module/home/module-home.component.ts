import { Component, Injector, OnInit } from '@angular/core';
import { ModuleBaseContainer } from '../module-base.container';

@Component({
  selector: 'edusys-module-home',
  templateUrl: './module-home.component.html',
  styleUrls: ['./module-home.component.scss'],
})
export class ModuleHomeComponent extends ModuleBaseContainer implements OnInit {
  displayedColumns: string[] = ['name', 'description'];
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.moduleFacade.fetchModuleList();
  }
}
