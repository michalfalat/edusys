import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IOrganizationCreateRequest, IOrganizationDetailResponse, IOrganizationEditRequest } from '@edusys/model';
import {
  organizationCreateRequestAction,
  organizationDeleteRequestAction,
  organizationDetailRequestAction,
  organizationEditRequestAction,
  organizationListRequestAction,
} from './organization.actions';
import { getOrganizationDetail, getOrganizationList } from './organization.selectors';
import IOrganizationState from './organization.reducer';

@Injectable({
  providedIn: 'root',
})
export class OrganizationFacade {
  constructor(private store: Store<IOrganizationState>) {}
  getOrganizationList$ = this.store.pipe(select(getOrganizationList));
  getOrganizationDetail$ = this.store.pipe(select(getOrganizationDetail));

  fetchOrganizationList(onSucceeded?: (response: IOrganizationDetailResponse[]) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(organizationListRequestAction({ onSucceeded, onError }));
  }

  fetchOrganizationDetail(
    organizationId: string,
    onSucceeded?: (response: IOrganizationDetailResponse) => void,
    onError?: (response: HttpErrorResponse) => void
  ): void {
    this.store.dispatch(organizationDetailRequestAction({ organizationId, onSucceeded, onError }));
  }

  editOrganization(
    organizationId: string,
    payload: IOrganizationEditRequest,
    onSucceeded?: (response: IOrganizationDetailResponse) => void,
    onError?: (response: HttpErrorResponse) => void
  ): void {
    this.store.dispatch(organizationEditRequestAction({ organizationId, payload, onSucceeded, onError }));
  }

  createOrganization(
    payload: IOrganizationCreateRequest,
    onSucceeded?: (response: IOrganizationDetailResponse) => void,
    onError?: (response: HttpErrorResponse) => void
  ): void {
    this.store.dispatch(organizationCreateRequestAction({ payload, onSucceeded, onError }));
  }

  deleteOrganization(organizationId: string, onSucceeded?: () => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(organizationDeleteRequestAction({ organizationId, onSucceeded, onError }));
  }
}
