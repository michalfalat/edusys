import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { LogBaseContainer } from '../log-base.container';
import { ILogFilterRequest } from '@edusys/model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'log-filter',
  templateUrl: './log-filter.component.html',
  styleUrls: ['./log-filter.component.scss'],
})
export class LogFilterComponent extends LogBaseContainer implements OnInit {
  filterData: ILogFilterRequest;
  filterExpanded: boolean;

  @Output() onFilter = new EventEmitter<ILogFilterRequest>();

  constructor(injector: Injector) {
    super(injector);
    this.filterData = this.activatedRoute.snapshot.queryParams as ILogFilterRequest;
    const { page, pageSize, keyword, level, fromDate, toDate } = this.filterData || {};
    this.createForm({
      page: new FormControl(page || 0),
      pageSize: new FormControl(pageSize || 20),
      level: new FormControl(level),
      keyword: new FormControl(keyword),
      fromDate: new FormControl(fromDate ? new Date(fromDate) : undefined),
      toDate: new FormControl(toDate ? new Date(toDate) : undefined),
    });
    this.filterExpanded = !!keyword || !!level || !!fromDate || !!toDate;
  }

  ngOnInit(): void {
    this.filter();
  }

  filter(reset = false): void {
    const data: ILogFilterRequest = {
      page: reset ? 0 : this.form.value.page,
      pageSize: reset ? 20 : this.form.value.pageSize,
      level: this.form.value.level,
      keyword: this.form.value.keyword,
      fromDate: this.form.value.fromDate ? this.form.value.fromDate.toISOString() : undefined,
      toDate: this.form.value.toDate ? this.form.value.toDate.toISOString() : undefined,
    };
    this.onFilter.emit(data);
  }

  clearFilter(field?: string): void {
    if (field) {
      this.form.patchValue({ [field]: undefined });
    } else {
      this.form.reset();
    }
    this.filter(true);
  }
}
