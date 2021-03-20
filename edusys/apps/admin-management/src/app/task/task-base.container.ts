import { Injector } from '@angular/core';
import { CommonContainer, OrganizationFacade, TaskFacade } from '@edusys/core';
import { IOrganizationDetailResponse, ITaskDetailResponse, TaskPriority, TaskType } from '@edusys/model';
import { INavigationItem } from 'libs/core-ui/src/lib/components/ui-breadcrumb/ui-breadcrumb.component';
import { NotificationService } from '../utils/notification.service';
import { routes } from '../utils/routes';

export class TaskBaseContainer extends CommonContainer {
  taskFacade: TaskFacade;
  organizationFacade: OrganizationFacade;
  taskList: ITaskDetailResponse[];
  taskDetail: ITaskDetailResponse;
  taskId: string;
  navigationItems: INavigationItem[];
  taskTypes = TaskType;
  taskPriorities = TaskPriority;
  organizations: IOrganizationDetailResponse[];
  notificationService: NotificationService;

  constructor(injector: Injector) {
    super(injector);
    this.taskFacade = injector.get(TaskFacade);
    this.organizationFacade = injector.get(OrganizationFacade);
    this.notificationService = injector.get(NotificationService);

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
    this.notificationService.showError(message);
  };
  onSuccess = (message?: string): void => {
    this.notificationService.showSuccess(message);
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
