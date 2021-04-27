import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import {
  moduleCreateRequestAction,
  moduleCreateResponseAction,
  moduleDetailRequestAction,
  moduleDetailResponseAction,
  moduleEditRequestAction,
  moduleEditResponseAction,
  moduleErrorAction,
  moduleListRequestAction,
  moduleListResponseAction,
  moduleDeleteRequestAction,
  moduleDeleteResponseAction,
} from './module.actions';
import { of } from 'rxjs';
import { ModuleService } from '../../services/module/module.service';

@Injectable()
export class ModuleEffects {
  constructor(private actions$: Actions, private moduleService: ModuleService) {}

  fetchModuleList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moduleListRequestAction),
      mergeMap(({ onSucceeded, onError }) =>
        this.moduleService.fetchModuleList().pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return moduleListResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(moduleErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  fetchModuleDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moduleDetailRequestAction),
      mergeMap(({ moduleId, onSucceeded, onError }) =>
        this.moduleService.fetchModuleDetail(moduleId).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return moduleDetailResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(moduleErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  createModule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moduleCreateRequestAction),
      mergeMap(({ payload, onSucceeded, onError }) =>
        this.moduleService.createModule(payload).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return moduleCreateResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(moduleErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  editModule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moduleEditRequestAction),
      mergeMap(({ payload, moduleId, onSucceeded, onError }) =>
        this.moduleService.editModule(moduleId, payload).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return moduleEditResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(moduleErrorAction({ error }));
          }),
        ),
      ),
    ),
  );

  deleteModule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moduleDeleteRequestAction),
      mergeMap(({ moduleId, onSucceeded, onError }) =>
        this.moduleService.deleteModule(moduleId).pipe(
          map(() => {
            if (onSucceeded) {
              onSucceeded();
            }
            return moduleDeleteResponseAction();
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(moduleErrorAction({ error }));
          }),
        ),
      ),
    ),
  );
}
