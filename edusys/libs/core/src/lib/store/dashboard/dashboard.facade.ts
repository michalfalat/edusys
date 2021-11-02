import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICommonError } from '@edusys/core';
import { IDashboardResponse } from '@edusys/model';
import { select, Store } from '@ngrx/store';
import { dashboardRequestAction } from './dashboard.actions';
import IDashboardState from './dashboard.reducer';
import { getDashboardData } from './dashboard.selectors';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  constructor(private store: Store<IDashboardState>) {}
  getDashboardData$ = this.store.pipe(select(getDashboardData));

  fetchDashboard(onSucceeded?: (response: IDashboardResponse) => void, onError?: (response: HttpErrorResponse | ICommonError) => void): void {
    this.store.dispatch(dashboardRequestAction({ onSucceeded, onError }));
  }
}
