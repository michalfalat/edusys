import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createModuleSchema, IModuleCreateRequest } from '@edusys/model';
import { routes } from '../../utils/routes';
import { ModuleBaseContainer } from '../module-base.container';

@Component({
  selector: 'edusys-module-create',
  templateUrl: './module-create.component.html',
  styleUrls: ['./module-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModuleCreateComponent extends ModuleBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.navigationItems = [
      {
        text: 'navigation.modules',
        route: routes.module.home,
      },
      {
        text: 'general.new',
      },
    ];
    this.setTitle('module.home.title');
    this.createForm(
      {
        name: new FormControl(''),
        description: new FormControl(''),
        permissions: new FormControl([]),
      },
      createModuleSchema
    );
  }

  ngOnInit(): void {}

  onCreateModule(): void {
    const request: IModuleCreateRequest = {
      name: this.form?.value.name,
      description: this.form?.value.description,
      permissions: this.form?.value?.permissions,
    };
    this.moduleFacade.createModule(request, this.navigateToModuleHome);
  }
}
