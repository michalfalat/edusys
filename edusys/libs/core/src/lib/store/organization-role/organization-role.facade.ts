import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IOrganizationRoleCreateRequest, IOrganizationRoleDetailResponse, IOrganizationRoleEditRequest } from '@edusys/model';
import {
  organizationRoleCreateRequestAction,
  organizationRoleDeleteRequestAction,
  organizationRoleDetailRequestAction,
  organizationRoleEditRequestAction,
  organizationRoleListRequestAction,
} from './organization-role.actions';
import { getOrganizationRoleDetail, getOrganizationRoleList } from './organization-role.selectors';
import IOrganizationRoleState from './organization-role.reducer';

@Injectable({
  providedIn: 'root',
})
export class OrganizationRoleFacade {
  constructor(private store: Store<IOrganizationRoleState>) {}
  getOrganizationRoleList$ = this.store.pipe(select(getOrganizationRoleList));
  getOrganizationRoleDetail$ = this.store.pipe(select(getOrganizationRoleDetail));

  fetchOrganizationRoleList(onSucceeded?: (response: IOrganizationRoleDetailResponse[]) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(organizationRoleListRequestAction({ onSucceeded, onError }));
  }

  fetchOrganizationRoleDetail(
    organizationRoleId: string,
    onSucceeded?: (response: IOrganizationRoleDetailResponse) => void,
    onError?: (response: HttpErrorResponse) => void
  ): void {
    this.store.dispatch(organizationRoleDetailRequestAction({ organizationRoleId, onSucceeded, onError }));
  }

  editOrganizationRole(
    organizationRoleId: string,
    payload: IOrganizationRoleEditRequest,
    onSucceeded?: (response: IOrganizationRoleDetailResponse) => void,
    onError?: (response: HttpErrorResponse) => void
  ): void {
    this.store.dispatch(organizationRoleEditRequestAction({ organizationRoleId, payload, onSucceeded, onError }));
  }

  createOrganizationRole(
    payload: IOrganizationRoleCreateRequest,
    onSucceeded?: (response: IOrganizationRoleDetailResponse) => void,
    onError?: (response: HttpErrorResponse) => void
  ): void {
    this.store.dispatch(organizationRoleCreateRequestAction({ payload, onSucceeded, onError }));
  }

  deleteOrganizationRole(organizationRoleId: string, onSucceeded?: () => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(organizationRoleDeleteRequestAction({ organizationRoleId, onSucceeded, onError }));
  }
}
