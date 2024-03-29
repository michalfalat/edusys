import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFileDetailResponse } from '@edusys/model';
import { Store } from '@ngrx/store';
import { fileDeleteRequestAction, fileDetailRequestAction, fileUploadRequestAction } from './file.actions';
import IFileState from './file.reducer';

@Injectable({
  providedIn: 'root',
})
export class FileFacade {
  constructor(private store: Store<IFileState>) {}

  fetchFileDetail(fileId: string, onSucceeded?: (response: IFileDetailResponse) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(fileDetailRequestAction({ fileId, onSucceeded, onError }));
  }

  uploadFile(payload: FormData, onSucceeded?: (response: IFileDetailResponse) => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(fileUploadRequestAction({ payload, onSucceeded, onError }));
  }

  deleteFile(fileId: string, onSucceeded?: () => void, onError?: (response: HttpErrorResponse) => void): void {
    this.store.dispatch(fileDeleteRequestAction({ fileId, onSucceeded, onError }));
  }
}
