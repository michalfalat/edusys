import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import {
  fileDetailRequestAction,
  fileDetailResponseAction,
  fileErrorAction,
  fileDeleteRequestAction,
  fileDeleteResponseAction,
  fileUploadRequestAction,
  fileUploadResponseAction,
} from './file.actions';
import { of } from 'rxjs';
import { FileService } from '../../services/file/file.service';

@Injectable()
export class FileEffects {
  constructor(private actions$: Actions, private fileService: FileService) {}

  fetchFileDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileDetailRequestAction),
      mergeMap(({ fileId, onSucceeded, onError }) =>
        this.fileService.fetchFileDetail(fileId).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return fileDetailResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(fileErrorAction({ error }));
          })
        )
      )
    )
  );

  uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileUploadRequestAction),
      mergeMap(({ payload, onSucceeded, onError }) =>
        this.fileService.uploadFile(payload).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return fileUploadResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(fileErrorAction({ error }));
          })
        )
      )
    )
  );

  deleteFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fileDeleteRequestAction),
      mergeMap(({ fileId, onSucceeded, onError }) =>
        this.fileService.deleteFile(fileId).pipe(
          map(() => {
            if (onSucceeded) {
              onSucceeded();
            }
            return fileDeleteResponseAction();
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(fileErrorAction({ error }));
          })
        )
      )
    )
  );
}
