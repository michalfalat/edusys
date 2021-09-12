import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UiConfirmModalComponent } from '@edusys/core-ui';
import { editTaskSchema, IFileDetailResponse, ITaskDetailResponse, ITaskEditRequest } from '@edusys/model';
import { routes } from '../../utils/routes';
import { TaskBaseContainer } from '../task-base.container';

@Component({
  selector: 'edusys-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent extends TaskBaseContainer implements OnInit {
  isEditMode: boolean;
  constructor(injector: Injector) {
    super(injector);
    this.isEditMode = this.activatedRoute.snapshot.data.isEditMode;
    this.setBreadcrumbNavigation();
    this.createForm(
      {
        id: new FormControl(this.taskDetail?.id),
        name: new FormControl(this.taskDetail?.name),
        description: new FormControl(this.taskDetail?.description),
        place: new FormControl(this.taskDetail?.place),
        organizationId: new FormControl(this.taskDetail?.organization?.id),
        attachments: this.fb.array(this.taskDetail?.attachments || []),
        type: new FormControl(this.taskDetail?.type),
        status: new FormControl(this.taskDetail?.status),
        priority: new FormControl(this.taskDetail?.priority),
      },
      editTaskSchema,
    );
  }

  ngOnInit(): void {
    if (!this.organizations) this.organizationFacade.fetchOrganizationList();
    this.taskFacade.fetchTaskDetail(this.taskId, this.setBreadcrumbNavigation, this.navigateToTaskHome);
  }

  fillForm = (data: ITaskDetailResponse): void => {
    this.form?.patchValue({
      id: data.id,
      name: data.name,
      description: data.description,
      place: data.place,
      organizationId: data.organization?.id,
      type: data.type,
      status: data.status,
      priority: data.priority,
    });
    this.form?.setControl('attachments', this.fb.array(data.attachments || []));
  };

  deleteTask(): void {
    this.taskFacade.deleteTask(this.taskId, this.navigateToTaskHome);
  }

  addAttachment(file: IFileDetailResponse): void {
    const control = <FormArray>this.form.get('attachments');
    control.push(this.fb.group(file));
  }

  removeAttachment(file: IFileDetailResponse): void {
    const control = <FormArray>this.form.get('attachments');
    control.removeAt(control.value.findIndex((a) => a.id === file.id));
  }

  createAttachmentGroup(attachment?: IFileDetailResponse): FormGroup {
    return this.fb.group({
      id: new FormControl(attachment.id),
      mimeType: new FormControl(attachment.mimeType),
      name: new FormControl(attachment.name),
      type: new FormControl(attachment.type),
      url: new FormControl(attachment.url),
    });
  }

  onEditTask(): void {
    const request: ITaskEditRequest = {
      id: this.form.value.id,
      name: this.form.value.name,
      description: this.form.value.description,
      place: this.form.value.place,
      organizationId: this.form.value.organizationId,
      type: this.form.value.type,
      status: this.form.value.status,
      priority: this.form.value.priority,
      attachments: this.form.value.attachments,
      estimatedDescription: this.form.value.estimatedDescription,
      estimatedFixOn: this.form.value.estimatedFixOn,
      finalDescription: this.form.value.finalDescription,
      fixedBy: this.form.value.fixedBy,
      fixedOn: this.form.value.fixedOn,
    };
    this.taskFacade.editTask(this.taskId, request, () => {
      this.onSuccess('general.saved.success');
      this.navigateToTaskDetail(this.taskId);
    });
  }

  setBreadcrumbNavigation = (response?: ITaskDetailResponse): void => {
    this.fillForm(response);
    const title = this.taskDetail?.name || response?.name || 'task.detail.title';
    this.navigationItems = [
      {
        text: 'navigation.tasks',
        route: routes.task.home,
      },
      {
        text: title,
      },
    ];
    this.setTitle(title);
  };

  showDeleteDialog(): void {
    const dialogRef = this.dialogService.open(UiConfirmModalComponent, {
      data: { title: 'general.delete.title', text: 'task.delete.text' },
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (!!result)
          this.taskFacade.deleteTask(
            this.taskId,
            () => {
              this.onSuccess('general.delete.success');
              this.navigateToTaskHome();
            },
            (err) => {
              this.onError(err);
            },
          );
      }),
    );
  }
}
