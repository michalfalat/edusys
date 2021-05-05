import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { IdentifierBaseContainer } from '../identifier-base.container';
import { IAuthUserBasicResponse, IIdentifierFilterRequest } from '@edusys/model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'identifier-filter',
  templateUrl: './identifier-filter.component.html',
  styleUrls: ['./identifier-filter.component.scss'],
})
export class IdentifierFilterComponent extends IdentifierBaseContainer implements OnInit {
  filterData: IIdentifierFilterRequest;
  filterExpanded: boolean;
  organizationUsers: IAuthUserBasicResponse[];

  @Output() onFilter = new EventEmitter<IIdentifierFilterRequest>();

  constructor(injector: Injector) {
    super(injector);
    this.filterData = this.activatedRoute.snapshot.queryParams as IIdentifierFilterRequest;
    const { page, pageSize, status, number, organizationId, userId, type } = this.filterData || {};
    this.createForm({
      page: new FormControl(page || 0),
      pageSize: new FormControl(pageSize || 20),
      status: new FormControl(status),
      number: new FormControl(number),
      organizationId: new FormControl(organizationId),
      userId: new FormControl(userId),
      type: new FormControl(type),
    });
    this.filterExpanded = !!status || !!number || !!organizationId || !!type || !!userId;
  }

  ngOnInit(): void {
    if (!this.organizationList) this.organizationFacade.fetchOrganizationList();
    this.filter();
  }

  organizationChanged(): void {
    this.organizationFacade.fetchOrganizationDetail(this.form?.value?.organizationId, (data) => {
      this.organizationUsers = data.users;
    });
  }

  filter(reset = false): void {
    const data: IIdentifierFilterRequest = {
      page: reset ? 0 : this.form.value.page,
      pageSize: reset ? 20 : this.form.value.pageSize,
      status: this.form.value.status,
      number: this.form.value.number,
      type: this.form.value.type,
      organizationId: this.form.value.organizationId,
      userId: this.form.value.userId,
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
