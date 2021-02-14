import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IModuleCreateRequest } from '@edusys/model';
import { routes } from '../../utils/routes';
import { ModuleBaseContainer } from '../module-base.container';

@Component({
  selector: 'edusys-module-create',
  templateUrl: './module-create.component.html',
  styleUrls: ['./module-create.component.scss'],
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
        text: 'Create',
      },
    ];
    this.setTitle('module.home.title');
    this.createForm({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onCreateModule(): void {
    const request: IModuleCreateRequest = {
      name: this.form?.value.name,
      description: this.form?.value.description,
    };
    this.moduleFacade.createModule(request, this.navigateToModuleHome);
  }
}
