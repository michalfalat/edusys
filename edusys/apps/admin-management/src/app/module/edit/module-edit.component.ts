import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IModuleDetailResponse, IModuleEditRequest } from '@edusys/model';
import { ModuleBaseContainer } from '../module-base.container';

@Component({
  selector: 'edusys-module-edit',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.scss'],
})
export class ModuleEditComponent extends ModuleBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.setTitle('module.edit.title');
    this.createForm({
      name: new FormControl(this.moduleDetail?.name, Validators.required),
      description: new FormControl(this.moduleDetail?.description, Validators.required),
    });
  }

  ngOnInit(): void {
    this.moduleFacade.fetchModuleDetail(this.moduleId, this.fillForm, this.navigateToModuleHome);
  }

  fillForm = (module: IModuleDetailResponse): void => {
    this.form?.patchValue({ name: module?.name, description: module?.description });
  };

  onEditModule(): void {
    const request: IModuleEditRequest = {
      id: this.moduleId,
      name: this.form?.value.name,
      description: this.form?.value.description,
    };
    this.moduleFacade.editModule(this.moduleId, request, () => {
      this.navigateToModuleDetail(this.moduleId);
    });
  }
}
