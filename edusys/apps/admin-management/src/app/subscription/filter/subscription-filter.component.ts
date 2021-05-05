import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { SubscriptionBaseContainer } from '../subscription-base.container';
import { ISubscriptionFilterRequest } from '@edusys/model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'subscription-filter',
  templateUrl: './subscription-filter.component.html',
  styleUrls: ['./subscription-filter.component.scss'],
})
export class SubscriptionFilterComponent extends SubscriptionBaseContainer implements OnInit {
  filterData: ISubscriptionFilterRequest;
  filterExpanded: boolean;

  @Output() onFilter = new EventEmitter<ISubscriptionFilterRequest>();

  constructor(injector: Injector) {
    super(injector);
    this.filterData = this.activatedRoute.snapshot.queryParams as ISubscriptionFilterRequest;
    const { page, pageSize, status, name, organization } = this.filterData || {};
    this.createForm({
      page: new FormControl(page || 0),
      pageSize: new FormControl(pageSize || 20),
      status: new FormControl(status),
      name: new FormControl(name),
      organizationId: new FormControl(organization),
    });
    this.filterExpanded = !!status || !!name || !!organization;
  }

  ngOnInit(): void {
    this.filter();
    if (!this.organizationList) this.organizationFacade.fetchOrganizationList();
  }

  filter(reset = false): void {
    const data: ISubscriptionFilterRequest = {
      page: reset ? 0 : this.form.value.page,
      pageSize: reset ? 20 : this.form.value.pageSize,
      status: this.form.value.status,
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
