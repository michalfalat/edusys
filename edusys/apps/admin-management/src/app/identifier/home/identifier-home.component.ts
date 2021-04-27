import { Component, Injector, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IIdentifierFilterRequest } from '@edusys/model';
import { IdentifierBaseContainer } from '../identifier-base.container';
import { pickBy } from 'lodash-es';
import { identity } from 'lodash-es';
@Component({
  selector: 'edusys-identifier-home',
  templateUrl: './identifier-home.component.html',
  styleUrls: ['./identifier-home.component.scss'],
})
export class IdentifierHomeComponent extends IdentifierBaseContainer {
  displayedColumns: string[] = ['createdAt', 'organization', 'user', 'status', 'validUntil'];
  filterData: IIdentifierFilterRequest;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(injector: Injector) {
    super(injector);
    this.setTitle('identifier.home.title');
    this.navigationItems = [
      {
        text: 'navigation.identifiers',
      },
    ];
  }

  onPaginatorEvent(pageEvent: PageEvent): void {
    this.filter(null, pageEvent);
  }

  filter(filterData?: IIdentifierFilterRequest, pageEvent?: PageEvent): void {
    if (filterData) {
      this.filterData = filterData;
    }

    const filterRequest: any = {
      ...pickBy(filterData, identity),
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
    this.identifierFacade.fetchIdentifierList(filterRequest);
  }
}
