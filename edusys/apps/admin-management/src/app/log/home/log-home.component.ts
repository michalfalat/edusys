import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LogBaseContainer } from '../log-base.container';
import { ILogFilterCriteria, ILogFilterRequest } from '@edusys/model';
import { FormControl } from '@angular/forms';
import { compact, identity, pickBy } from 'lodash';

@Component({
  selector: 'edusys-log-home',
  templateUrl: './log-home.component.html',
  styleUrls: ['./log-home.component.scss'],
})
export class LogHomeComponent extends LogBaseContainer implements OnInit {
  displayedColumns: string[] = ['createdAt', 'level', 'message', 'meta'];
  pageSize = 20;
  filterData: ILogFilterRequest;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(injector: Injector) {
    super(injector);
    this.setTitle('log.home.title');
    this.subscriptions.add(this.logFacade.getLogFilter$.subscribe((data) => (this.filterData = data)));
    this.navigationItems = [
      {
        text: 'navigation.logs',
      },
    ];
    this.createForm({
      level: new FormControl(this.filterData?.filter?.level),
      keyword: new FormControl(this.filterData?.filter?.keyword),
      fromDate: new FormControl(this.filterData?.filter?.fromDate),
      toDate: new FormControl(this.filterData?.filter?.toDate),
    });
  }

  ngOnInit(): void {
    this.filter();
  }

  onPaginatorEvent(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.filter();
  }

  filter(resetPaging: boolean = false): void {
    if (resetPaging) {
      this.paginator.pageIndex = 0;
    }
    this.logFacade.fetchLogList({
      page: this.paginator?.pageIndex || 0,
      pageSize: this.pageSize,
      filter: pickBy(this.form.value, identity),
    });
  }

  clearFilter(field?: string): void {
    if (!!field) {
      this.form.patchValue({ [field]: undefined });
    } else {
      this.form.reset();
    }
    this.filter();
  }
}
