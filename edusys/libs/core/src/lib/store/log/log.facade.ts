import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogDetailResponse, ILogFilterRequest, Pagination } from '@edusys/model';
import { select, Store } from '@ngrx/store';
import { logDeleteRequestAction, logDetailRequestAction, logListRequestAction } from './log.actions';
import ILogState from './log.reducer';
import { getLogFilter, getLogDetail, getLogList } from './log.selectors';

@Injectable({
  providedIn: 'root',
})
export class LogFacade {
  constructor(private store: Store<ILogState>) {}
  getLogList$ = this.store.pipe(select(getLogList));
  getLogDetail$ = this.store.pipe(select(getLogDetail));
  getLogFilter$ = this.store.pipe(select(getLogFilter));

  fetchLogList(
    request: ILogFilterRequest,
    onSucceeded?: (response: Pagination<ILogDetailResponse>) => void,
    onError?: (response: HttpErrorResponse) => void
  ): void {
    this.store.dispatch(logListRequestAction({ request, onSucceeded, onError }));
  }

  fetchLogDetail(logId: string, onSucceeded?: (response: ILogDetailResponse) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(logDetailRequestAction({ logId, onSucceeded, onError }));
  }

  deleteLog(logId: string, onSucceeded?: () => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(logDeleteRequestAction({ logId, onSucceeded, onError }));
  }
}
