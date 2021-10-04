import { HttpErrorResponse } from '@angular/common/http';
import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthFacade, CommonContainer, ICommonError, OrganizationFacade, TaskFacade } from '@edusys/core';
import { INavigationItem } from '@edusys/core-ui';
import { IOrganizationDetailResponse, ITaskDetailResponse, Pagination, PERMISSION, TaskPriority, TaskStatus, TaskType } from '@edusys/model';
import { NotificationService } from '../utils/notification.service';
import { routes } from '../utils/routes';

export class TaskBaseContainer extends CommonContainer {
  taskFacade: TaskFacade;
  authFacade: AuthFacade;
  organizationFacade: OrganizationFacade;
  taskList: Pagination<ITaskDetailResponse>;
  taskDetail: ITaskDetailResponse;
  taskId: string;
  navigationItems: INavigationItem[];
  taskTypes = TaskType;
  taskPriorities = TaskPriority;
  taskStatuses = TaskStatus;
  activeOrganization: IOrganizationDetailResponse;
  organizations: IOrganizationDetailResponse[];
  notificationService: NotificationService;
  dialogService: MatDialog;
  PERMISSION = PERMISSION;

  constructor(injector: Injector) {
    super(injector);
    this.taskFacade = injector.get(TaskFacade);
    this.organizationFacade = injector.get(OrganizationFacade);
    this.authFacade = injector.get(AuthFacade);
    this.notificationService = injector.get(NotificationService);
    this.dialogService = injector.get(MatDialog);

    this.subscriptions.add(this.organizationFacade.getOrganizationList$.subscribe((data) => (this.organizations = data)));
    this.subscriptions.add(this.taskFacade.getTaskList$.subscribe((data) => (this.taskList = data)));
    this.subscriptions.add(this.activatedRoute.params.subscribe((data) => (this.taskId = data?.taskId)));
    this.subscriptions.add(this.authFacade.getInitData$.subscribe((data) => (this.activeOrganization = data.activeOrganization)));
    this.subscriptions.add(
      this.taskFacade.getTaskDetail$.subscribe((data) => {
        this.taskDetail = data?.id === this.taskId ? data : null;
      }),
    );
  }

  onError = (message?: string | HttpErrorResponse | ICommonError): void => {
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
