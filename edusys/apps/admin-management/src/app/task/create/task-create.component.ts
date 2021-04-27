import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { createTaskSchema, IFileDetailResponse, ITaskCreateRequest, TaskPriority, TaskType } from '@edusys/model';
import { routes } from '../../utils/routes';
import { TaskBaseContainer } from '../task-base.container';

@Component({
  selector: 'edusys-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent extends TaskBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.navigationItems = [
      {
        text: 'navigation.tasks',
        route: routes.task.home,
      },
      {
        text: 'general.new',
      },
    ];
    this.setTitle('task.home.title');
    this.createForm(
      {
        name: new FormControl(''),
        description: new FormControl(''),
        place: new FormControl(''),
        organizationId: new FormControl(''),
        attachments: this.fb.array([]),
        type: new FormControl(TaskType.IT),
        priority: new FormControl(TaskPriority.MEDIUM),
      },
      createTaskSchema,
    );
  }

  addAttachment(file: IFileDetailResponse): void {
    const control = <FormArray>this.form.get('attachments');
    control.push(this.fb.group(file));
  }

  removeAttachment(index: number): void {
    const control = <FormArray>this.form.get('attachments');
    control.removeAt(index);
  }

  ngOnInit(): void {
    this.organizationFacade.fetchOrganizationList();
  }

  onCreateTask(): void {
    const request: ITaskCreateRequest = {
      name: this.form?.value.name,
      description: this.form?.value.description,
      place: this.form?.value.place,
      organizationId: this.form?.value.organizationId,
      attachments: this.form?.value.attachments,
      type: this.form?.value.type,
      priority: this.form?.value.priority,
    };
    this.taskFacade.createTask(request, this.navigateToTaskHome);
  }
}
