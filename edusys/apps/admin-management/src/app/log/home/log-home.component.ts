import { Component, Injector, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ILogFilterRequest } from '@edusys/model';
import { LogBaseContainer } from '../log-base.container';

@Component({
  selector: 'edusys-log-home',
  templateUrl: './log-home.component.html',
  styleUrls: ['./log-home.component.scss'],
})
export class LogHomeComponent extends LogBaseContainer {
  displayedColumns: string[] = ['createdAt', 'level', 'message', 'meta'];
  filterData: ILogFilterRequest;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(injector: Injector) {
    super(injector);
    this.setTitle('log.home.title');
    this.navigationItems = [
      {
        text: 'navigation.logs',
      },
    ];
  }

  onPaginatorEvent(pageEvent: PageEvent): void {
    this.filter(null, pageEvent);
  }

  filter(filterData?: ILogFilterRequest, pageEvent?: PageEvent): void {
    if (filterData) {
      this.filterData = filterData;
    }

    const filterRequest: ILogFilterRequest = {
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
    this.logFacade.fetchLogList(filterRequest);
  }
}
