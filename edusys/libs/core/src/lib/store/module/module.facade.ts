import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IModuleCreateRequest, IModuleDetailResponse, IModuleEditRequest } from '@edusys/model';
import {
  moduleCreateRequestAction,
  moduleDeleteRequestAction,
  moduleDetailRequestAction,
  moduleEditRequestAction,
  moduleListRequestAction,
} from './module.actions';
import { getModuleDetail, getModuleList } from './module.selectors';
import IModuleState from './module.reducer';

@Injectable({
  providedIn: 'root',
})
export class ModuleFacade {
  constructor(private store: Store<IModuleState>) {}
  getModuleList$ = this.store.pipe(select(getModuleList));
  getModuleDetail$ = this.store.pipe(select(getModuleDetail));

  fetchModuleList(onSucceeded?: (response: IModuleDetailResponse[]) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(moduleListRequestAction({ onSucceeded, onError }));
  }

  fetchModuleDetail(moduleId: string, onSucceeded?: (response: IModuleDetailResponse) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(moduleDetailRequestAction({ moduleId, onSucceeded, onError }));
  }

  editModule(
    moduleId: string,
    payload: IModuleEditRequest,
    onSucceeded?: (response: IModuleDetailResponse) => void,
    onError?: (response: HttpErrorResponse) => void
  ): void {
    this.store.dispatch(moduleEditRequestAction({ moduleId, payload, onSucceeded, onError }));
  }

  createModule(payload: IModuleCreateRequest, onSucceeded?: (response: IModuleDetailResponse) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(moduleCreateRequestAction({ payload, onSucceeded, onError }));
  }

  deleteModule(moduleId: string, onSucceeded?: () => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(moduleDeleteRequestAction({ moduleId, onSucceeded, onError }));
  }
}
