import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IUserCreateRequest, IUserDetailResponse, IUserEditRequest } from '@edusys/model';
import { userCreateRequestAction, userDeleteRequestAction, userDetailRequestAction, userEditRequestAction, userListRequestAction } from './user.actions';
import { getUserDetail, getUserList } from './user.selectors';
import IUserState from './user.reducer';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  constructor(private store: Store<IUserState>) {}
  getUserList$ = this.store.pipe(select(getUserList));
  getUserDetail$ = this.store.pipe(select(getUserDetail));

  fetchUserList(onSucceeded?: (response: IUserDetailResponse[]) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(userListRequestAction({ onSucceeded, onError }));
  }

  fetchUserDetail(userId: string, onSucceeded?: (response: IUserDetailResponse) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(userDetailRequestAction({ userId, onSucceeded, onError }));
  }

  editUser(
    userId: string,
    payload: IUserEditRequest,
    onSucceeded?: (response: IUserDetailResponse) => void,
    onError?: (response: HttpErrorResponse) => void,
  ): void {
    this.store.dispatch(userEditRequestAction({ userId, payload, onSucceeded, onError }));
  }

  createUser(payload: IUserCreateRequest, onSucceeded?: (response: IUserDetailResponse) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(userCreateRequestAction({ payload, onSucceeded, onError }));
  }

  deleteUser(userId: string, onSucceeded?: () => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(userDeleteRequestAction({ userId, onSucceeded, onError }));
  }
}
