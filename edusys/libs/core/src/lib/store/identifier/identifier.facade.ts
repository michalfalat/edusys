import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IIdentifierCreateRequest, IIdentifierDetailResponse, IIdentifierEditRequest, IIdentifierFilterRequest, Pagination } from '@edusys/model';
import {
  identifierCreateRequestAction,
  identifierDeleteRequestAction,
  identifierDetailRequestAction,
  identifierEditRequestAction,
  identifierListRequestAction,
} from './identifier.actions';
import { getIdentifierDetail, getIdentifierList } from './identifier.selectors';
import IIdentifierState from './identifier.reducer';

@Injectable({
  providedIn: 'root',
})
export class IdentifierFacade {
  constructor(private store: Store<IIdentifierState>) {}
  getIdentifierList$ = this.store.pipe(select(getIdentifierList));
  getIdentifierDetail$ = this.store.pipe(select(getIdentifierDetail));

  fetchIdentifierList(
    request: IIdentifierFilterRequest,
    onSucceeded?: (response: Pagination<IIdentifierDetailResponse>) => void,
    onError?: (response: any) => void
  ): void {
    this.store.dispatch(identifierListRequestAction({ request, onSucceeded, onError }));
  }

  fetchIdentifierDetail(identifierId: string, onSucceeded?: (response: IIdentifierDetailResponse) => void, onError?: (response: any) => void): void {
    this.store.dispatch(identifierDetailRequestAction({ identifierId, onSucceeded, onError }));
  }

  editIdentifier(
    identifierId: string,
    payload: IIdentifierEditRequest,
    onSucceeded?: (response: IIdentifierDetailResponse) => void,
    onError?: (response: any) => void
  ): void {
    this.store.dispatch(identifierEditRequestAction({ identifierId, payload, onSucceeded, onError }));
  }

  createIdentifier(payload: IIdentifierCreateRequest, onSucceeded?: (response: IIdentifierDetailResponse) => void, onError?: (response: any) => void): void {
    this.store.dispatch(identifierCreateRequestAction({ payload, onSucceeded, onError }));
  }

  deleteIdentifier(identifierId: string, onSucceeded?: () => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(identifierDeleteRequestAction({ identifierId, onSucceeded, onError }));
  }
}
