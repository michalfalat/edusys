import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import {
  taskCreateRequestAction,
  taskCreateResponseAction,
  taskDetailRequestAction,
  taskDetailResponseAction,
  taskEditRequestAction,
  taskEditResponseAction,
  taskErrorAction,
  taskListRequestAction,
  taskListResponseAction,
  taskDeleteRequestAction,
  taskDeleteResponseAction,
  taskAssignRequestAction,
  taskAssignResponseAction,
  taskFinishRequestAction,
  taskFinishResponseAction,
} from './task.actions';
import { of } from 'rxjs';
import { TaskService } from '../../services/task/task.service';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  fetchTaskList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskListRequestAction),
      mergeMap(({ onSucceeded, onError }) =>
        this.taskService.fetchTaskList().pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return taskListResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(taskErrorAction({ error }));
          })
        )
      )
    )
  );

  fetchTaskDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskDetailRequestAction),
      mergeMap(({ taskId, onSucceeded, onError }) =>
        this.taskService.fetchTaskDetail(taskId).pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return taskDetailResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(taskErrorAction({ error }));
          })
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskCreateRequestAction),
      mergeMap(({ payload, onSucceeded, onError }) =>
        this.taskService.createTask(payload).pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return taskCreateResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(taskErrorAction({ error }));
          })
        )
      )
    )
  );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskEditRequestAction),
      mergeMap(({ payload, taskId, onSucceeded, onError }) =>
        this.taskService.editTask(taskId, payload).pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return taskEditResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(taskErrorAction({ error }));
          })
        )
      )
    )
  );

  assignTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskAssignRequestAction),
      mergeMap(({ payload, taskId, onSucceeded, onError }) =>
        this.taskService.assignTask(taskId, payload).pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return taskAssignResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(taskErrorAction({ error }));
          })
        )
      )
    )
  );

  finishTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskFinishRequestAction),
      mergeMap(({ payload, taskId, onSucceeded, onError }) =>
        this.taskService.finishTask(taskId, payload).pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return taskFinishResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(taskErrorAction({ error }));
          })
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskDeleteRequestAction),
      mergeMap(({ taskId, onSucceeded, onError }) =>
        this.taskService.deleteTask(taskId).pipe(
          map(() => {
            console.log(' i am sad');
            if (!!onSucceeded) {
              onSucceeded();
            }
            return taskDeleteResponseAction();
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(taskErrorAction({ error }));
          })
        )
      )
    )
  );
}
