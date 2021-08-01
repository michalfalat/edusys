import { Component, Injector, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ITaskFilterRequest } from '@edusys/model';
import { TaskBaseContainer } from '../task-base.container';

@Component({
  selector: 'edusys-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
})
export class TaskHomeComponent extends TaskBaseContainer {
  displayedColumns: string[] = ['createdAt', 'organization', 'name', 'priority', 'status'];
  filterData: ITaskFilterRequest;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(injector: Injector) {
    super(injector);
    this.setTitle('task.home.title');
    this.navigationItems = [
      {
        text: 'navigation.tasks',
      },
    ];
  }

  onPaginatorEvent(pageEvent: PageEvent): void {
    this.filter(null, pageEvent);
  }

  filter(filterData?: ITaskFilterRequest, pageEvent?: PageEvent): void {
    if (filterData) {
      this.filterData = filterData;
    }

    const filterRequest: ITaskFilterRequest = {
      ...this.filterData,
    };

    if (pageEvent) {
      filterRequest.page = pageEvent?.pageIndex || 0;
      filterRequest.pageSize = pageEvent?.pageSize || 20;
    } else {
    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: filterRequest,
      queryParamsHandling: 'merge',
    });
    this.taskFacade.fetchTaskList(filterRequest);
  }
}
