import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { editModuleSchema, IModuleDetailResponse, IModuleEditRequest } from '@edusys/model';
import { UiConfirmModalComponent } from 'libs/core-ui/src/lib/components/ui-confirm-modal/ui-confirm-modal.component';
import { routes } from '../../utils/routes';
import { ModuleBaseContainer } from '../module-base.container';

@Component({
  selector: 'edusys-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModuleDetailComponent extends ModuleBaseContainer implements OnInit {
  isEditMode: boolean;
  constructor(injector: Injector) {
    super(injector);
    this.isEditMode = this.activatedRoute.snapshot.data.isEditMode;
    this.setBreadcrumbNavigation();
    this.createForm(
      {
        id: new FormControl(this.moduleDetail?.id),
        name: new FormControl(this.moduleDetail?.name),
        description: new FormControl(this.moduleDetail?.description),
        permissions: new FormControl(this.moduleDetail?.permissions),
      },
      editModuleSchema,
    );
  }

  ngOnInit(): void {
    this.moduleFacade.fetchModuleDetail(this.moduleId, this.setBreadcrumbNavigation, this.navigateToModuleHome);
  }

  fillForm = (module: IModuleDetailResponse): void => {
    this.form?.patchValue({ id: module?.id, name: module?.name, description: module?.description, permissions: module?.permissions });
  };

  deleteModule(): void {
    this.moduleFacade.deleteModule(this.moduleId, this.navigateToModuleHome);
  }

  showDeleteDialog(): void {
    const dialogRef = this.dialogService.open(UiConfirmModalComponent, {
      data: { title: 'general.delete.title', text: 'module.delete.text' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) this.deleteModule();
    });
  }

  setBreadcrumbNavigation = (response?: IModuleDetailResponse): void => {
    this.setTitle(this.isEditMode ? 'module.edit.title' : 'module.detail.title');
    this.fillForm(response);
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

  onEditModule(): void {
    const request: IModuleEditRequest = {
      id: this.moduleId,
      name: this.form?.value?.name,
      description: this.form?.value?.description,
      permissions: this.form?.value?.permissions,
    };
    this.moduleFacade.editModule(this.moduleId, request, () => {
      this.onSuccess('general.saved.success');
      this.navigateToModuleDetail(this.moduleId);
    });
  }
}
