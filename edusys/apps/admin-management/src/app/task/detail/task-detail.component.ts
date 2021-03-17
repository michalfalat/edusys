import { Component, Injector, OnInit } from '@angular/core';
import { ITaskDetailResponse } from '@edusys/model';
import { routes } from '../../utils/routes';
import { TaskBaseContainer } from '../task-base.container';

@Component({
  selector: 'edusys-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent extends TaskBaseContainer implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.setBreadcrumbNavigation();
  }

  ngOnInit(): void {
    this.taskFacade.fetchTaskDetail(this.taskId, this.setBreadcrumbNavigation, this.navigateToTaskHome);
  }

  deleteTask(): void {
    this.taskFacade.deleteTask(this.taskId, this.navigateToTaskHome);
  }

  setBreadcrumbNavigation = (response?: ITaskDetailResponse): void => {
    this.navigationItems = [
      {
        text: 'navigation.tasks',
        route: routes.task.home,
      },
      {
        text: this.taskDetail?.name || response?.name || 'Detail',
      },
    ];
  };
}
