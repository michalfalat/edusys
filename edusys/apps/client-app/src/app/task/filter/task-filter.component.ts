import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { TaskBaseContainer } from '../task-base.container';
import { ITaskFilterRequest } from '@edusys/model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
})
export class TaskFilterComponent extends TaskBaseContainer implements OnInit {
  filterData: ITaskFilterRequest;
  filterExpanded: boolean;

  @Output() onFilter = new EventEmitter<ITaskFilterRequest>();

  constructor(injector: Injector) {
    super(injector);
    this.filterData = this.activatedRoute.snapshot.queryParams as ITaskFilterRequest;
    const { page, pageSize, status, name, organization, description, place, priority } = this.filterData || {};
    this.createForm({
      page: new FormControl(page || 0),
      pageSize: new FormControl(pageSize || 20),
      status: new FormControl(status),
      priority: new FormControl(priority),
      description: new FormControl(description),
      place: new FormControl(place),
      name: new FormControl(name),
      organizationId: new FormControl(organization),
    });
    this.filterExpanded = !!status || !!name || !!organization;
  }

  ngOnInit(): void {
    this.filter();
    if (!this.organizations) this.organizationFacade.fetchOrganizationList();
  }

  filter(reset = false): void {
    const data: ITaskFilterRequest = {
      page: reset ? 0 : this.form.value.page,
      pageSize: reset ? 20 : this.form.value.pageSize,
      status: this.form.value.status,
      priority: this.form.value.priority,
      description: this.form.value.description,
      place: this.form.value.place,
      name: this.form.value.name,
      organization: this.form.value.organizationId,
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
