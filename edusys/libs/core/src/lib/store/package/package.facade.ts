import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IPackageCreateRequest, IPackageDetailResponse, IPackageEditRequest } from '@edusys/model';
import {
  packageCreateRequestAction,
  packageDeleteRequestAction,
  packageDetailRequestAction,
  packageEditRequestAction,
  packageListRequestAction,
} from './package.actions';
import { getPackageDetail, getPackageList } from './package.selectors';
import IPackageState from './package.reducer';

@Injectable({
  providedIn: 'root',
})
export class PackageFacade {
  constructor(private store: Store<IPackageState>) {}
  getPackageList$ = this.store.pipe(select(getPackageList));
  getPackageDetail$ = this.store.pipe(select(getPackageDetail));

  fetchPackageList(onSucceeded?: (response: IPackageDetailResponse[]) => void, onError?: (response: any) => void): void {
    this.store.dispatch(packageListRequestAction({ onSucceeded, onError }));
  }

  fetchPackageDetail(packageId: string, onSucceeded?: (response: IPackageDetailResponse) => void, onError?: (response: any) => void): void {
    this.store.dispatch(packageDetailRequestAction({ packageId, onSucceeded, onError }));
  }

  editPackage(
    packageId: string,
    payload: IPackageEditRequest,
    onSucceeded?: (response: IPackageDetailResponse) => void,
    onError?: (response: any) => void,
  ): void {
    this.store.dispatch(packageEditRequestAction({ packageId, payload, onSucceeded, onError }));
  }

  createPackage(payload: IPackageCreateRequest, onSucceeded?: (response: IPackageDetailResponse) => void, onError?: (response: any) => void): void {
    this.store.dispatch(packageCreateRequestAction({ payload, onSucceeded, onError }));
  }

  deletePackage(packageId: string, onSucceeded?: () => void, onError?: (response: any) => void): void {
    this.store.dispatch(packageDeleteRequestAction({ packageId, onSucceeded, onError }));
  }
}
