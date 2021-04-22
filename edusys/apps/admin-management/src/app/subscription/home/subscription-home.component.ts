import { Component, Injector, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ISubscriptionFilterRequest } from '@edusys/model';
import { SubscriptionBaseContainer } from '../subscription-base.container';

@Component({
  selector: 'edusys-subscription-home',
  templateUrl: './subscription-home.component.html',
  styleUrls: ['./subscription-home.component.scss'],
})
export class SubscriptionHomeComponent extends SubscriptionBaseContainer {
  displayedColumns: string[] = ['createdAt', 'organization', 'package', 'status', 'validUntil'];
  filterData: ISubscriptionFilterRequest;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(injector: Injector) {
    super(injector);
    this.setTitle('subscription.home.title');
    this.navigationItems = [
      {
        text: 'navigation.subscriptions',
      },
    ];
  }

  onPaginatorEvent(pageEvent: PageEvent): void {
    this.filter(null, pageEvent);
  }

  filter(filterData?: ISubscriptionFilterRequest, pageEvent?: PageEvent): void {
    if (filterData) {
      this.filterData = filterData;
    }

    const filterRequest: ISubscriptionFilterRequest = {
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
    this.subscriptionFacade.fetchSubscriptionList(filterRequest);
  }
}
