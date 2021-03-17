import { Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonContainer, OrganizationFacade, TaskFacade } from '@edusys/core';
import { IOrganizationDetailResponse, ITaskDetailResponse, TaskPriority, TaskType } from '@edusys/model';
import { INavigationItem } from 'libs/core-ui/src/lib/components/ui-breadcrumb/ui-breadcrumb.component';
import { routes } from '../utils/routes';

export class TaskBaseContainer extends CommonContainer {
  taskFacade: TaskFacade;
  organizationFacade: OrganizationFacade;
  snackbar: MatSnackBar;
  taskList: ITaskDetailResponse[];
  taskDetail: ITaskDetailResponse;
  taskId: string;
  navigationItems: INavigationItem[];
  taskTypes = TaskType;
  taskPriorities = TaskPriority;
  organizations: IOrganizationDetailResponse[];

  constructor(injector: Injector) {
    super(injector);
    this.taskFacade = injector.get(TaskFacade);
    this.organizationFacade = injector.get(OrganizationFacade);
    this.snackbar = injector.get(MatSnackBar);

    this.subscriptions.add(this.organizationFacade.getOrganizationList$.subscribe((data) => (this.organizations = data)));
    this.subscriptions.add(this.taskFacade.getTaskList$.subscribe((data) => (this.taskList = data)));
    this.subscriptions.add(this.activatedRoute.params.subscribe((data) => (this.taskId = data?.taskId)));
    this.subscriptions.add(
      this.taskFacade.getTaskDetail$.subscribe((data) => {
        this.taskDetail = data?.id === this.taskId ? data : null;
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

  navigateToTaskHome = (): void => {
    this.navigateTo(routes.task.home);
  };

  navigateToTaskDetail = (taskId: string): void => {
    this.navigateTo(routes.task.detail, taskId);
  };

  navigateToTaskEdit = (taskId: string): void => {
    this.navigateTo(routes.task.edit, taskId);
  };

  navigateToTaskCreate = (): void => {
    this.navigateTo(routes.task.create);
  };
}
